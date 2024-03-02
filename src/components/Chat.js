import { useState, useEffect } from "react";
import { addDoc, serverTimestamp, collection, onSnapshot, query, where, orderBy } from 'firebase/firestore'; //adds doc to collection
import { db, auth } from "../firebase-config";

import "../styles/App.css";

import { Link, useParams } from "react-router-dom"
import { Card } from "../components/ui/card";

export const Chat = (isAuth) => {
  // Check if user is logged in
  if (!isAuth) {
    room = undefined;
    setMessages([])
    window.location.href = "/auth";
  }

  // get room id from url parameter
  const { room } = useParams(); 
  const [messages, setMessages] = useState([]); //in array
  const [newMessage, setNewMessage] = useState(""); //assigns what the user types in the input, keeping track of new messages being set in input
  
  const messagesRef = collection(db, "messages"); //reference to the specific DB collection

  useEffect(() => { //firebase checks any changes in our collections
    const queryMessages = query( //checks if room is the same as static room name and makes a query
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => { //function to listen to changes, runs everytime theres changes to query
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id }); //firebase syntax, grabbing data from document by ...doc.data() 
      });
      console.log(messages); //debugging
      setMessages(messages);
    });

    return () => unsuscribe(); //cleaning up function
  }, []);

  const handleSubmit = async (e) => { //messages are created
    e.preventDefault();

    if (newMessage === "") return; //checks if message is empty

    await addDoc(messagesRef, {
      text: newMessage, //content of the message
      createdAt: serverTimestamp(), //time message was created
      user: auth.currentUser.displayName, //username
      room, //may delete later
    });

    setNewMessage("") //emptys input after
  };

  return (

    <div className="chat-app">

      <div className="header">
        <h1>Room ID: {room.toUpperCase()}</h1> {/**room ID is displayed for debugging purposes, will change to "NormChat" before deployment*/}
      </div>
      <div className="chat-container">
        <Card className="messagesCard">
          <div className="messages">

            {messages.map((message) => (
              <div key={message.id} className="message">
                <span className="user">{message.user}:</span> {message.text}
              </div>
            ))}

          </div>
        </Card>
        <form onSubmit={handleSubmit} className="new-message-form">
          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            className="new-message-input"
            placeholder="Type your message here..."
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
      <button className="send-button close"><Link to="/conversation-list">Close Chat</Link></button>
    </div >
  );
};