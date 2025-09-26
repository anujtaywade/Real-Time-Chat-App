import React, { useContext } from 'react'
import api from '../api/axios';
import {  AuthContext } from "../context/AuthContext";

const Message = ({conversation}) => {
    const {User} = useContext(AuthContext)

  return (
    <div>
       <div className='flex h-screen'>

          <input 
          type="text"
          name="name"
          placeholder="Start typing"
          
          

           />
        </div>
    </div>
  )
}

export default Message
