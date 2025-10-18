import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

const ChatList = ({ selectedConv, setSelectedConv, Theme }) => {
  const { User } = useContext(AuthContext);
  const [allConversation, setAllConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!User?.id) return;

    const fetchConversation = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/findAll/${User.id}`);

        const conversations = res.data.map((conv, index) => ({
          ...conv,
          uniqueKey: conv._id,
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
    <div className="w-80 h-screen bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-purple-600 to-indigo-600 border-b border-purple-700">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <span>💬</span>
          <span>Chats</span>
        </h1>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-8 space-y-3">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm">Loading conversations...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <div className="text-5xl mb-3">😕</div>
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        ) : allConversation.length > 0 ? (
          <div className="py-2">
            {allConversation.map((conv) => {
              const participant = conv.participants.find((p) => p._id !== User.id);
              const isSelected = selectedConv?.uniqueKey === conv.uniqueKey;
              
              return (
                <div
                  key={conv.uniqueKey}
                  onClick={() => {
                    setSelectedConv(conv);
                  }}
                  className={`mx-2 my-1 p-4 cursor-pointer rounded-xl transition-all duration-200 flex items-center gap-3 group ${
                    isSelected
                      ? "bg-gradient-to-r from-purple-100 to-indigo-100 shadow-md border-l-4 border-purple-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md ${
                    isSelected 
                      ? "bg-gradient-to-br from-purple-600 to-indigo-600"
                      : "bg-gradient-to-br from-gray-400 to-gray-500 group-hover:from-purple-500 group-hover:to-indigo-500"
                  }`}>
                    {participant?.name?.charAt(0).toUpperCase() || "?"}
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-base truncate ${
                      isSelected ? "text-purple-900" : "text-gray-800"
                    }`}>
                      {participant?.name || "Unknown"}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      Click to chat
                    </p>
                  </div>

                  {/* Indicator */}
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="text-7xl">💭</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No Chats Yet</h3>
              <p className="text-sm text-gray-500">Add friends to start chatting!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
