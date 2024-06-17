# from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from .settings import Settings

# client = AsyncIOMotorClient(f'mongodb://admin:password@mongodb:27017')  

settings = Settings()

MongoClient = MongoClient(settings.mongo_url)
db = MongoClient.UserData
films_collection = db["films"]  # Assuming you have a collection named 'films'


