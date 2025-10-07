import React, { Children, useContext } from 'react'
import { io } from "socket.io-client";

const SocketContext = ({Children}) => {

  const SocketContext = useContext()
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
    <div>
      <SocketContext.Provider value={Socket} >
        {Children}
      </SocketContext.Provider>
    </div>
  )
}

export default SocketContext
