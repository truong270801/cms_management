from sqlalchemy.orm import Session
from app.Database.schemas import RequestUser, requestStream
from app.repositories.user_repository import UserRepository
from app.repositories.stream_repository import StreamRepository

# crud users
def create_user(db: Session, request: RequestUser):
    repository = UserRepository(db)
    return repository.create_user(request.user.dict())

def get_users(db: Session):
    repository = UserRepository(db)
    return repository.get_users()

def get_user_by_id(db: Session, id: int):
    repository = UserRepository(db)
    return repository.get_user_by_id(id)

def update_user(db: Session, id: int, request: RequestUser):
    repository = UserRepository(db)
    return repository.update_user(id, request.user.dict())

def delete_user(db: Session, id: int):
    repository = UserRepository(db)
    return repository.delete_user(id)

# crud Stream

def create_stream(db: Session, request: requestStream):
    repository_stream = StreamRepository(db)
    return repository_stream.create_stream(request.stream.dict())

def get_stream(db: Session):
    repository_stream = StreamRepository(db)
    return repository_stream.get_stream()

def get_stream_by_id(db: Session, id: int):
    repository_stream = StreamRepository(db)
    return repository_stream.get_stream_by_id(id)



def delete_stream(db: Session, id: int):
    repository_stream = StreamRepository(db)
    return repository_stream.delete_stream(id)

