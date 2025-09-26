import React from 'react'
import ChatList from './ChatList';
import MessagePanel from './MessagePanel';
import { useState } from "react";


const ChatApp = () => {
    const [selectedConv, setSelectedConv] = useState(null);
    console.log("currently selected",selectedConv)
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

export default ChatApp
