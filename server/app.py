from fastapi import FastAPI
from chatbot import Chatbot

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}