from typing import Annotated
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Path
from starlette import status
from app.database import SessionLocal
from app.models import Film, Comment,PersonCommentFilm, Person

router = APIRouter(
    prefix='/home',
    tags=['home']
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



db_dependency = Annotated[Session, Depends(get_db)]
# user_dependency = Annotated[dict, Depends(get_current_user)]



# return top 5 film of the list 
@router.get("/", status_code=status.HTTP_200_OK)
async def read_top_five(db: db_dependency):
    return db.query(Film).limit(5).all()


@router.get("/all", status_code=status.HTTP_200_OK)
async def read_all(db: db_dependency):
    return db.query(Film).all()

# return specific movie ,search by its title
@router.get("/search/", status_code=status.HTTP_200_OK)
async def search_movie(db: db_dependency,
                    film_title: str):
    film_model = db.query(Film).filter(Film.title == film_title).first()
    if film_model is not None:
        return film_model
    raise HTTPException(status_code=404, detail="film not found")



# return specific movie ,search by its id
@router.get("/search/", status_code=status.HTTP_200_OK)
async def search_movie(db: db_dependency,
                    film_id: int):
    film_model = db.query(Film).filter(Film.id == film_id).first()
    if film_model is not None:
        return film_model
    raise HTTPException(status_code=404, detail="film not found")



@router.get("/comments/", status_code= status.HTTP_200_OK)
async def get_comment(db:db_dependency,
                      film_id: int):
    comment_person_model = db.query(PersonCommentFilm).filter(PersonCommentFilm.film_id == film_id).first()
    if comment_person_model is not None:
        comment_model = db.query(Comment).filter(Comment.id == comment_person_model.comment_id).first()
    person_model = db.query(Person).filter(Person.id == comment_person_model.pesron_id)
    if comment_model is not None:
        return {"person_name": person_model.user_name, "text": comment_model.text, "date": comment_model.date}
    raise HTTPException(status_code=404, detail="comment not found")

