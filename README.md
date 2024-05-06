# NormChat (ITSC 4155 Capstone Project)
<p>Group 9</p>
<p></p>Sriya Machunuri (sriyamac), Giovanni Abbate (gabbate102), Christian Browning (christianbrowning), Mina Rao (minarao03), Jared Hawkins-Young (jared-hawkins-young) </p>

## Project Overview: 
<p>NormChat is an AI Chatbot designed to provide quick access to UNC Charlotte website information for students. Students can log in with their email address and can ask questions related to UNC Charlotte in the chatbot. The chatbot will then swiftly retrieve relevant information from the website delivering concise responses within seconds. Navigating the university website can often be inconvenient and lengthy due to its outdated interface. NormChat offers students a streamlined solution to quickly access specific information they need.</p>

## Documents:
Documents (User stories, Context diagram, Use case diagram, Product backlog, Activity diagram, Design Document versions) are in the `/docs` folder
<p> </p>

## .env file was emailed to Sandra Wiktor (swiktor@uncc.edu) and Mohsen Dorodchi (mdorodch@charlotte.edu)
After cloning the capstone project locally, please add the `.env` attached file to its root (top level) directory
<p></p>

## Requirements/Steps:

```bash
git clone https://github.com/sriyamac/ITSC4155_NormChat_Group9
```

## Running Frontend
```bash
cd ITSC4155_NormChat_Group9/frontend
npm install
npm start
```

Now please keep the terminal for frontend running and open a new terminal and run the lines below for the server

## Installing Python Packages
```bash
cd server
python -m venv venv
source ./venv/bin/activate
pip install -r requirements.txt
```
If you get errors, you may have to use `pip3` instead, or run the program with `python3`, as there are syntax differences that cause errors with older versions of python.

## Running Server
```bash
cd server
uvicorn main:app --reload
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

