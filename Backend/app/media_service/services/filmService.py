from bson import ObjectId
from ..config.db import db
from app.media_service.routes.filmRoute import filmRequest
from ..schemas.serializeObject import serializeDict, serializeList


async def getAllFilm() -> list:
    return serializeList(db.film.find())


async def getById(id):
    return serializeDict(db.film.find_one({"_id": ObjectId(id)}))


async def InsertFilm(data: filmRequest):
    result = db.film.insert_one(dict(data))
    return serializeDict(db.film.find_one({"_id": ObjectId(result.inserted_id)}))


async def updateFilm(id, data: filmRequest) -> bool:
    db.film.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(data)})
    return True

async def savePicture(id, imageUrl: str) -> bool:
    db.film.find_one_and_update({"_id": ObjectId(id)}, {"$set": { "imageUrl": imageUrl }})
    return True


async def deleteFilm(id) -> bool:
    db.film.find_one_and_delete({"_id": ObjectId(id)})
    return True