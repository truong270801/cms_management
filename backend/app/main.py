from fastapi import HTTPException, Depends, FastAPI
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
from app.Controller.router_user import user 
from app.Controller.router_stream import stream 
from app.security.jwt import create_jwt_token
from app.Database.config import get_db, Base, engine
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session  
from app.Model.model import User
import os
from dotenv import load_dotenv

load_dotenv()

TIME = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")) 
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

#Đăng nhập lấy mã token
@app.post("/login")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = User.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Sai tài khoản hoặc mật khẩu")
    
    access_token_expires = timedelta(minutes=TIME)
    access_token = create_jwt_token(data={"sub": user.username,"role": user.role}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

@app.get('/')
async def Home():
    return "Welcome Home"

Base.metadata.create_all(bind=engine)
app.include_router(user, prefix="/users", tags=["Users"])  
app.include_router(stream, prefix="/streams", tags=["Stream"])  