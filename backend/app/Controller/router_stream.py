from fastapi import APIRouter, HTTPException, Depends
from app.security.middleware_check import check_jwt_token, check_admin
from app.Database.schemas import  RequestStream, ResponseStream
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

@stream.post("/create", response_model=ResponseStream)
async def create_stream(
    stream_data: RequestStream,
    token_payload: dict = Depends(check_jwt_token),
):
    await check_admin(token_payload)
    url = os.getenv('API_POST_STREAM')

    auth_key = os.getenv('AUTHORIZATION_KEY')
    aes_key = os.getenv('AES_KEY')

    if not auth_key or not aes_key:
        raise HTTPException(status_code=500, detail="Environment variables AUTHORIZATION_KEY or AES_KEY are missing")

    headers = {
        "Authorization": f"Bearer {auth_key}",
        "AES-Key": aes_key,
        "Content-Type": "application/json"
    }

    payload = stream_data.items.dict()

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=payload)
            response.raise_for_status()
        

            return {"message": "ok"} 
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=str(exc))
    except Exception as exc:
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
