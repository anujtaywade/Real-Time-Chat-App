import React from 'react'
import { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";

const AddFriend = ({childern}) => {

      const [AddFriendOpen, setAddFriendOpen] = useState(false);
  const [FriendId, setFriendId] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Message, setMessage] = useState();

  const 


  return (
    <div>
           
              <div >
                     <button
                     onClick={()=>{setAddFriendOpen((prev)=>!prev)}} 
                     className="absolute right-30 top-5 text-3xl"><IoPersonAddSharp /></button>
      
                    {AddFriendOpen && (
        <div className="absolute right-40 top-5 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 z-50 transition-all duration-200">
       
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Add Friend</h3>
            <button
              onClick={() => setAddFriendOpen(false)} 
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
      
         
          <input
            type="text"
            placeholder="Enter Zoroa ID"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-sm mb-3"
          />
      
        
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setAddFriendOpen(false)} 
              className="px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 text-sm"
            >
              Cancel
            </button>
      
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-sm text-sm transition-all"
            >
              Add
            </button>
          </div>
        </div>
      )}
                    
                  </div>
      
             
      
    </div>
  )
}

export default AddFriend
