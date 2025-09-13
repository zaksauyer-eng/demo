from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from . import models, schemas, database

# ✅ Create database tables
models.Base.metadata.create_all(bind=database.engine)

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend requests from any origin (for demo; restrict in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency for DB session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---- Health Check ----
@app.get("/health")
def health():
    return {"status": "ok"}

# ---- Root ----
@app.get("/")
def root():
    try:
        return {"message": "🌊 Argus backend running!"}
    except Exception as e:
        # Log error and return message
        import logging
        logging.error(f"Root endpoint error: {e}")
        return {"error": str(e)}, 500

# ---- USERS ----
@app.post("/users/", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    try:
        # Check if username exists
        db_user = db.query(models.User).filter(models.User.username == user.username).first()
        if db_user:
            raise HTTPException(status_code=400, detail="Username already exists")

        new_user = models.User(username=user.username, password=user.password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except Exception as e:
        import logging
        logging.error(f"Create user error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/users/", response_model=List[schemas.UserOut])
def list_users(db: Session = Depends(get_db)):
    try:
        return db.query(models.User).all()
    except Exception as e:
        import logging
        logging.error(f"List users error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    users = db.query(models.User).all()
    return users
