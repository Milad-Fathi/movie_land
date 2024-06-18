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

import redis

import random



pool = redis.ConnectionPool(host='redis', port=6379, decode_responses=True)
r = redis.Redis(connection_pool=pool)






router = APIRouter(
    prefix='/api/auth',
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
    phone_number:str = Field(min_length=8)
    # is_active: bool = Field(default=False) 
    
class Token(BaseModel):
    access_token: str
    token_type: str





# **************************different**********************************************************************
# To check if person's username and password is correct
def authenticate_user(user_name: str, password: str, db):
    user = db.query(Person).filter(Person.user_name == user_name).first()
    if not user:
        # return {"msg": "User not signed up"}
        return False
    if not bcrypt_context.verify(password, user.hashed_password):
        # return {"msg": "Wrong password"}
        return False
    if user.is_active == False:
        # return {"msg": "Activate first"}
        return False
    return user


# to create token
def create_access_token(user_name: str, person_id: int, role: str, expires_delta: timedelta):
    encode = {'sub': user_name, 'id': person_id, 'role': role}
    expires = datetime.utcnow() + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)


# to check if the token is correct / the person is authorized
# to decode a token
async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get('sub')
        person_id: int = payload.get('id')
        user_role: str = payload.get('role')
        if username is None or person_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='Could not validate user/admin.')
        return {'username': username, 'id': person_id, 'user_role': user_role}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='Could not validate user/admin.')







# *************************cast the code to str if needed
# *************************id can be replaced with 'username'    &&    nx dont let code be replaced until its alive...
# generate code and save it in redis
def create_code(id: str):
    code = str(random.randint(100000, 999999))
    print(code)
    r.set(f'{id}', f'{code}', ex=60, nx=True)


# check the given code
def verify_code(code: str, id: str):
    if r.get(f'{id}') == code:
        return True
    else:
        return False




# creating user
@router.post("/signup_user", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency,
                      create_user_request: PersonRequest):
    user = db.query(Person).filter(Person.user_name == create_user_request.user_name).first()
    if not user:
        create_user_model = Person(
            email=create_user_request.email,
            user_name=create_user_request.user_name,
            role="user",
            hashed_password=bcrypt_context.hash(create_user_request.plain_text_password),
            phone_number = create_user_request.phone_number,
            is_active = False
        )

        db.add(create_user_model)
        db.commit()

        create_code(str(create_user_model.id))
        return create_user_model.id
    else:
        return{"msg":"The username is already existing!!!"}



# creating admin
@router.post("/signup_admin", status_code=status.HTTP_201_CREATED)
async def create_admin(db: db_dependency,
                      create_admin_request: PersonRequest):
    user = db.query(Person).filter(Person.user_name == create_admin_request.user_name).first()
    if not user:
        create_admin_model = Person(
            email=create_admin_request.email,
            user_name=create_admin_request.user_name,
            role="admin",
            hashed_password=bcrypt_context.hash(create_admin_request.plain_text_password),
            phone_number = create_admin_request.phone_number,
            is_active = False
        )

        db.add(create_admin_model)
        db.commit()

        create_code(str(create_admin_model.id))
        return create_admin_model.id
    else:
        return{"msg":"The username is already existing!!!"}


# *******************person req. class instead ....
# login for user/admin
@router.post("/token",response_model=Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                                 db: db_dependency):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='Could not validate user/admin.')
    
    token = create_access_token(user.user_name, user.id, user.role, timedelta(minutes=120))

    return {'access_token': token, 'token_type': 'bearer'}


# to return person by it's username
@router.get("/read_user")
async def read_all_users(username:str,db:db_dependency):
    user = db.query(Person).filter(Person.user_name == username).first()
    return user
   


# to activate  user/admin
@router.put("/activate_user/",status_code=status.HTTP_204_NO_CONTENT)
async def activate_person(db: db_dependency,
                          userid: str,
                          code: str):
    person_model = db.query(Person).filter(Person.id == userid).first()
    if person_model is None:
        raise HTTPException(status_code=404, detail="user not found,sign up first!!!")

    # check the given code and make "activator" True ,if the code was correct 
    activator = verify_code(code, userid)


    if activator:
        person_model.is_active = True
        db.add(person_model)
        db.commit()
            

@router.get("/generate_code",status_code=status.HTTP_200_OK)
async def generate_code(id):
    create_code(str(id))



# @router.get("/test")
# async def read_redis():
#     # print(r.get('key2'))
#     r.delete('key','key1','key2')
#     return r.get('key2')
