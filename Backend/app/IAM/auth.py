from datetime import timedelta, datetime
from typing import Annotated
from fastapi import APIRouter, Depends,HTTPException
from pydantic import BaseModel, Field
from starlette import status
from sqlalchemy.orm import Session
from app.models import Person
from app.database import SessionLocal
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import JWTError, jwt


router = APIRouter(
    prefix='/auth',
    tags=['auth']
)


SECRET_KEY = 'MOVIELAND'
ALGORITHM = 'HS256'


bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


oauth2_bearer = OAuth2PasswordBearer(tokenUrl='auth/token')


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


class PersonRequest(BaseModel):
    user_name: str = Field(min_length=1)
    plain_text_password: str = Field(min_length=1)
    # role: str = Field(min_length=1)
    email: str = Field(min_length=1)
    phone_number:int = Field(min_length=10, max_length=16)
    # is_active: bool 
    
class Token(BaseModel):
    access_token: str
    token_type: str



@router.get("/")
async def get_hello():
    return{"hello": "world"}