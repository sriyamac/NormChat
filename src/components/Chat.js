import { useState, useEffect } from "react";
import { addDoc, serverTimestamp, collection, onSnapshot, query, where, orderBy } from 'firebase/firestore'; //adds doc to collection
import { db, auth } from "../firebase-config";
import "../styles/App.css";

export const Chat = (props) => {

    const {room} = props; //may delete later 
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
    <div className = "chat-app">
        <div className = "header"> 
            <h1>{room}</h1>
        </div>
        <div> {" "}{messages.map((message) => <h1> {message.text} </h1>)}</div>
        <form onSubmit = {handleSubmit} className = "new-message-form"> 
            <input 
            className  = "new-message-input"
            placeholder = "Type message here..."
            onChange = {(e) => setNewMessage(e.target.value)} //sets new message to be equal to what the input is currently
            />
            <button type = "sumbit" className = "send-button">
                Send
            </button>
        </form>
     </div>
    );
};