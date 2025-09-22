import Signup from "./pages/Signup.jsx";
import Login from "./pages/login.jsx";
import Chat from "./pages/Chat.jsx";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext.jsx";
import Navbar from './components/Navbar.jsx';
import LandingPage from "./pages/LandingPage.jsx";
function App() {
  return (
    <>
      <div>
        <AuthContextProvider>
          <Navbar/>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>

            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </AuthContextProvider>
      </div>
    </>
  );
}

export default App;
