import { useState } from "react";
import { addDoc, serverTimestamp, collection } from 'firebase/firestore'; //adds doc to collection
import { db, auth } from "../firebase-config";

export const Chat = (props) => {
    const {room} = props; //may delete later 
    const [newMessage, setNewMessage] = useState(""); //assigns what the user types in the input, keeping track of new messages being set in input

    const messagesRef = collection(db, "messages"); //reference to the DB

    const handleSubmit = async (e) => {
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