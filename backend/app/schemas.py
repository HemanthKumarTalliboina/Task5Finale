####################################

from pydantic import BaseModel, EmailStr


# ---- STUDENT SCHEMAS ----
class StudentBase(BaseModel):
    name: str
    email: EmailStr

class StudentCreate(StudentBase):
    pass

class StudentUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None

class StudentOut(StudentBase):
    id: int

    class Config:
        orm_mode = True


# ---- USER & AUTH SCHEMAS ----
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str
    role: str = "student"  # default role

class UserOut(UserBase):
    id: int
    role: str

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: int | None = None
    username: str | None = None
    role: str | None = None

