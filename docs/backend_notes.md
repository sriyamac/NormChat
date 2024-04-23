### To install python packages 
`cd server`

`python -m venv venv`

`source ./venv/bin/activate`

`pip install -r requirements.txt`

If you get errors, you may have to use `pip3` instead, or run the program with `python3`,
as there are syntax differences that cause errors with older versions of python.

### To run the server 
This is a work in progress.

`cd server`

`uvicorn main:app --reload` to start uvicorn

## API Specifications 

### /startchat

Purpose: <br>
Start the chat and show the welcome message to the user.<br>
**Making a request**

Method: GET <br>

**Response** 

JSON data is returned with a field "message" containing 
the response from NormChat.

### /chat

Purpose: <br>
Send a message to normchat and send the response to the user.<br>
**Making a request**

Method: POST <br>
Headers:  "Content-Type": "application/json",<br>
Body: Must be JSON. <br>
Body Fields: content, stores user query. <br>

**Response** 

JSON data is returned with a field "message" containing 
the response from NormChat.