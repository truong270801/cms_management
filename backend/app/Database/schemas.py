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
    id: Optional[str]
    location: Optional[str]
    start: Optional[str]
    end: Optional[str] 
    play_auth_type: Optional[str] 

    class Config:
        orm_mode = True

class RequestStream(BaseModel):
    items: StreamSchema = Field(...)

class ResponseStream(GenericModel, Generic[T]):
    items: Optional[T]