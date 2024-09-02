
import "./styles/App.css";
import {  Outlet, Route, Routes } from "react-router-dom";

import SignUpForm from './Pages/Auth/SignUpForm'
import LoginForm from './Pages/Auth/LoginForm'
import PasswordReset from './Pages/Auth/PasswordReset'
import Home from './Pages/Home'

import Wrapper from './Pages/Wrapper'
import Profile from "./Pages/Profile";
import Watch from "./Pages/Watch";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { validate } from "./utils/Authslice";
import { useAppDispatch } from "./utils/store";
import axios from "axios";
import SignUpEditForm from "./Pages/Auth/SignUpEditForm";


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
function AuthWrapper() {
  return (
    <>Outlet</>
  )
}

function App() {
  const dispatch = useAppDispatch()

  useEffect( () => {
    ( async () => {
      try{
        dispatch(validate())
      }
      catch( err ){
        console.log( err )
      }

    })()
  },[])
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm/>} />
        <Route path="/userdetailedits" element={<SignUpEditForm/>} />
        <Route path="/reset" element={<PasswordReset/>} />
        <Route path='/' element={<Wrapper/>}>
          <Route index element={<Home/>}/>
          <Route path='/watch' element={<Watch/>}/>
          <Route path='/listen' element={<Listen/>}/>
          <Route path='/browse' element={<Browse/>}/>
          <Route path='/profile/:id' 

            element={<Profile/>}
          />
          <Route path='/search' element={<Search/>}/>
          <Route path='/video' element={<Video/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
