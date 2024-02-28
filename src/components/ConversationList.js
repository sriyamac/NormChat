import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { db, auth } from '../firebase-config';

export const ConversationList = () => {
  const [closedRooms, setClosedRooms] = useState([]);
  
  useEffect(() => {
    const fetchClosedRooms = async () => {
      const user = auth.currentUser;
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

    fetchClosedRooms();
  }, []);

  return (
    <div className="container">
      <div className="p-3 flex flex-row">
        <div>
          <p>Conversation List</p>
        </div>
        <div>
          <button className="btn btn-success">Success</button>
        </div>
      </div>
      <div>
        <ul>
          {closedRooms.map((closedRoom) => (
            <li key={closedRoom.id}>
              <Link to={`/conversation-list/${closedRoom.id}`}>
                <strong>{`Room:`}</strong> {closedRoom.room}, <strong>{`Last Message:`}</strong> {closedRoom.lastMessage}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConversationList;
