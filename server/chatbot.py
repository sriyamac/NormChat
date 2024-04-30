import os
from dotenv import load_dotenv
import openai
from pinecone import Pinecone

load_dotenv() 

class Chatbot:
    def __init__(self):
        load_dotenv()  # Load environment variables from .env file
        self.pc = Pinecone(api_key=os.environ.get("PINECONE_API_KEY"))
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        openai.api_key = self.openai_api_key
        
        # Initialize Pinecone
        pinecone_api_key = os.getenv("PINECONE_API_KEY")
        pinecone_index_name = os.getenv("PINECONE_INDEX_NAME")
        self.pinecone_index = self.pc.Index(pinecone_index_name)
    
    def ask_openai(self, prompt, max_tokens=150):
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4-turbo-preview",  # Specify the chat model you're using
                messages=[
                    {"role": "system", "content": "You are a helpful assistant for the University of North Carloina at Charlotte whos job is to give useful information about UNCC's campus."},
                    {"role": "user", "content": prompt},
                ],
                max_tokens=max_tokens,
                temperature=0.5,
            )
            # Extract and return the text from the latest message in the response
            if response['choices'] and len(response['choices']) > 0:
                latest_choice = response['choices'][0]
                if latest_choice['message']['content']:
                    return latest_choice['message']['content'].strip()
            return "I'm sorry, I couldn't generate a response."
        except Exception as e:
            print(f"Error in ask_openai: {str(e)}")
            return "I'm sorry, but I encountered an error while processing your request."

        
    def generate_query_vector(self, query_text):
        try:
            # Use OpenAI to generate a vector for the query
            response = openai.Embedding.create(
                model='text-embedding-3-small',  # Ensure this matches your indexing model
                input=query_text
            )
            # Extract the embedding vector
            vector = response['data'][0]['embedding']
            return vector
        except Exception as e:
            print(f"Error generating query vector: {str(e)}")
            return None

    def query_pinecone_and_generate_response(self, query_text, top_k=3):
        try:
            query_vector = self.generate_query_vector(query_text)
            if query_vector is None:
                raise ValueError("Failed to generate query vector.")
            
            # Ensure to include include_metadata=True in your query
            pinecone_response = self.pinecone_index.query(vector=query_vector, top_k=top_k, include_metadata=True)
            
            matches = pinecone_response.get('matches', [])
            if not matches:
                return "I couldn't find any specific information in our database. Let me try to explain based on what I know."
            
            # Initialize an empty list to collect summaries
            summaries = []
            for match in matches:
                # Check if 'metadata' exists and has 'summary'
                if 'metadata' in match and 'summary' in match['metadata']:
                    summaries.append(match['metadata']['summary'])
                else:
                    summaries.append("No summary provided.")
            
            # Join the summaries for the OpenAI prompt
            context_text = " ".join(summaries)
            prompt_text = f"Based on the following details: {context_text} How would you succinctly explain '{query_text}'?"
            
            # Query OpenAI with this prompt
            openai_response = self.ask_openai(prompt_text)
            
            return openai_response
        except Exception as e:
            print(f"Error in querying Pinecone and generating response: {str(e)}")
            return "I encountered an error while trying to generate a response."

    def start_chat(self):
        bot = 'Norm'
        print("[Norm]: Hello! How can I help you with University of North Carolina at Charlotte information? Type 'exit' to close chat.")
        while True:
            user_input = input("> ")
            if user_input.lower() == "exit":
                print("[Norm]: Goodbye!")
                break
            # First, try to get relevant information from Pinecone
            pinecone_response = self.query_pinecone_and_generate_response(user_input)
            if pinecone_response:
                # Process Pinecone response to generate a meaningful reply
                # This part needs customization based on how your data is structured in Pinecone
                print(f"[Norm]: {pinecone_response}")
            else:
                # If Pinecone does not return useful info, fallback to OpenAI
                print('openai fall back response')
                prompt = user_input  # Customize this prompt with more context if needed
                response = self.ask_openai(prompt)
                print(f"[Norm]: {response}")

if __name__ == "__main__":
    chatbot = Chatbot()
    chatbot.start_chat()