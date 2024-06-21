from typing import Annotated
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from starlette import status
from app.database import SessionLocal
from app.models import Film, Person
from app.IAM.auth import get_current_user
from ..media_service.config.db import films_collection


router = APIRouter(
    prefix='/admin',
    tags=['admin']
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]



class FilmRequest(BaseModel):
    title: str = Field(min_length=1)
    description: str = Field(min_length=5, max_length=250)
    rating: int  =None
    cover_link: str  =None
    trailer_link: str  =None
    date: str  =None
    budget: int  =None
    language:str  =None
    duration: int  =None
    article_link: str =None


@router.post("/addFilm", status_code=status.HTTP_201_CREATED)
async def add_movie(admin: user_dependency,
                    db:db_dependency, 
                    film_request:FilmRequest):
    
    if (admin is None) or (admin.get('user_role') != "admin"):
        raise HTTPException(status_code=401,detail='Authentication Failed')
    elif admin.get('user_role') == "admin":
        film_model = Film(**film_request.model_dump())
        db.add(film_model)
        db.commit()
    
    return film_model.id


@router.put("/updateFilm/", status_code=status.HTTP_204_NO_CONTENT)
async def update_movie(admin: user_dependency,
                       db: db_dependency,
                       film_request: FilmRequest,
                       film_title: str):
    
    if (admin is None) or (admin.get('user_role') != "admin"):
        raise HTTPException(status_code=401,detail='Authentication Failed')
    elif admin.get('user_role') == "admin":

        film_model = db.query(Film).filter(Film.title == film_title).first()

        if film_model is None:
            raise HTTPException(status_code=404, detail="film not found")
        
        film_model.budget = film_request.budget
        film_model.cover_link = film_request.cover_link
        film_model.date = film_request.date
        film_model.description = film_request.description
        film_model.duration = film_request.duration
        film_model.language = film_request.language
        film_model.trailer_link = film_request.trailer_link
        film_model.rating = film_request.rating
        film_model.title = film_request.title
        film_model.article_link = film_request.article_link

        db.add(film_model)
        db.commit()
    
    return film_model



@router.delete("/deleteFilm/",status_code=status.HTTP_204_NO_CONTENT)
async def delete_movie(admin: user_dependency,
                       db: db_dependency,
                       film_title: str):
    
    if (admin is None) or (admin.get('user_role') != "admin"):
        raise HTTPException(status_code=401,detail='Authentication Failed')
    elif admin.get('user_role') == "admin":
        
        film_model = db.query(Film).filter(Film.title == film_title).first()

        if film_model is None:
            raise HTTPException(status_code=404, detail="Film not found")
        
        db.query(Film).filter(Film.title == film_title).delete()

        db.commit()



@router.delete("/deleteFilm-id/",status_code=status.HTTP_204_NO_CONTENT)
async def delete_movie(admin: user_dependency,
                       db: db_dependency,
                       film_id: int):
    
    if (admin is None) or (admin.get('user_role') != "admin"):
        raise HTTPException(status_code=401,detail='Authentication Failed')
    elif admin.get('user_role') == "admin":
        
        film_model = db.query(Film).filter(Film.title == film_id).first()

        if film_model is None:
            raise HTTPException(status_code=404, detail="Film not found")
        
        db.query(Film).filter(Film.title == film_id).delete()

        db.commit()



# read all users and admins
@router.get("/readAllUsers", status_code=status.HTTP_200_OK)
async def read_all_person( admin: user_dependency, 
                    db: db_dependency):
    
    if (admin is None) or (admin.get('user_role') != "admin"):
        raise HTTPException(status_code=401,detail='Authentication Failed')
    elif admin.get('user_role') == "admin":
        return db.query(Person).all()
    


# delete user or admin (by its user_name)
@router.delete("/deleteUser/",status_code=status.HTTP_204_NO_CONTENT)
async def delete_person(admin: user_dependency,
                       db: db_dependency,
                       user_name: str):
    
    if (admin is None) or (admin.get('user_role') != "admin"):
        raise HTTPException(status_code=401,detail='Authentication Failed')
    elif admin.get('user_role') == "admin":
        
        user_model = db.query(Person).filter(Person.user_name == user_name).first()

        if user_model is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        db.query(Person).filter(Person.user_name == user_name).delete()

        db.commit()




# image

@router.post("/uploadImage/{film_id}")
async def upload_image(db: db_dependency, film_id: int, file: UploadFile = File(...)):
    content_type = file.content_type
    filename = file.filename
    cover_address = f"images/{filename}"
    # Store the image in MongoDB
    films_collection.insert_one(
        {"id": film_id},
        {"$set": {"cover_link": cover_address}}  # Assuming you're saving the image in a directory named 'images'
    )
    film_model = db.query(Film).filter(Film.id == film_id).first()
    
    if film_model is not None:
        film_model.cover_link = cover_address
        db.add(film_model)
        db.commit()
        return {"message": "Image uploaded successfully"}
    
    return {"message": "sth happended !"}