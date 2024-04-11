from fastapi import FastAPI
from chatbot import Chatbot

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/chat/{user_query}")
async def chat():
    response = Chatbot.ask_openai(user_query: str)
    return {"message": response}