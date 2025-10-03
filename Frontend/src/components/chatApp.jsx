import React from 'react'
import ChatList from './ChatList';
import MessagePanel from './MessagePanel';
import Navbar from './Navbar';
import { useState } from "react";
import { Toaster } from "react-hot-toast";


const ChatApp = () => {
    const [selectedConv, setSelectedConv] = useState(null);
     const [Theme, setTheme] = useState(false);

  return (
    
    <div className='flex flex-col h-screen'>
      <Navbar Theme={Theme} setTheme={setTheme}/> 
      
      
      <div className='flex flex-1'> 
        <ChatList selectedConv={selectedConv} setSelectedConv={setSelectedConv}/>
      
      <Toaster position='bottom-center' reverseOrder={false} />

    
      {selectedConv ? (
        <MessagePanel conversation={selectedConv} Theme={Theme} setTheme={setTheme} />
      ):(
        <div className='flex-1 flex items-center justify-center text-gray-400'>
            select a chat to start messaging
        </div>
      
      )}
     

    </div>
    </div>
  
  )
    
}

export default ChatApp
