import Signup from './pages/Signup.jsx'
import Login from './pages/login.jsx'
import './App.css'
import {Route,Routes} from 'react-router-dom'
function App() {


  return (
    <>
      <div >
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
