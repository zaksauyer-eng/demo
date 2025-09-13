# backend/seed_data.py
from . import models, database

def seed():
    db = database.SessionLocal()
    try:
        # create tables (in case not yet created)
        models.Base.metadata.create_all(bind=database.engine)

        # seed users if none
        if db.query(models.User).count() == 0:
            users = [
                models.User(username="admin", password="admin123", role="admin"),
                models.User(username="alice", password="alicepwd", role="user"),
                models.User(username="bob", password="bobpwd", role="user"),
            ]
            db.add_all(users)
            db.commit()

        # seed reports if none
        if db.query(models.Report).count() == 0:
            reports = [
                models.Report(
                    title="High waves at Marina",
                    description="Big waves near the shore",
                    latitude=13.0827,
                    longitude=80.2707,
                    severity="high",
                    reporter="alice",
                ),
                models.Report(
                    title="Coastal flooding in ECR",
                    description="Water entering low-lying areas",
                    latitude=12.9659,
                    longitude=80.2380,
                    severity="medium",
                    reporter="bob",
                ),
            ]
            db.add_all(reports)
            db.commit()
    finally:
        db.close()

if __name__ == "__main__":
    seed()
    print("✅ Seed complete")
