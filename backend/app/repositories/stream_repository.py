from sqlalchemy.orm import Session
from app.Model.model import RestreamSession


class StreamRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_stream(self, stream_data: dict):
        stream = RestreamSession(**stream_data)
        self.db.add(stream)
        self.db.commit()
        self.db.refresh(stream)
        return stream

    def get_stream(self, skip: int = 0, limit: int = 100):
        return self.db.query(RestreamSession).offset(skip).limit(limit).all()

    def get_stream_by_id(self, user_id: int):
        return self.db.query(RestreamSession).filter(RestreamSession.id == user_id).first()

    def delete_stream(self, stream_id: int):
        stream = self.get_stream_by_id(stream_id)
        if stream:
            self.db.delete(stream)
            self.db.commit()
            return True
        return False