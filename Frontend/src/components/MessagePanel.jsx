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

  const handleSend = async () => {
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
      console.log("Error sending message", error);
    }
  };

  const participant = conversation?.participants.find((p) => p._id !== User.id);

  return (
    <div className="flex flex-col h-screen w-full pt-[70px]">

      <div className="sticky top-[70px] z-40 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
        <div className="p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl shadow-md">
            {participant?.name?.charAt(0).toUpperCase() || "?"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {participant?.name || "Unknown"}
            </h2>
            
          </div>
        </div>
      </div>

 
      <div
        className={`flex flex-col flex-1 p-6 overflow-y-auto ${
          Theme ? "bg-gray-900" : "bg-gradient-to-b from-gray-50 to-white"
        }`}
      >
        {Messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="text-6xl">👋</div>
            <div>
              <h3 className={`text-xl font-semibold ${Theme ? "text-white" : "text-gray-700"}`}>
                Start the conversation
              </h3>
              <p className={`text-sm ${Theme ? "text-gray-400" : "text-gray-500"}`}>
                Send a message to get started
              </p>
            </div>
          </div>
        ) : (
          Messages.map((msg, index) => {
            const isSender =
              msg.sender?._id?.toString() === User.id.toString() ||
              msg.sender?.toString() === User.id.toString();
            return (
              <div
                key={msg._id || index}
                className={`flex mb-3 ${isSender ? "justify-end" : "justify-start"} animate-fadeIn`}
              >
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-2xl break-words text-sm shadow-lg transition-all hover:shadow-xl ${
                    isSender
                      ? "bg-gradient-to-r from-green-600 to-green-700 text-white rounded-br-sm"
                      : Theme
                      ? "bg-gray-800 text-white rounded-bl-sm"
                      : "bg-white text-gray-800 rounded-bl-sm border border-gray-200"
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <p className={`text-xs mt-1 ${isSender ? "text-purple-100" : Theme ? "text-gray-400" : "text-gray-500"}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}

        <div ref={messagesEndRef} />
      </div>

  
      <div className="p-4 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={Message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter" && Message.trim() !== "") {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!Message.trim()}
            className="px-6 py-3 bg-gradient-to-r from-green-700 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-700 shadow-lg font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;