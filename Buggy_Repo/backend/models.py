from pydantic import BaseModel

class Item(BaseModel):  # Added BaseModel inheritance
    name: str
    description: str

class User(BaseModel):
    username: str
    bio: str
    
    # You can raise your hands and give the answer to the chocolate question
