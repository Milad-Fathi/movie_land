from bson import objectid
from fastapi import status, File, UploadFile
from typing import Dict
from app.models import Film, FilmCreate
from .utils import getResponse, riseHttpExceptionIfNotFound
from ..helper.save_picture import save_picture
from ..services import filmService as service
from fastapi import APIRouter

filmRoutes = APIRouter()
base = '/film/'
UploadImage = f'{base}image-upload/'

_notFoundMessage = "Could not find user with the given Id."


@filmRoutes.get(base)
async def getAllFilm():
    return await service.getAllFilm()


@filmRoutes.get(base+'{id}')
async def getById(id):
    return await resultVerification(id)


@filmRoutes.post(base, response_model=None)
async def insert_film(film: FilmCreate):
    # Assuming you have a service function that inserts the film and returns the inserted film
    inserted_film = await service.InsertFilm(film)
    return inserted_film

@filmRoutes.put(base+'{id}', status_code=status.HTTP_204_NO_CONTENT)
async def updateFilm(id, data: Film):
    await resultVerification(id)
    done : bool = await service.updateFilm(id,data);
    return getResponse(done, errorMessage="An error occurred while editing the film information.")


@filmRoutes.delete(base+'{id}', status_code=status.HTTP_204_NO_CONTENT)
async def deleteFilm(id):
    await resultVerification(id)
    done : bool = await service.deleteFilm(id);
    return getResponse(done, errorMessage="There was an error.")   


@filmRoutes.post(UploadImage+'{id}', status_code=status.HTTP_204_NO_CONTENT)
async def uploadFilmImage(id: str, file: UploadFile = File(...)):
    result = await resultVerification(id)
    imageUrl = save_picture(file=file, folderName='film', fileName=result['title'])
    done = await service.savePicture(id, imageUrl)
    return getResponse(done, errorMessage="An error occurred while saving film image.")



# Helpers

async def resultVerification(id: objectid) -> dict:
    result = await service.getById(id)
    await riseHttpExceptionIfNotFound(result, message=_notFoundMessage)
    return result