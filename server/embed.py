import os
from langchain.embeddings.openai import OpenAIEmbeddings
import openai
from pinecone import Pinecone, ServerlessSpec
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
import os

load_dotenv() 

# Initialize Pinecone environment
pc = Pinecone(
    api_key=os.environ.get("PINECONE_API_KEY")
)

# Check if your Pinecone index exists, if not create one
index_name = os.getenv("PINECONE_INDEX_NAME")

index = pc.Index(index_name)
print("please work")
vectors = []
response = openai.Embedding.create(
             model="text-embedding-3-small",  # or any other suitable model
            input="please work"  # Choose the model that best fits your needs
        )
# Extracting the embedding vector
vector = response['data'][0]['embedding']
vectors.append(vector)
print('i worked')

def split_text(file_path, chunk_size=1000, overlap=100):
    with open(file_path, 'r', encoding='utf-8') as file:
        text = file.read()
        chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size-overlap)]
    return chunks

def vectorize_text(text_chunks):
    vectors = []
    for text in text_chunks:
        response = openai.Embedding.create(
             model="text-embedding-ada-002",  # or any other suitable model
            input=text  # Choose the model that best fits your needs
        )
        # Extracting the embedding vector
        vector = response['data'][0]['embedding']
        vectors.append(vector)
    return vectors

def insert_into_pinecone(text_chunks, vectors):
    # Create (id, vector) pairs
    data = [(str(i), vector) for i, vector in enumerate(vectors)]
    # Insert data into Pinecone
    index.upsert(vectors=data)

# Example usage
file_path = "/Users/jaredhawkins-young/Downloads/documentation_chatbot/aux-uncc.txt"
text_chunks = split_text(file_path)
vectors = vectorize_text(text_chunks)
insert_into_pinecone(text_chunks, vectors)



print("Data inserted into Pinecone successfully.")