import { FaBackward, FaForward, FaHome, FaPlay, FaRegPlayCircle, FaSearch, FaTv } from "react-icons/fa";
import "./styles/App.css";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { FaRepeat, FaShuffle } from "react-icons/fa6";
import { CgMenuGridO } from "react-icons/cg";

import SignUpForm from './Pages/Auth/SignUpForm'
import LoginForm from './Pages/Auth/LoginForm'
import PasswordReset from './Pages/Auth/PasswordReset'
import Home from './Pages/Home'

import Wrapper from './Pages/Wrapper'
import Profile from "./Pages/Profile";
import Watch from "./Pages/Watch";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, authSlice, authState, validate } from "./utils/Authslice";
import httpclient from "./httpclient";

function Listen(){
  return(
    <>Listen</>
  )
}
function Browse(){
  return(
    <>Browse</>
  )
}

function Search(){
  return(
    <>Search</>
  )
}
function Video(){
  return(
    <>Video</>
  )
}
function App() {
  const dispatch = useDispatch()

  useEffect( () => {
    // ( async () => {
      // try{
        dispatch(validate())
      // }
      // catch( err ){
        // console.log( err )
      // }

    // })()
  },[])
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/reset" element={<PasswordReset/>} />
        <Route path='/' element={<Wrapper/>}>
          <Route index element={<Home/>}/>
          <Route path='/watch' element={<Watch/>}/>
          <Route path='/listen' element={<Listen/>}/>
          <Route path='/browse' element={<Browse/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/video' element={<Video/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
