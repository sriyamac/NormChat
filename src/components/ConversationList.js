import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase-config';
import { getAuth } from 'firebase/auth'

export const ConversationList = () => {
  const [closedRooms, setClosedRooms] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const auth = getAuth()
      const user = auth.currentUser;
      return user;
    }

    const fetchClosedRooms = async () => {
      const user = await fetchUser();
      if (!user) return;

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

  // New chat does not make a new chat. Unsure of how to make it create a new room id
  return (
    <div className="">
      <div className="p-3 flex flex-row justify-between shadow-sm items-center">
        <div className='text-2xl'>
          <p>Conversation List</p>
        </div>
        <div>
          <button className="btn br-1 mr-2">Feedback</button>
          <Link to="/new-chat"><button className="btn btn-success">New Chat</button></Link>
        </div>
      </div>
      <div className='container pt-2 pb-2'>
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
  );
};

export default ConversationList;
