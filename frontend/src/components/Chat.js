import { useState, useEffect, useRef } from "react";
import { addDoc, serverTimestamp, collection, onSnapshot, query, where, orderBy } from 'firebase/firestore'; //adds doc to collection
import { db, auth } from "../firebase-config";
import Cookies from "universal-cookie";
import { v4 as uuidv4 } from 'uuid'; //for new room reference 
import { signOut } from 'firebase/auth';
import { Auth } from "./Auth";
import { Link, useParams } from "react-router-dom"
import { Card } from "../components/ui/card";
import { chat } from "../chat-helper";
import "../styles/App.css";

const cookies = new Cookies(); //get, set, and remove cookies from browser

export const Chat = (isAuth) => {
  // Check if user is logged in
  if (!isAuth) {
    // if not, set these vars as undefined and empty and redirect to auth page
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
      user: auth.currentUser ? auth.currentUser.displayName : "Anonymous",//username
      room, //may delete later
    });
    
    // call chat method to get response from gpt
    const response = await chat(newMessage);
    console.log(response);

    // add message to messages array
    await addDoc(messagesRef, {
      text: JSON.parse(response).message, //content of the message
      createdAt: serverTimestamp(), //time message was created
      user: "NormChat", //username
      room, //may delete later
    });

    setNewMessage("") //emptys input after
  };


  const [isAuth1, setIsAuth1] = useState(cookies.get("auth-token")) //if there is an auth-token then set to true (you can check by inspecting page manually)
  const [room1, setRoom1] = useState(uuidv4()) //for joining different chatbots
  const roomInputRef = useRef(null)
  const signUserOut = async () => {

    try {
      await signOut(auth);
      cookies.remove("auth-token");
      setIsAuth1(false);
      setRoom1(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }

  };


  return (

    <div className="chat-app">
      <div className="header">
        <div></div>
        <h1>Welcome  <b>{auth.currentUser ? auth.currentUser.displayName : "Guest"}</b></h1> {/**room ID is displayed for debugging purposes, will change to "NormChat" before deployment*/}
        <div className="header-right-col header-button-container">
          <Link to="/conversation-list">
            <button className="btn btn-active">Close Chat</button>
          </Link>
          <Link to="/auth">
            <button onClick={signUserOut} className='btn btn-active'> Sign Out </button>
          </Link>
        </div>
      </div>

      <div className="chat-container">
        <Card className="messagesCard grid grid-cols-1 grid-rows-11">
          <div className="messages row-span-10 overflow-y-scroll flex flex-col">

            {messages.map((message) => (
              <div key={message.id} className="m-2">
                <div class={message.user=="NormChat" ? 'chat-start flex flex-row':'chat-end flex flex-row justify-end'}>
                  <div class="chat-bubble">{message.text}</div>
                </div>
              </div>
            ))}

          </div>

          <form onSubmit={handleSubmit} className="new-message-form row-span-1 grid grid-cols-6 gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
              className="input input-bordered col-span-5"
              placeholder="Type your message here..."
            />
            <button type="submit" className="btn btn-success col-span-1">
              Send
            </button>
          </form >
        </Card> </div>
    </div >
  );
};