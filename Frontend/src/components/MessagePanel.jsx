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

    socket.emit("joinRoom", conversation._id);

    const handleReceive = (data) => {
      if (data.conversationId.toString() === conversation._id.toString()) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [socket, conversation]);

  const handleSend = () => {
    if (!Message.trim() || !socket) return;

    const newMessage = {
      conversationId: conversation._id,
      sender: User.id,
      text: Message,
      createdAt: new Date(),
    };


    // setMessages((prev) => [...prev, newMessage]);
    socket.emit("sendMessage", newMessage);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen w-full pt-[80px]">
      <div className="sticky top-[80px] z-40 pb-2 pl-2 border-b bg-white font-semibold text-2xl">
        {conversation?.participants.find((p) => p._id !== User.id)?.name ||
          "Unknown"}
      </div>

      <div
        className={`flex-1 overflow-y-auto p-4 ${
          Theme ? "bg-black text-white" : "bg-gray-50 text-black"
        }`}
      >
        {Messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 w-max p-2 rounded ${
              msg.sender.toString() === User.id.toString()
                ? "bg-gray-300"
                : "ml-auto bg-blue-500 text-white"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t bg-white flex">
        <input
          type="text"
          value={Message}
          onChange={(e) => setMessage(e.target.value)}
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
