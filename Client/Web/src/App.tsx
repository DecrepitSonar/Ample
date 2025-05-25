import React from 'react'
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";

// Auth/ login imports
import SignUpForm from './Pages/Auth/SignUpForm'
import LoginForm from './Pages/Auth/LoginForm'
import PasswordReset from './Pages/Auth/PasswordReset'
import Profile from './Pages/Main/Profile/Profile'

// Main imports
import Wrapper from './Pages/Main/Wrapper'
import { useEffect } from "react";
import { setUser, validate } from "./utils/Authslice";
import { useAppDispatch } from "./utils/store";
import SignUpEditForm from "./Pages/Auth/SignUpEditForm";
import Browse from "./Pages/Main/Browse";
import Listen from "./Pages/Main/Listen";
import PlaylistDetail from "./Pages/Main/PlaylistDetail";
import VideoPlayerPage from "./Pages/Main/videoPlayerPage";
import CreatorProfile from './Pages/Main/CreatorProfile'
import { setSavedTracks } from "./utils/mediaPlayerSlice";
import { setLibraryItems } from "./utils/librarySlice";

function App() {
  const dispatch = useAppDispatch()

  useEffect( () => {
    ( async () => {


      const user = JSON.parse(window.localStorage.getItem('user'))

      if( user != undefined ) {
        try{
          dispatch(setUser(user))
        }
        catch( error){
          console.log( error)
        }
          
      }  
      else{
        try{
          const response = await dispatch(validate())
          console.log( response )
        }
        catch( err ){
          console.log( err )
        }
      }

    })()
  },[])
  
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm/>} />
        <Route path="/userdetailedits/:id" element={<SignUpEditForm/>} />
        <Route path="/reset" element={<PasswordReset/>} />
        <Route path='/' element={<Wrapper/>}>
          <Route index element={<Listen/>}/>
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
