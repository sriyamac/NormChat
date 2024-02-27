import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase-config';

export const ConversationList = () => {
  const [closedRooms, setClosedRooms] = useState([]);

  useEffect(() => {
    const fetchClosedRooms = async () => {
      const roomsCollection = collection(db, 'messages');
      const closedRoomsQuery = query(roomsCollection, orderBy('createdAt', 'desc'), limit(1));

      try {
        const closedRoomsSnapshot = await getDocs(closedRoomsQuery);
        const closedRoomsData = closedRoomsSnapshot.docs.map((doc) => ({
          id: doc.id,
          room: doc.data().room, //room reference 
          lastMessage: doc.data().text, // the last message the user sent in the room
        }));

        setClosedRooms(closedRoomsData);
      } catch (error) {
        console.error('Error fetching closed rooms:', error);
      }
    };

    fetchClosedRooms();
  }, []);

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Conversation List</h1>
      </div>

      <div className="messages">
        {closedRooms.map((closedRoom) => (
          <div className="collapse bg-base-200" key={closedRoom.id}>
            <input type="radio" name="my-accordion-1" /> 
            <div className="collapse-title text-xl font-medium">
              Last Message: { closedRoom.lastMessage }
            </div>
            <div className="collapse-content"> 
              {closedRoom.room}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
