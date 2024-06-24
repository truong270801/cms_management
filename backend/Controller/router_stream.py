from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from Database.config import get_db
from Database.schemas import requestStream, ResponseStream
from Controller import crud
from security.middleware_check import check_jwt_token,check_admin

stream = APIRouter()

@stream.post('/create')
async def create_stream(request: requestStream, db: Session = Depends(get_db)):
    created_stream = crud.create_stream(db, request)
    return ResponseStream(stream = created_stream).dict(exclude_none=True)

@stream.get('/')
async def get_stream(db: Session = Depends(get_db)):
    stream = crud.get_stream(db)
    return ResponseStream(stream=stream).dict(exclude_none=True)

@stream.get('/{id}')
async def get_stream_by_id(id: int, db: Session = Depends(get_db)):
    stream = crud.get_stream_by_id(db, id)
    return ResponseStream(stream=stream).dict(exclude_none=True)

@stream.put('/update/{id}')
async def update_stream(request: requestStream, id: int, db: Session = Depends(get_db)):
    updated_stream = crud.update_stream(db, id, request)
    return ResponseStream(stream=updated_stream).dict(exclude_none=True)

@stream.delete('/delete/{id}')
async def delete_stream(id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_stream(db, id)
    return {"success": deleted}