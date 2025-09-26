import React from 'react'
import ChatList from './ChatList';
import MessagePanel from './MessagePanel';
import React, { useState } from 'react';


const chatApp = () => {
    const [selectedConv, setSelectedConv] = useState(null);
  return (
    <div className='flex h-screen'>
      <ChatList selectedConv={selectedConv} setSelectedConv={setSelectedConv}/>

      {selectedConv ? (
        <MessagePanel conversation={selectedConv} />
      ):(
        <div className='flex-1 flex items-center justify-center text-gray-400'>
            select a chat to start messaging
        </div>
      
      )}
    </div>
  )
}

export default chatApp
