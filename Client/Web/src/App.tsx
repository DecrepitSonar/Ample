import React, { Children } from 'react'
import "./styles/App.css";
import { Navigate, Route, Routes } from "react-router-dom";

// Auth/ login imports
import SignUpForm from './Pages/Auth/SignUpForm'
import LoginForm from './Pages/Auth/LoginForm'
import PasswordReset from './Pages/Auth/PasswordReset'
import Profile from './Pages/Main/Profile/Profile'

// Main imports
import Wrapper from './Pages/Main/Wrapper'
import { useEffect } from "react";
import { authState, setUser, validate } from "./utils/Authslice";
import { RootState, useAppDispatch } from "./utils/store";
import SignUpEditForm from "./Pages/Auth/SignUpEditForm";
import Browse from "./Pages/Main/Browse";
import Listen from "./Pages/Main/Listen";
import PlaylistDetail from "./Pages/Main/PlaylistDetail";
import VideoPlayerPage from "./Pages/Main/videoPlayerPage";
import CreatorProfile from './Pages/Main/CreatorProfile'
import { setSavedTracks } from "./utils/mediaPlayerSlice";
import { setLibraryItems } from "./utils/librarySlice";
import Dashboard from './Pages/Dashboard/dashboard';
import Uploads from './Pages/Dashboard/Uploads';
import Home from './Pages/Dashboard/Home'
import { userAuthType } from './utils/ObjectTypes';
import { useSelector } from 'react-redux';
import BottomMediaBar from './Components/BottomMediaBar';
import NewUploads from './Pages/Dashboard/NewUpload';

type ProtectedRoutePropsTypes = {
  user: userAuthType | null, 
  children: React.ReactNode
}
const ProtectedRoute = ({user, children} : ProtectedRoutePropsTypes ) => {

  if( !user){
    return <Navigate to={'/'}/>
  }

  return children
}

function App() {
  const dispatch = useAppDispatch()
  const user = useSelector( (state: RootState ) => state.auth.user)

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
          <Route path='/playlist/:id' element={<PlaylistDetail/>}/>
        </Route>
        <Route path='/dashboard/' element={<ProtectedRoute user={user}> <Dashboard/> </ProtectedRoute>}>
          <Route index element={<Home/>}/>
          <Route path='/dashboard/uploads' element={<Uploads/>}/>
          <Route path='/dashboard/newUpload' element={<NewUploads/>}/>
        </Route>
      </Routes>
      {/* <BottomMediaBar /> */}
    </div>
  );
}

export default App;
