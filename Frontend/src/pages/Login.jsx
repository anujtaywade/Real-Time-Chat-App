import React, { useContext,useState } from 'react'
import { AuthContext } from "../context/AuthContext";
import { useNavigate ,Link} from 'react-router-dom';
import api from '../api/axios'

const Login = () => {
  const {login} = useContext(AuthContext)
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');
  const navigate = useNavigate()
  

  const handleLogin =async (e)=>{
    e.preventDefault();
    try {
      const res= await api.post("/auth/login",{email,password})
      login(res.data)
      navigate("/chat")
    } catch (error) {
      seterror(error.response?.data?.error ||
      error.response?.data?.message ||
      "something went wrong"
      )
    }
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#386641] to-[#89B153]">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
        <h2 className="text-3xl font-bold text-black text-center mb-2">
          Welcome Back!
        </h2>
        <h1 className="text-lg text-gray-600 text-center mb-4">
          Login to <span className='font-bold'>Zoroa</span>
        </h1>
        

         <div className='text-s flex items-center justify-center text-red-500'>
        {error}
      </div>

       

        <form onSubmit={handleLogin} className="space-y-4">
        

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e)=>setemail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3C7A89]"
            />
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setpassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#3C7A89]"
            />
          </div>

          <p>
           Don’t have an account?  <Link to="/signup" className='text-[#A7C957] underline'>signup</Link>

          </p>

          <button
            type="submit"
            className="w-full bg-[#6A994E] text-white py-2 rounded-lg hover:bg-[#386641] transition"
          >
            Login
          </button>
         
        </form>
      </div>
      <img className='size-64 absolute bottom-[69%]  ' 
          src="\gojo.png" alt="" />
    </div>
  )
}

export default Login
