#schemas.py
from typing import Optional,Generic, TypeVar
from pydantic import BaseModel, Field
from pydantic.generics import GenericModel

T = TypeVar('T')
class userSchema(BaseModel):
    fullname:Optional[str] = None
    username:Optional[str] = None
    password:Optional[str] = None
    role:Optional[str] = None
   
    
    class Config:
        orm_mode = True

class RequestUser(BaseModel):
    user: userSchema = Field(...)

class ResponseUser (GenericModel,Generic[T]):
    user: Optional[T] 

class StreamSchema(BaseModel):
    id: str = Field(..., example="a1b2c3")
    location: str = Field(..., example="/all/file1.mp4")
    start: str = Field(..., example="2024-07-16T23:00:00+07:00")
    end: str = Field(..., example="2024-07-17T01:00:00+07:00")
    play_auth_type: Optional[str] = Field(default="", example="token")

    class Config:
        orm_mode = True

class RequestStream(BaseModel):
    items: StreamSchema

class ResponseStream(BaseModel):
    message: str