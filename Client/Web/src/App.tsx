import React, { Children, useState } from 'react'
import "./styles/App.css";
import { Navigate, Route, Routes, useParams } from "react-router-dom";

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
import Nav from './Components/Nav';
import httpclient from './httpclient';
import UserUpgrade from './Pages/Main/TermsAndConditions';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

// Profile 
import ProfileHome from './Pages/Main/Profile/ProfileHome';
import AccountSettings from './Pages/Main/Profile/Settings/AccountSettings';
import SecuritySettings from './Pages/Main/Profile/Settings/SecuritySettings';
import PaymentSettings from './Pages/Main/Profile/Settings/PaymentSettings';
import NotificationSettings from './Pages/Main/Profile/Settings/Notifications';
import PrivacySettings from './Pages/Main/Profile/Settings/PrivacySettings';
import PlaylistItem from './Components/PlaylistItem';
import { BsPlusCircle } from 'react-icons/bs';
import { BiInfoCircle } from 'react-icons/bi';
import EditPlaylist from './Pages/Dashboard/EditPlaylist';



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
  const notificcations = useSelector( (state: RootState ) => state.notifications)

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
      <Nav/>
      <Routes>
        <Route index element={<Listen/>}/>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm/>} />
        <Route path="/userdetailedits/:id" element={<SignUpEditForm/>} />
        <Route path="/reset" element={<PasswordReset/>} />
        <Route path='/browse' element={<Browse/>}/>
        <Route path='/user/:id' element={<CreatorProfile/>}/>
        <Route path='/playlist/:id' element={<PlaylistDetail/>}/> 
        <Route path='/profile/:id/' element={<ProtectedRoute user={user}><Wrapper/></ProtectedRoute>}>
          <Route index element={<ProfileHome/>}/>
          <Route path='account' element={<AccountSettings/>}/>
          <Route path='security' element={<SecuritySettings/>}/>
          <Route path='billing' element={<PaymentSettings/>}/>
          <Route path='notifications' element={<NotificationSettings/>}/>
          <Route path='privacy' element={<PrivacySettings/>}/>

        </Route>
        <Route path='/dashboard/' element={<ProtectedRoute user={user}> <Dashboard/> </ProtectedRoute>}>
          <Route index element={<Home/>}/>
          <Route path='/dashboard/Uploads' element={<Uploads/>}/>
          <Route path='edit/playlist/:id' element={<EditPlaylist/>}/>
        </Route>
      </Routes>
      <div className="warning_popup"></div>
      <BottomMediaBar />
        <div className="notification_popup" style={ notificcations.isShown != false ? {'right': '20px'} : {}}>
          <i><CheckCircleIcon/></i>
          {notificcations.message}
        </div>
    </div>
  );

}

export default App;
