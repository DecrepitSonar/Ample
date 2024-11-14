
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";

import SignUpForm from './Pages/Auth/SignUpForm'
import LoginForm from './Pages/Auth/LoginForm'
import PasswordReset from './Pages/Auth/PasswordReset'
import Home from './Pages/Main/Home'
import Settings from './Pages/Main/Settings'

import Wrapper from './Pages/Main/Wrapper'
import Profile from "./Pages/Main/Profile";
import Watch from "./Pages/Main/Watch";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, validate } from "./utils/Authslice";
import { useAppDispatch } from "./utils/store";
import axios from "axios";
import SignUpEditForm from "./Pages/Auth/SignUpEditForm";
import Browse from "./Pages/Browse";
import Listen from "./Pages/Main/Listen";
import PlaylistDetail from "./Pages/Main/PlaylistDetail";
import VideoPlayerPage from "./videoPlayerPage";
import DashboardWrapper from "./Pages/Dashboard/DashboardWrapper";


function Dash(){
  return (
    <>
    <h1>Home</h1></>
  )
}


function App() {
  const dispatch = useAppDispatch()

  useEffect( () => {
    ( async () => {
      try{
        await dispatch(validate())
        .then( response => {
          console.log( response )
        })
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
          <Route path='/profile/:id' element={<Profile/>}/>
          <Route path='/settings/:id' element={<Settings/>}/>
          <Route path='/video/:videoId' element={<VideoPlayerPage/>}/>
          <Route path='/playlist/:id' element={<PlaylistDetail/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
