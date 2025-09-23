import React, { useContext } from 'react'
import { useState,useEffect } from "react";
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';

const Chat = () => {
  const [error, setError] = useState('');
  const [AllConversation, setAllConversation] = useState()
  const {User} = useContext(AuthContext)

  useEffect(() => {
    const fetchConversation= async () => {
       try {
      const res=await api.get(`/find/ ${User._id}`,AllConversation)
      setAllConversation(res.data)
    } catch (err) {
      setError(err.response?.data.error || error.response?.data.message)
    }
    }
    if (User._id) fetchConversation();
  }, [User]);
  return (
    <div>
      <h1 className=''>
        Chats
      </h1>
    </div>
  )
}

export default Chat
