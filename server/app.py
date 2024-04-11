from fastapi import FastAPI
from chatbot import Chatbot

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/chat/{user_query}")
async def chat(user_query):
    response = Chatbot.ask_openai(user_query)
    return {"message": response}