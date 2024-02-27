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
    <div>
      <h1>Conversation List</h1>
      <ul>
        {closedRooms.map((closedRoom) => (
          <li key={closedRoom.id}>
            <Link to={`/conversation-list/${closedRoom.id}`}>
            {`Room: ${closedRoom.room}, Last Message: ${closedRoom.lastMessage}`} {/**displays the room code and the last message the user sent */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
