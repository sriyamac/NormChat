import { useState, useEffect, useRef } from "react";
import { addDoc, serverTimestamp, collection, onSnapshot, query, where, orderBy } from 'firebase/firestore'; //adds doc to collection
import { db, auth } from "../firebase-config";
import Cookies from "universal-cookie";
import { v4 as uuidv4 } from 'uuid'; //for new room reference 
import { signOut } from 'firebase/auth';
import { Auth } from "./Auth";
import { Link, useParams } from "react-router-dom"
import { Card } from "../components/ui/card";


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
      user: auth.currentUser.displayName, //username
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
      {/* Header styling has been recreated with tailwindcss: https://tailwindcss.com/docs/ */}
      <div className="bg-[#00703c] grid grid-cols-3 justify-items-center items-center p-2 text-white">
        <div></div>
        <h1>Room ID: {room.toUpperCase()}</h1> {/**room ID is displayed for debugging purposes, will change to "NormChat" before deployment*/}
        <Link to="/auth" className="justify-self-end">
          <button onClick={signUserOut} className='btn btn-active'> Sign Out </button>
        </Link>
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

          <form onSubmit={handleSubmit} className="new-message-form">
            <input
              type="text"
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
              className="new-message-input"
              placeholder="Type your message here..."
            />
            <button type="submit" className="btn btn-success">
              Send
            </button>
          </form>

          <Link to="/conversation-list"><button className="btn btn-active">Close Chat</button></Link>
        </Card> </div>
    </div >
  );
};