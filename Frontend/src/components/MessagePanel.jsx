import React, { useContext } from 'react'
import { AuthContext } from "../context/AuthContext";
import { useSocket } from "../context/socketContext";


const Message = ({ conversation , Theme, setTheme}) => {

  const socket = useSocket()
  const { User } = useContext(AuthContext)

  const [Messages, setMessages] = useState([]);
  const [Message, setMessage] = useState("");

  useEffect(() => {
    if (!socket) return;

    if(conversation?._id){
      socket.emit("join room",conversation?._id)
    }

    socket.on("recieve message",(data)=>{
      if(data.conversationId === conversation?._id){
        setMessages((prev)=>[...prev,data])
      }
    })

    return()=>{
    socket.off("recieve message")
  }
  }, [socket,conversation]);

  const handleSend=()=>{
    if(!Message.trim || !socket) return;

    const newMesage = {
      conversation: conversation._id,
      sender : User.id,
      text : Message,
      createdAt : new Date()
    }

    socket.emit("send message",newMesage)
    setMessage((prev)=>[...prev,newMesage])
    setMessage("")
  }


  

  return (
    <div className="flex flex-col h-screen w-full pt-[80px]">
   
      <div className="sticky top-[80px] z-40 pb-2 pl-2 border-b bg-white font-semibold text-2xl">
        {conversation?.participants.find((p) => p._id !== User.id)?.name || "Unknown"}
      </div>

  
      <div className={`flex-1 overflow-y-auto p-4 ${Theme? "bg-black" : "bg-gray-50"} `}>


        <div className=""></div>
        <div className=""></div>

        {Message.map((msg,index)=>(
          <div key={index} 
          className={`mb-2 w-max p-2 rounded ${msg.sender=== User.id ? "mb-2  w-max p-2 rounded ml-auto bg-blue-500" : "bg-gray-300"}`}>
              {msg.text}
          </div>


        ))}
      </div>

    
      <div className="p-3 border-t bg-white flex">
        <input
          type="text"
          name="message"
          value={Message}
          onChange={(e)=>setMessage(e.target.value)}
          placeholder="Start typing..."
          className="flex-1 h-12 px-4 border rounded-lg focus:outline-none"
        />
        <button
        onClick={handleSend}
        className="ml-2 px-4 bg-blue-500 text-white rounded-lg">Send</button>
      </div>
    </div>
  )
}

export default Message
