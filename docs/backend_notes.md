### To install python packages 
`cd server`

`python -m venv venv`

`source ./venv/bin/activate`

`pip install -r requirements. txt`

If you get errors, you may have to use `pip3` instead, or run the program with `python3`,
as there are syntax differences that cause errors with older versions of python.

### To run the server 
This is a work in progress.
`uvicorn main:app --reload` to start uvicorn