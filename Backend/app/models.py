from app.database import Base
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


from sqlalchemy import Column, INTEGER, String, ForeignKey,Boolean,Text



class Person(Base):
    __tablename__ = 'person'

    id = Column(INTEGER, primary_key=True, index=True)
    user_name = Column(String, unique=True)
    hashed_password = Column(String)
    role = Column(String)
    email = Column(String, unique=True)
    phone_number = Column(INTEGER)
    is_active = Column(Boolean, default=False)



class PersonMessage(Base):
    __tablename__ = 'personMessage'

    message_id = Column(INTEGER, ForeignKey("message.id"), primary_key=True)
    sender_id = Column(INTEGER, ForeignKey("person.id"), primary_key=True)
    receiver_id = Column(INTEGER, ForeignKey("person.id"), primary_key=True)



class Message(Base):
    __tablename__ = 'message'

    id = Column(INTEGER, primary_key=True, index=True)
    date = Column(String)
    text = Column(Text)



class Film(Base):
    __tablename__ = 'film'

    id = Column(INTEGER, primary_key=True, index=True)
    title = Column(String, unique=True)
    description = Column(String)
    rating = Column(INTEGER)
    cover_link = Column(String, unique=True)
    trailer_link = Column(String, unique=True)
    date = Column(String)
    budget = Column(INTEGER)
    language = Column(String)
    duration = Column(INTEGER)
    article_link = Column(String, unique=True)
    
    @classmethod
    def update_cover_link(cls, film_id, new_cover_link):
        cls.query.filter_by(id=film_id).update({"cover_link": new_cover_link})



class PersonLiked(Base):
    __tablename__ = 'personLiked'

    person_id = Column(INTEGER, ForeignKey('person.id'), primary_key=True)
    film_id = Column(INTEGER, ForeignKey('film.id'), primary_key=True)



class PersonDisliked(Base):
    __tablename__ = 'personDisliked'

    person_id = Column(INTEGER, ForeignKey("person.id"), primary_key=True)
    film_id = Column(INTEGER, ForeignKey("film.id"), primary_key=True)



class Genre(Base):
    __tablename__ = 'genre'

    id = Column(INTEGER, primary_key=True, index=True)
    name = Column(String)



class FilmGenre(Base):
    __tablename__ = 'filmGenre'

    genre_id = Column(INTEGER, ForeignKey("genre.id"), primary_key=True)
    film_id = Column(INTEGER, ForeignKey("film.id"), primary_key=True)



class Comment(Base):
    __tablename__ = 'comment'

    id = Column(INTEGER, primary_key=True, index=True)
    date = Column(String)
    text = Column(Text)



class Reply(Base):
    __tablename__ = 'reply'

    parent_id = Column(INTEGER, ForeignKey("comment.id"), primary_key=True)
    child_id = Column(INTEGER, ForeignKey("comment.id"), primary_key=True)



class PersonCommentFilm(Base):
    __tablename__ = 'personCommentFilm'

    pesron_id = Column(INTEGER, ForeignKey("person.id"), primary_key=True)
    comment_id = Column(INTEGER, ForeignKey("comment.id"), primary_key=True)
    film_id = Column(INTEGER, ForeignKey("film.id"), primary_key=True)