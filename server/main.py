from fastapi import FastAPI
from pydantic import BaseModel
from chatbot import Chatbot
from fastapi.middleware.cors import CORSMiddleware

# create FastAPI instance
app = FastAPI()

# Create Accepted Origins for CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
]

# Add middleware for CORS 
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create model for userRequest data
class UserRequest(BaseModel):
    content: str

# Default route
@app.get("/")
async def root():
    return {"message": "Hello World"}

# Chat API is used to get a response from chatbot.py. 
# details about specifications can be found in backend_notes.md
@app.post("/chat")
async def chat(user_query: UserRequest):
    response = Chatbot.ask_openai(Chatbot,"hello",150)
    print(response);
    return {"message": response}