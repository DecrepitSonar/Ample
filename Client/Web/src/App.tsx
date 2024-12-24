
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";

import SignUpForm from './Pages/Auth/SignUpForm'
import LoginForm from './Pages/Auth/LoginForm'
import PasswordReset from './Pages/Auth/PasswordReset'
import Home from './Pages/Main/Home'
import Profile from './Pages/Main/Profile'

import Wrapper from './Pages/Main/Wrapper'
import Watch from "./Pages/Main/Watch";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, setUser, validate } from "./utils/Authslice";
import { useAppDispatch } from "./utils/store";
import axios from "axios";
import SignUpEditForm from "./Pages/Auth/SignUpEditForm";
import Browse from "./Pages/Main/Browse";
import Listen from "./Pages/Main/Listen";
import PlaylistDetail from "./Pages/Main/PlaylistDetail";
import VideoPlayerPage from "./Pages/Main/videoPlayerPage";
import DashboardWrapper from "./Pages/Dashboard/DashboardWrapper";
import CreatorProfile from './Pages/Main/CreatorProfile'


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

      const user = window.localStorage.getItem('user')
      if( user != undefined ) {
          await dispatch(setUser(user))
      }  

      try{
        console.log( 'validating user ')
        await dispatch(validate())
        .then( response => {
          console.log( response.data.error)
          // if( response.data.error){
          //   throw response.data.error
          // }
        })
        // .catch( error => {
        //   console.log( error )
        // })
        // .finally(() => {
        //   setUser(Response.data)
        // })
      }
      catch( err ){
        // console.log( err )
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
          <Route path='/user/:id' element={<CreatorProfile/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
          <Route path='/video/:videoId' element={<VideoPlayerPage/>}/>
          <Route path='/playlist/:id' element={<PlaylistDetail/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
