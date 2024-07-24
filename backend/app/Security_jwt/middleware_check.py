from fastapi import Request, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.Security_jwt.jwt import decode_jwt_token
from datetime import datetime, timedelta

async def check_jwt_token(credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer())):
    token = credentials.credentials
    payload = decode_jwt_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    exp = payload.get("exp")
    if exp and datetime.utcfromtimestamp(exp) - datetime.utcnow() < timedelta(minutes=1):
        raise HTTPException(status_code=401, detail="Token is about to expire")
    
    return payload

async def check_admin(payload: dict = Depends(check_jwt_token)):
    role = payload.get("role")
    if not role:
        raise HTTPException(status_code=403, detail="Token does not contain role information")
    if role != "admin":
        raise HTTPException(status_code=403, detail="User does not have admin privileges")
    return payload