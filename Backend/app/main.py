from fastapi import FastAPI
from app import models
from app.database import engine
from app.IAM import auth
from fastapi.middleware.cors import CORSMiddleware

from app.media_service.routes.filmRoute import filmRoutes
from app.media_service.routes.defaultRoute import defaultRoute


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],    
)

models.Base.metadata.create_all(bind=engine)


app.include_router(auth.router)
app.include_router(filmRoutes, tags=['Film'], prefix='/api/film')
app.include_router(defaultRoute)
