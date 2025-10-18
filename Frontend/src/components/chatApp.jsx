
import React from "react";
import ChatList from "./ChatList";
import MessagePanel from "./MessagePanel";
import Navbar from "./Navbar";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

const ChatApp = () => {
  const [selectedConv, setSelectedConv] = useState(null);
  const [Theme, setTheme] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <Navbar Theme={Theme} setTheme={setTheme} />

      <div className="flex flex-1 pt-[70px]">
        <ChatList selectedConv={selectedConv} setSelectedConv={setSelectedConv} Theme={Theme} />

        <Toaster position="bottom-center" reverseOrder={false} />

        {selectedConv ? (
          <MessagePanel conversation={selectedConv} Theme={Theme} setTheme={setTheme} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white">
            <div className="text-center space-y-6 p-8">
              <div className="text-8xl animate-bounce">💬</div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#386641] to-[#89B153] bg-clip-text text-transparent mb-3">
                  Select a Chat
                </h2>
                <p className="text-gray-500 text-lg">
                  Choose a conversation to start messaging
                </p>
              </div>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
