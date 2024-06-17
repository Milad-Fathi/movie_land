
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
    text:str = Field(max_length=2)


# to add comments
@router.get("/addComment/", status_code=status.HTTP_200_OK)
async def search_movie(db: db_dependency,
                    film_title: str,
                    user: user_dependency,
                    comment_request: CommentRequest):
    if (user is None) or (user.get('user_role') != "user"):
        raise HTTPException(status_code=401,detail='Authentication Failed')
    elif user.get('user_role') == "user":
        film_model = db.query(Film).filter(Film.title == film_title).first()

        comment_model = Comment(**comment_request.model_dump())

        comment_film_person_model = PersonCommentFilm()
        comment_film_person_model.comment_id = comment_model.id
        comment_film_person_model.film_id = film_model.id
        comment_film_person_model.pesron_id = user.get('person_id')

    db.add(comment_model)
    db.add(comment_film_person_model)
    db.commit()

