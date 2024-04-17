import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; //for new room reference 

export const NewChat = ( ) => {
  //once a user logs in, uuidv4 will generate a unique room ID
  const [room, setRoom] = useState(uuidv4()) //for joining different chatbots

  window.location.href = `/chat/${room}`; //redirecting to chat

  return (
    <></>
  )
}

