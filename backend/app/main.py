#main.py
from fastapi import HTTPException, Depends, FastAPI
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
from app.Controllers.router_user import user
from app.Controllers.router_stream import stream
from app.Security_jwt.jwt import create_jwt_token, create_refresh_token, decode_jwt_token
from app.Database.config import get_db, Base, engine
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.Model.model import User
import os
from dotenv import load_dotenv
from sqlalchemy.exc import IntegrityError

load_dotenv()

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")) 
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS"))

admin_username = os.getenv("ADMIN_USERNAME")
admin_password = os.getenv("ADMIN_PASSWORD")
admin_role = os.getenv("ADMIN_ROLE")
admin_fullname = os.getenv("ADMIN_USERNAME")

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.post("/login")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = User.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Sai tài khoản hoặc mật khẩu")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    
    access_token = create_jwt_token(
        data={"sub": user.username, "role": user.role},
        expires_delta=access_token_expires
    )
    refresh_token = create_refresh_token(
        data={"sub": user.username},
        expires_delta=refresh_token_expires
    )
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@app.post("/refreshtoken")
async def refresh_token(refresh_token: str, db: Session = Depends(get_db)):

    payload = decode_jwt_token(refresh_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    
    username = payload.get("sub")
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    new_access_token = create_jwt_token(
        data={"sub": user.username, "role": user.role},
        expires_delta=access_token_expires
    )
    
    return {"access_token": new_access_token, "token_type": "bearer"}

@app.get('/')
async def Home():
    return "Welcome Home"

def create_admin_user(db: Session):
   
    existing_user = db.query(User).filter(User.username == admin_username).first()
    if not existing_user:
        try:
            admin_user = User(
                username=admin_username,
                password=admin_password,
                role=admin_role,
                fullname=admin_fullname
            )
            db.add(admin_user)
            db.commit()
        except IntegrityError:
            db.rollback()

Base.metadata.create_all(bind=engine)

with next(get_db()) as db:
    create_admin_user(db)

app.include_router(user, prefix="/users", tags=["Users"])
app.include_router(stream, prefix="/streams", tags=["Streams"])