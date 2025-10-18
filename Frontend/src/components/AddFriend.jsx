
import api from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { toast, Toaster } from "react-hot-toast";

const AddFriend = ({ UserId }) => {
  const [AddFriendOpen, setAddFriendOpen] = useState(false);
  const [FriendId, setFriendId] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Message, setMessage] = useState("");

  useEffect(() => {
    if (Message) {
      const timer = setTimeout(() => toast.success(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [Message]);

  const handleAddFriend = async () => {
    if (!FriendId.trim()) {
      toast.error("Enter Zoroa Id");
      return;
    }

    if (!UserId) {
      toast.error("User not found");
      return;
    }

    try {
      setLoading(true);
      const addFriendURL = import.meta.env.VITE_ADDFRIEND_URL;
      const res = await api.post(
        `${addFriendURL}/${UserId}`,
        { friendUniqueId: FriendId },
        { withCredentials: true }
      );
      console.log(`${addFriendURL}/${UserId}`);
      toast.success(res.data.Message || "Friend added successfully");
      setFriendId("");
      setAddFriendOpen(false);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setAddFriendOpen((prev) => !prev);
          }}
          className="absolute right-28 top-4 text-3xl text-white hover:text-gray-200 transition-all duration-200 hover:scale-110"
        >
          <IoPersonAddSharp />
        </button>

        {AddFriendOpen && (
          <div className="absolute right-32 top-16 w-72 bg-white border border-gray-100 rounded-2xl shadow-2xl p-5 z-50 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Add Friend
              </h3>

              <button
                onClick={() => setAddFriendOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-lg mb-4">
              <p className="text-xs text-blue-700 flex items-center gap-2">
                <span></span>
                <span>Refresh page after adding a friend</span>
              </p>
            </div>

            <input
              type="text"
              value={FriendId}
              onChange={(e) => setFriendId(e.target.value)}
              placeholder="Enter Zoroa ID"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm mb-4 transition-all"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setAddFriendOpen(false)}
                className="flex-1 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 font-medium transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleAddFriend}
                disabled={Loading}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 shadow-lg font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {Loading ? "Adding..." : "Add Friend"}
              </button>
            </div>
          </div>
        )}
        {Message && <p className="text-xs mt-2 text-gray-700 text-center">{Message}</p>}
      </div>
    </div>
  );
};

export default AddFriend;
