from app.database import Base

# from database import Base


from sqlalchemy import Column, INTEGER, String, ForeignKey,Boolean



class Person(Base):
    __tablename__ = 'person'

    id = Column(INTEGER, primary_key=True, index=True)
    user_name = Column(String, unique=True)
    hashed_password = Column(String)
    role = Column(String)
    email = Column(String, unique=True)
    phone_number = Column(INTEGER)
    is_active = Column(Boolean, default=False)
