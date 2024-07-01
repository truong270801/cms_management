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


class streamSchema(BaseModel):
    start_time:Optional[str] = None
    end_time:Optional[str] = None
    url:Optional[str] = None
    channel_id:Optional[int] = None
    status:Optional[str] = None
   
    
    class Config:
        orm_mode = True

class requestStream(BaseModel):
    stream: streamSchema = Field(...)

class ResponseStream (GenericModel,Generic[T]):
    stream: Optional[T]