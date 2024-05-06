from bson import objectid
from fastapi import status, File, UploadFile
from app.models import Film
from .utils import getResponse, riseHttpExceptionIfNotFound
from ..helper.save_picture import save_picture
from ..services import filmService as service
from fastapi import APIRouter

filmRoutes = APIRouter()
base = '/film/'
UploadImage = f'{base}image-upload/'

_notFoundMessage = "Could not find user with the given Id."


@filmRoutes.get(base)
async def getAll():
    return await service.getAllFilm()


@filmRoutes.get(base+'{id}')
async def getById(id):
    return await resultVerification(id)

@filmRoutes.post(base)
async def InsertFilm(data: Film):
    return await service.InsertFilm(data)


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
    imageUrl = save_picture(file=file, folderName='film', fileName=result['name'])
    done = await service.savePicture(id, imageUrl)
    return getResponse(done, errorMessage="An error occurred while saving film image.")



# Helpers

async def resultVerification(id: objectid) -> dict:
    result = await service.getById(id)
    await riseHttpExceptionIfNotFound(result, message=_notFoundMessage)
    return result