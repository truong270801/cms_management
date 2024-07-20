from fastapi import APIRouter, HTTPException, Depends
from app.Security_jwt.middleware_check import check_jwt_token, check_admin
from sqlalchemy.orm import Session
from app.Database.config import get_db
from app.Model.model import Stream
from app.Database.schemas import StreamSchema, RequestStream, ResponseStream
import httpx
import os
from dotenv import load_dotenv
load_dotenv()
stream = APIRouter()

@stream.get("/")
async def get_session_list(
    token_payload: dict = Depends(check_jwt_token),
  
):
    await check_admin(token_payload)
    url = os.getenv('API_GET_STREAM')

    headers = {
        "Authorization": f"Bearer {os.getenv('AUTHORIZATION_KEY')}",
        "AES-Key": os.getenv("AES_KEY")
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers)
            response.raise_for_status() 
            return response.json()
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=str(exc))
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@stream.post("/create", response_model=ResponseStream[StreamSchema])
async def create_stream(
    stream_data: RequestStream,
    token_payload: dict = Depends(check_jwt_token),
    db: Session = Depends(get_db)
):
    await check_admin(token_payload)
    url = os.getenv('API_POST_STREAM')
    headers = {
        "Authorization": f"Bearer {os.getenv('AUTHORIZATION_KEY')}",
        "AES-Key": os.getenv("AES_KEY")
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=stream_data.items.dict())
            response.raise_for_status()
            response_data = response.json()
            
            db_stream = Stream(
                id=stream_data.items.id,
                location=stream_data.items.location,
                start=stream_data.items.start,
                end=stream_data.items.end,
                play_auth_type=stream_data.items.play_auth_type,
                play_url=response_data.get("playUrl")
            )
            db.add(db_stream)
            db.commit()
            db.refresh(db_stream)
            return ResponseStream(items=db_stream)
    except httpx.HTTPStatusError as exc:
        db.rollback()
        raise HTTPException(status_code=exc.response.status_code, detail=str(exc))
    except Exception as exc:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(exc))
    


@stream.delete("/delete/{session_id}")
async def delete_session(
    session_id: str,
    token_payload: dict = Depends(check_jwt_token),
    
):
    await check_admin(token_payload)
    url = f"{os.getenv('API_DELETE_STREAM')}?id={session_id}"


    headers = {
        "Authorization": f"Bearer {os.getenv('AUTHORIZATION_KEY')}",
        "AES-Key": os.getenv("AES_KEY"),
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.delete(url, headers=headers)
            response.raise_for_status()

    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=str(exc))
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
