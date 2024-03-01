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

  // New chat button works, but it does not make a new chat. It directs to the chat page with the same chat.
  return (
    <div className="">
      <div className="p-3 flex flex-row justify-between shadow-sm items-center">
        <div className='text-2xl'>
          <p>Conversation List</p>
        </div>
        <div>
          <button className="btn br-1">Feedback</button>
          <Link to="/chat"><button className="btn btn-success">New Chat</button></Link>
        </div>
      </div>
      <div className='container pt-2 pb-2'>
        {closedRooms.map((closedRoom) => (
          <div key={closedRoom.id} className='p-2.5 m-2 rounded shadow-sm border room-card'>
            <Link to={`/conversation-list/${closedRoom.id}`} className='grid grid-cols-2'>
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

// Conversation List logic that works but with no UI: 

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
// import { db } from '../firebase-config';

// export const ConversationList = () => {
//   const [closedRooms, setClosedRooms] = useState([]);

//   useEffect(() => {
//     const fetchClosedRooms = async () => {
//       const roomsCollection = collection(db, 'messages');
//       const closedRoomsQuery = query(roomsCollection, orderBy('createdAt', 'desc'), limit(1));

//       try {
//         const closedRoomsSnapshot = await getDocs(closedRoomsQuery);
//         const closedRoomsData = closedRoomsSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           room: doc.data().room, //room reference 
//           lastMessage: doc.data().text, // the last message the user sent in the room
//         }));
//         setClosedRooms(closedRoomsData);
//       } catch (error) {
//         console.error('Error fetching closed rooms:', error);
//       }
//     };
//     fetchClosedRooms();
//   }, []);
//   return (
//     <div className="chat-app">
//       <div className="header">
//       <h1>Conversation List</h1>
//       </div>
//       <div className="messages">
//       <ul>
//         {closedRooms.map((closedRoom) => (
//           <li key={closedRoom.id}>
//             <Link to={`/conversation-list/${closedRoom.id}`}>
//               <strong>{`Room:`}</strong> {closedRoom.room}, <strong>{`Last Message:`}</strong> {closedRoom.lastMessage}
//             </Link>
//           </li>
//         ))}
//       </ul>
//       </div>
//     </div>
//   );
// };
// export default ConversationList;
