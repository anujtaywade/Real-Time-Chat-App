import api from 'axios';
import React from 'react'
import { useState ,useEffect} from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { toast, Toaster } from "react-hot-toast";



const AddFriend = ({UserId}) => {

      const [AddFriendOpen, setAddFriendOpen] = useState(false);
  const [FriendId, setFriendId] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Message, setMessage] = useState("");

  useEffect(() => {
    if (Message){
        const timer=setTimeout(()=>
            toast.success(""),3000)
        return()=>clearTimeout(timer)
    }
  }, [Message]);

  const handleAddFriend=async()=>{
    if (!FriendId.trim()){ 
        toast.error("Enter Zoroa Id")
        return ;
    }
    
     if (!UserId) {
      toast.error("User not found");
      return;
    }

     try {
        setLoading(true)
        const addFriendURL = import.meta.env.VITE_ADDFRIEND_URL
    const res = await api.post(`${addFriendURL}/${UserId}`,
        
        {friendUniqueId: FriendId},
        {withCredentials : true }
    )
    console.log(`${addFriendURL}/${UserId}`);
    toast.success(res.data.Message || "Friend added successfully")
    setFriendId ("")
  } catch (error) {
     if (error.response) {
        if (error.response.status === 404) {
          toast.error("User not found");
        } else if (error.response.status === 400) {
          toast.error(error.response.data.message || "Already friends");
        } else {
          toast.error(error.response.data.message || "Failed to add friend");
        }
      } else {
        toast.error("Network or server error");
      }
    
  }
  finally{
    setLoading(false)
  }
  }

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
            value={FriendId}
            onChange={(e)=>setFriendId(e.target.value)}
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
            onClick={handleAddFriend}
            disabled={Loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-sm text-sm transition-all"
            >
              {Loading? "Adding" : "Add"}
            </button>
          </div>
        </div>
      )}
                    {
                        Message && (
                            <p className='text-xs mt-2 text-gray-700 text-center'>
                                {Message}
                            </p>
                        )
                    }
                  </div>
      
             
      
    </div>
  )
}

export default AddFriend
