from pydantic import BaseModel

# Shared attributes
class UserBase(BaseModel):
    username: str

# Input schema for creating user
class UserCreate(UserBase):
    password: str

# Output schema
class UserOut(UserBase):
    id: int

    class Config:
        from_attributes = True  # ✅ needed for SQLAlchemy → Pydantic conversion
