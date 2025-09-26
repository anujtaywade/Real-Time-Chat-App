import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";


const ChatList = ({selectedConv, setSelectedConv}) => {
  const { User } = useContext(AuthContext);
  const [allConversation, setAllConversation] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    if (!User?.id) return;
    console.log(User.id)

    const fetchConversation = async () => {
    console.log(allConversation)
      try {
        setLoading(true);
        const res = await api.get(`/findAll/${User.id}`);
 
        const conversations = res.data.map((conv, index) => ({
          ...conv,
          uniqueKey: conv._id ,
        }));
        setAllConversation(conversations);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();
  }, [User]);

 return (
    <div className="w-80 h-screen bg-gray-50 border-r border-gray-200 flex flex-col">

      <div className="p-4 bg-white border-b border-gray-200 font-bold text-xl">
        Chats
      </div>

     


      <div className="flex-1 overflow-y-auto">
        <h1 className="text-2xl font-bold p-4 " >
          Chats
        </h1>
        {loading ? (
          <p className="p-4 text-gray-500">Loading conversations...</p>
        ) : error ? (
          <p className="p-4 text-red-500">{error}</p>
        ) : allConversation.length > 0 ? (
          allConversation.map((conv) => (
            <div
              key={conv.uniqueKey}
              onClick={() => {
                console.log(conv);
                setSelectedConv(conv)
              }}
              
              className={`p-4 text-xl cursor-pointer border-b border-gray-100 hover:bg-gray-100 rounded-r-lg ${
                selectedConv?.uniqueKey === conv.uniqueKey
                  ? "bg-gray-200 font-semibold"
                  : ""
              }`}
            > 
              
              {conv.participants.find((p) => p._id !== User.id)?.name || "Unknown"}
            </div>
        
          ))
        ) : (
          <p className="p-4 text-gray-500">No conversations yet</p>
        )}
      </div>

       

    </div>
  );
};


export default ChatList;
