import React from "react";
import ChatList from "./ChatList";
import MessagePanel from "./MessagePanel";
import Navbar from "./Navbar";
import { useState , useEffect} from "react";
import { Toaster } from "react-hot-toast";
import cookie from 'js-cookie'

const ChatApp = () => {
  const [selectedConv, setSelectedConv] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [Theme, setTheme] = useState(()=>{
    const savedTheme = cookie.get("theme")
    return savedTheme === "true" 
  }); 
  

  useEffect(() => {
    cookie.set("theme", Theme?"true" : "false",{expires : 30})
  }, [Theme]);
  

 
  useEffect(() => {
    if (selectedConv && window.innerWidth < 768) {
      setShowSidebar(false);
    }
   
  }, [selectedConv]); 

  return (
    
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar Theme={Theme} setTheme={setTheme} onMenuClick={() => setShowSidebar(!showSidebar)} />

    
      <div className="flex flex-1 overflow-hidden relative">
        
       
        <div className={`
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 transition-transform duration-300 ease-in-out
          fixed md:relative z-30 h-full pt-[70px] 
          w-full md:w-80
          bg-white dark:bg-gray-800 shadow-xl md:shadow-none 
        `}>
   
          <div className={`h-full overflow-y-auto `}> 
             <ChatList 
                selectedConv={selectedConv} 
                setSelectedConv={(conv) => {
                  setSelectedConv(conv);
            
                  if (window.innerWidth < 768) setShowSidebar(false);
                }} 
                Theme={Theme} 
             />
          </div>
        </div>

   
        {showSidebar && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

       
        <div className="flex-1 overflow-hidden relative">
            {selectedConv ? (
                
                <MessagePanel 
                    conversation={selectedConv} 
                    Theme={Theme}
                    onBack={() => {
                        setSelectedConv(null);
                        setShowSidebar(true); 
                    }}
                />
            ) : (
               
                <div className={`flex flex-1 flex-col items-center justify-center h-full ${Theme? "bg-gray-800" : "bg-white"} `}>
                    <div className="text-center space-y-6 p-8">
                        <div className="text-8xl animate-pulse text-purple-500">💬</div>
                        <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                                Select a Chat
                            </h2>
                            <p className="text-gray-500 dark:text-gray-300 text-lg">
                                Choose a conversation to start messaging
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
      </div>
      <Toaster />
    </div>
  );
};

export default ChatApp;