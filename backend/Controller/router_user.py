from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from Database.config import get_db
from Database.schemas import RequestUser, ResponseUser
from Controller import crud
from security.middleware_check import check_jwt_token,check_admin

user = APIRouter()


@user.post('/create')
async def create_user(request: RequestUser, db: Session = Depends(get_db)):
    #await check_admin(token_payload)
    created_user = crud.create_user(db, request)
    return ResponseUser(user=created_user).dict(exclude_none=True)

@user.get('/')
async def get_users(db: Session = Depends(get_db)):
    users = crud.get_users(db)
    return ResponseUser(user=users).dict(exclude_none=True)

@user.get('/{id}')
async def get_user_by_id(id: int, db: Session = Depends(get_db)):
    user = crud.get_user_by_id(db, id)
    return ResponseUser(user=user).dict(exclude_none=True)

@user.put('/{id}')
async def update_user(request: RequestUser, id: int, db: Session = Depends(get_db), token_payload: dict = Depends(check_jwt_token)):
    await check_admin(token_payload)
    updated_user = crud.update_user(db, id, request)
    return ResponseUser(user=updated_user).dict(exclude_none=True)

@user.delete('/{id}')
async def delete_user(id: int, db: Session = Depends(get_db), token_payload: dict = Depends(check_jwt_token)):
    await check_admin(token_payload)
    deleted = crud.delete_user(db, id)
    return {"success": deleted}