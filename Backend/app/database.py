from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


from dotenv import load_dotenv
import os


load_dotenv(".env")

DB_PASSWORD = os.getenv("DB_PASSWORD")


SQLALCHEMY_DATABASE_URL = f"postgresql+psycopg2://postgres:{DB_PASSWORD}@pg-db/MovieLandDatabase"


# SQLALCHEMY_DATABASE_URL = f"postgresql://postgres:{DB_PASSWORD}@localhost/MovieLandDatabase"


engine = create_engine(SQLALCHEMY_DATABASE_URL)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
