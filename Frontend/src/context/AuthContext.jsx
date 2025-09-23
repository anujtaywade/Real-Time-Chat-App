import React from 'react'
import { createContext , useState  } from "react";
import {jwtDecode} from 'jwt-decode';

export const AuthContext=createContext()

export const AuthContextProvider = ({children}) => {
    const [User, setUser] = useState(()=>{
        const token = localStorage.getItem("token")
        return token? {token,...jwtDecode(token)} : null
        
    })

    const login = (data)=>{
        localStorage.setItem("token",data.token)
        setUser({token:data.token})
    }

    const logout=()=>{
        localStorage.removeItem("token")
        setUser(null)
    }

  return (
  
        <AuthContext.Provider value={{User,login,logout}}>
            {children}
        </AuthContext.Provider>
   
  )
}


