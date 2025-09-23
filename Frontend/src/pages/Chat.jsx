import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

const Chat = () => {
  const [error, setError] = useState("");
  const [AllConversation, setAllConversation] = useState([]);
  const { User } = useContext(AuthContext);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const res = await api.get(`/findAll/${User._id}`);
        setAllConversation(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };
    if (User._id) fetchConversation();
  }, [User]);
  return (
    <div className=" min-h-screen p-6 bg-gray-50">
      <div>{User?.name || "Username"}</div>
      <div>
        <h1 className="text-3xl py-4 px-12 ">Chats</h1>
        <div>{error && <p className="text-xl text-red-500 ">{error}</p>}</div>

        <div>
          {AllConversation?.length > 0 ? (
            AllConversation.map((conv) => (
              <div
                key={conv._id}
                className="p-4 mb-2 border border-gray-200 rounded-md shadow-sm bg-white"
              >
               {conv.participants
  .filter(p => p._id !== User._id)
  .map(p => p.name)
  .join(", ")}
              </div>
            ))
          ) : (
            <p>No conversations yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
