from typing import Annotated
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Path
from starlette import status
from app.database import SessionLocal
from app.models import Film, Genre, FilmGenre

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
async def read_all(db: db_dependency):
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





