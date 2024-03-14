import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { getAuth } from 'firebase/auth'
import Cookies from "universal-cookie";
import { v4 as uuidv4 } from 'uuid'; //for new room reference 
import { signOut } from 'firebase/auth';

const cookies = new Cookies(); //get, set, and remove cookies from browser

export const ConversationList = () => {


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

  const [closedRooms, setClosedRooms] = useState([]);
  useEffect(() => {
    // get current user 
    const fetchUser = async () => {
      const auth = getAuth()
      const user = auth.currentUser;
      return user;
    }

    const fetchClosedRooms = async () => {
      const user = await fetchUser();
      if (!user) {
        window.location.href = "/auth"; //redirecting to new-chat to create new chat;
      }

      // get list of conversations
      const roomsCollection = collection(db, 'messages');
      const closedRoomsQuery = query(roomsCollection, orderBy('createdAt', 'desc'));

      try {
        const closedRoomsSnapshot = await getDocs(closedRoomsQuery);
        const closedRoomsData = closedRoomsSnapshot.docs.map((doc) => ({
          id: doc.id,
          user: doc.data.user,
          room: doc.data().room, //room reference 
          lastMessage: doc.data().text, // the last message the user sent in the room
        }));

        setClosedRooms(closedRoomsData);
      } catch (error) {
        console.error('Error fetching closed rooms:', error);
      }
    };
    console.log("fetching...")
    fetchClosedRooms();
  }, []);

  return (
    <div className="">
      <div className="header">
        <div className='text-3xl header-left-col'>
          <p>NormChat</p>
        </div>
        <div className='text-2xl'>
          <p>Conversations</p>
        </div>
        <div className='header-right-col header-button-container'>
          <Link to="/new-chat">
            <button className="btn btn-success text-white">+ New Chat</button>
          </Link>
          <Link to="/feedback">
            <button className="btn btn-active">Feedback</button>
          </Link>
          <Link to="/auth">
            <button onClick={signUserOut} className='btn btn-active'> Sign Out </button>
          </Link>
        </div>
      </div>
      <div className='content-container'>
        <div className='container room-list'>
          {closedRooms.map((closedRoom) => (
            <div key={closedRoom.id} className='p-2.5 m-2 rounded shadow-sm border room-card'>
              <Link to={`/chat/${closedRoom.id}`} className='grid grid-cols-2'>
                <div><strong>Last Message: </strong>{closedRoom.lastMessage}</div>
                <div>Room: {closedRoom.room}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationList;
