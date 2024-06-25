
from typing import Annotated
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Path
from starlette import status
from app.database import SessionLocal
from app.models import Film, Person, Comment, PersonCommentFilm
from app.IAM.auth import get_current_user

# from database import SessionLocal
# from models import Film

router = APIRouter(
    prefix='/user',
    tags=['user']
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]


class CommentRequest(BaseModel):
    date:str = Field(min_length=1)
    text:str = Field(min_length=2)


class PersonCommentFilmRequest(BaseModel):
    pesron_id:int
    comment_id:int
    film_id:int


def add_per_com_film(db:db_dependency,
                    film_id:int,
                    person_id:int,
                    comment_id:int,
                    model:PersonCommentFilmRequest):
    
    model.comment_id = comment_id
    model.film_id = film_id
    model.pesron_id = person_id
    
    PersonCommentFilm_model = PersonCommentFilm(**model.model_dump())
    db.add(PersonCommentFilm_model)
    db.commit()
    return PersonCommentFilm_model




# to add comments
@router.post("/addComment/", status_code=status.HTTP_200_OK)
async def add_comment(db: db_dependency,
                    film_id: int,
                    user: user_dependency,
                    comment_request: CommentRequest):
    if (user is None):
        raise HTTPException(status_code=401,detail='Authentication Failed')
    elif (user.get('user_role') == "user") or (user.get('user_role') == "admin"):
        film_model = db.query(Film).filter(Film.id == film_id).first()

        comment_model = Comment(**comment_request.model_dump())

        user_id = user.get('id')

        comFilmPerReq = PersonCommentFilmRequest(pesron_id=1,comment_id=1,film_id=1)
        
        db.add(comment_model)
        
        db.commit()

        add_per_com_film(db,film_model.id,user_id, comment_model.id, comFilmPerReq)
       
    
    return {"comment_id": comment_model.id}



# returns all comments
@router.get("/all-comments", status_code=status.HTTP_200_OK)
async def get_all(db:db_dependency):
    return db.query(Comment).all()



@router.get("/all-commentFilmPerson", status_code=status.HTTP_200_OK)
async def get_all_RelComment(db:db_dependency):
    return db.query(PersonCommentFilm).all()