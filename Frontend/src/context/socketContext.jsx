import React, {  useContext ,useState,useEffect, createContext, } from 'react'
import { io } from "socket.io-client";


  const SocketContext = createContext(null)

export const SocketProvider= ({children}) => {



  const [Socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:7000",{
      transports:["websocket"]
    })
    setSocket(newSocket)

    return()=>{
      newSocket.disconnect()
    }
  }, []);


  return (
   
      <SocketContext.Provider value={Socket} >
        {children}
      </SocketContext.Provider>
    
  )
}

export const useSocket=()=>useContext(SocketContext)
