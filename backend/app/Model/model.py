# model.py
from Database.config import Base
from sqlalchemy.orm import Session

from sqlalchemy import Column ,Integer, String

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=True)

    def check_password(self, password: str) -> bool:
        return password == self.password

    @staticmethod
    def authenticate_user(db: Session, username: str, password: str):
        user = db.query(User).filter(User.username == username).first()
        if not user or not user.check_password(password):
            return None
        return user
class Stream(Base):
    __tablename__ = "streams"
    id = Column(String, primary_key=True, index=True)
    location = Column(String, nullable=False)
    start = Column(String, nullable=False)
    end = Column(String, nullable=False)
    play_auth_type = Column(String, nullable=True)
    play_url = Column(String, nullable=True)