import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useSocket } from "../context/socketContext";
import axios from "axios";


const Message = ({ conversation, Theme }) => {
  const socket = useSocket();
  const { User } = useContext(AuthContext);
  const [Messages, setMessages] = useState([]);
  const [Message, setMessage] = useState("");
  const messagesEndRef = useRef(null);


  useEffect(() => {
    if (!conversation?._id) return;

    const fetchMessage = async () => {
      try {
        const MESSAGE_URL = import.meta.env.VITE_MESSAGE_URL;
        const res = await axios.get(`${MESSAGE_URL}/${conversation._id}`);
        console.log(res.data);
        setMessages(res.data);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };
    fetchMessage();
  }, [conversation?._id]);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Messages]);

 
  useEffect(() => {
    if (!socket || !conversation?._id) return;
      console.log("Joining room:", conversation._id);

    socket.emit("joinRoom", conversation._id);

  const handleReceive = (data) => {
  console.log("Received message:", data);
  
  if (data.conversationId.toString() === conversation._id.toString()) {

    const senderId = data.sender?._id || data.sender;
    
    if (senderId?.toString() !== User.id.toString()) {
      setMessages((prev) => [...prev, data]);
    }
  }
};

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [socket, conversation]);

  const handleSend =async () => {
    if (!Message.trim() || !socket) return;

    const newMessage = {
      conversationId: conversation._id,
      senderId: User.id,
      text: Message,
      createdAt: new Date(),
    };

    try {
 
    const MESSAGE_URL = import.meta.env.VITE_MESSAGE_URL;
    const res = await axios.post(`${MESSAGE_URL}`, newMessage, {
      withCredentials: true,
    });

    const savedMessage = res.data; 

     setMessages((prev) => [...prev, savedMessage]);

      socket.emit("sendMessage", savedMessage);
      setMessage("");

       setTimeout(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 100);
    } catch (error) {
      console.log("Error sending message",error)
    }



   
    





    
    
  };

  return (
    <div className="flex flex-col h-screen w-full pt-[80px]">
      <div className="sticky top-[80px] z-40 pb-2 pl-2 border-b bg-white font-semibold text-2xl">
        {conversation?.participants.find((p) => p._id !== User.id)?.name ||
          "Unknown"}
      </div>

      <div className={`flex flex-col h-full p-4 overflow-y-auto ${Theme?"bg-black" : "bg- bg-gray-100"}`}>
  {Messages.map((msg, index) => {
   const isSender = msg.sender?._id?.toString() === User.id.toString() || 
                          msg.sender?.toString() === User.id.toString();  
    return (
      <div
        key={msg._id || index}
        className={`flex mb-2 ${isSender ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`max-w-[70%] p-3 rounded-2xl break-words text-sm shadow-sm ${
            isSender
              ? "bg-green-600 text-white rounded"
              : "bg-gray-300 text-black rounded"
          }`}
        >
          {msg.text}
        </div>
      </div>
    );
  })}

  <div ref={messagesEndRef} />
</div>

      <div className="p-3 border-t bg-white flex">
        <input
          type="text"
          value={Message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key == "Enter" && Message.trim() !== ""){
              e.preventDefault()
              handleSend()
            }
          }}
          placeholder="Start typing..."
          className="flex-1 h-12 px-4 border rounded-lg focus:outline-none"
        />
        <button
        
          onClick={handleSend}
     
          className="ml-2 px-4 bg-blue-500 text-white rounded-lg"
         
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
