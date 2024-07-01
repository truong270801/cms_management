from Database.config import Base
from sqlalchemy.orm import Session
from sqlalchemy import Column ,Integer, String



class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=True)
   

    def check_password(self, password: str) -> bool:
            return password == self.password
        
    def authenticate_user(db: Session, username: str, password: str):
            user = db.query(User).filter(User.username == username).first()
            if not user or not user.check_password(password):
                return None
            return user 


class RestreamSession(Base):
    __tablename__ = "restream"

    id = Column(Integer, primary_key=True, index=True)
    start_time = Column(String, nullable=False)
    end_time = Column(String, nullable=False)
    channel_id = Column(Integer, nullable=False)
    url = Column(String, nullable=False)
   
    


    