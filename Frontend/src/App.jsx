import Signup from "./pages/Signup.jsx";
import Login from "./pages/login.jsx";
import ChatApp from './components/ChatApp.jsx';
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketProvider } from "./context/socketContext.jsx";
import Navbar from './components/Navbar.jsx';
import LandingPage from "./pages/LandingPage.jsx";



function App() {
  const location = useLocation()

  const showNavbar = ["/about" ,"/chat"].includes(location.pathname)
  return (
    <>
      <div>
        <AuthContextProvider>
          <SocketProvider>
           
          <Navbar/>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
        
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<ChatApp />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          </SocketProvider>
        </AuthContextProvider>
      </div>
    </>
  );
}

export default App;
