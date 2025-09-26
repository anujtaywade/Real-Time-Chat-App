import React, { use } from 'react'
import api from '../api/axios';
import {  AuthContext } from "../context/AuthContext";

const Message = () => {
    const {user} = use(AuthContext)
  return (
    <div>
       <div>
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
