from sqlalchemy.orm import Session
from Database.schemas import RequestUser, requestStream
from repositories.user_repository import UserRepository
from repositories.stream_repository import StreamRepository

# crud users
def create_user(db: Session, request: RequestUser):
    repository = UserRepository(db)
    return repository.create_user(request.parameter.dict())

def get_users(db: Session):
    repository = UserRepository(db)
    return repository.get_users()

def get_user_by_id(db: Session, id: int):
    repository = UserRepository(db)
    return repository.get_user_by_id(id)

def update_user(db: Session, id: int, request: RequestUser):
    repository = UserRepository(db)
    return repository.update_user(id, request.parameter.dict())

def delete_user(db: Session, id: int):
    repository = UserRepository(db)
    return repository.delete_user(id)

# crud Stream

def create_stream(db: Session, request: requestStream):
    repository_stream = StreamRepository(db)
    return repository_stream.create_stream(request.parameter.dict())

def get_stream(db: Session):
    repository_stream = StreamRepository(db)
    return repository_stream.get_stream()

def get_stream_by_id(db: Session, id: int):
    repository_stream = StreamRepository(db)
    return repository_stream.get_stream_by_id(id)

def update_stream(db: Session, id: int, request: requestStream):
    repository_stream = StreamRepository(db)
    return repository_stream.update_stream(id, request.parameter.dict())

def delete_stream(db: Session, id: int):
    repository_stream = StreamRepository(db)
    return repository_stream.delete_stream(id)