from fastapi import FastAPI
from pydantic import BaseModel
from chatbot import Chatbot
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserRequest(BaseModel):
    content: str

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/chat")
async def chat(user_query: UserRequest):
    return user_query.content
    response = Chatbot.ask_openai(Chatbot,"hello",150)
    print(response);
    return {"message": response}