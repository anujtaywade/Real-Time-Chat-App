import React, { useContext } from 'react'
import { AuthContext } from "../context/AuthContext";

const Message = ({ conversation }) => {
  const { User } = useContext(AuthContext)

  return (
    <div className="flex flex-col h-screen w-full pt-[80px]">


   
      <div className="sticky top-[80px] z-40 pb-2 pl-2 border-b bg-white font-semibold text-2xl">
        {conversation?.participants.find((p) => p._id !== User.id)?.name || "Unknown"}
      </div>

  
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="mb-2 w-max p-2 rounded"></div>
        <div className="mb-2  w-max p-2 rounded ml-auto"></div>
      </div>

    
      <div className="p-3 border-t bg-white flex">
        <input
          type="text"
          name="message"
          placeholder="Start typing..."
          className="flex-1 h-12 px-4 border rounded-lg focus:outline-none"
        />
        <button className="ml-2 px-4 bg-blue-500 text-white rounded-lg">Send</button>
      </div>
    </div>
  )
}

export default Message
