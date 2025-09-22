import Signup from "./pages/Signup.jsx";
import Login from "./pages/login.jsx";
import Chat from "./pages/Chat.jsx";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext.jsx";
function App() {
  return (
    <>
      <div>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Signup />} />
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
