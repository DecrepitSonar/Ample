import React, { useEffect, useState } from 'react'
import { Link, Navigate, replace, useLocation, useNavigate, useNavigation, useParams } from 'react-router-dom'
import { activeNavButtonStyle, inActiveButtonStyle } from '../../utils/computedSyles'
import axios from 'axios'
import { AudioItemPropType, userAuthType, UserAviPropType, VideoItemPropType } from '../../utils/ObjectTypes'
import { useSelector } from 'react-redux'

import AudioItem from '../../Components/AudioItem'
import VideoItem from '../../Components/VideoItem'
import httpclient from '../../httpclient'
import { RootState, useAppDispatch } from '../../utils/store'
import { Dispatch } from '@reduxjs/toolkit'
import { BiChevronLeft, BiChevronRight, BiListUl } from 'react-icons/bi'
import { setLibraryItems } from '../../utils/librarySlice'
import UserAvi from '../../Components/UserAvi'

type ProfileDataType = {
  head: userAuthType, 
  library: []
}  
function UserProfileSavedVideos(props: {id: String}){
  return (
    <div className="page_body">
      <div className="section_header">
      <h3 onClick={() => setNavState('/')}><i><BiChevronLeft/></i> Home</h3>
      <button><i><BiListUl/></i></button>
      </div>
      <h2>Saved Videos</h2>
    </div>
  )}
function UserProfileSavedAudio({state, setNavState}){ 
  
  const savedTracks = useSelector( ( state: RootState) => state.audioPlayer.savedTracks) 

  return (
    <div className="page_body">
      <div className="section_header">
        <h3><i onClick={() => setNavState('/')}><BiChevronLeft/></i> Home</h3>
      </div>
      <h2>Saved Audio</h2>
    .
    </div>
  )}
function UserProfileFollowing({id, setNavState}){

  const [ following, setFollowing ] = useState<[UserAviPropType]>()

  return( 
    <div className="page_body">
      <div className="section_header">
        <h3 onClick={() => setNavState('/')} ><i><BiChevronLeft/></i> Home</h3>
      </div>
      <h2>Following</h2>
      {
        following?.length > 0 && following != undefined ? <></> : <> You are not following anyone yet</>
      }

    </div>
  )}
function UserProfileWatchHistory({id, setNavState}){
  
  const [videos, setVideos ] = useState<[VideoItemPropType]>([])

  useEffect(() => {
    httpclient.get(`http://127.0.0.1:5000/history?id=${id}&&filter=video`)
    .then( response => setVideos( response.data ))
  },[])

  return(
    <div className="page_body">
      <div className="section_header">
        <h3><i onClick={() => setNavState('/')}><BiChevronLeft/></i> Home</h3>
      </div>
      <h2>Watch History</h2>
      
      <div className='page_body_collection'>
        {
          videos?.length > 0 && videos != undefined ? 
          videos!.map( item => {
            console.log( item )
            return <VideoItem key={item.id} {...item }/>
          })
          
          : <> No Recent videos </>
        }
      </div>

    </div>  
  )}
function UserProfileAudioHistory({id, setNavState}){

  const [tracks, setTracks ] = useState<[AudioItemPropType]>()

  useEffect(() => {
    httpclient.get(`http://127.0.0.1:5000/history?filter=audio`)
    .then( response => setTracks( response.data ))
  },[])
  return(
    <div className="page_body">
      <div className="section_header">
        <h3 onClick={() => setNavState('/')}><i><BiChevronLeft/></i> Home</h3>
      </div>
      <h2>Audio history</h2>
      <div className='page_body_collection'>

        {
          tracks?.length > 0 && tracks != undefined ? 
          tracks.map( item => {
            return <AudioItem {...item}/>
          }) : <> No Recent play history </>
        }

      </div>
    </div>
  )}

function UserProfile(props: ProfileDataType) {

    const head = props.head
    const userState = useSelector( ( state: RootState) => state)

    const [ navState, setNavState ] = useState("All")
    
    const library = useSelector((state: RootState) => state.library.library)

  return(
    <>
        <header className='profile_header' style={{'backgroundImage': `url(${props.headerPosterURL})`}}>
            <div className="profile_header_overlay">
              <div className='user_profile_header_detail_container'>
                  <div className='profile_avi' style={{'backgroundImage': `url(${props.imageURL})`}}/>
                  <div className='user_profile_header_detail'>
                      <span className='label_username'>{props.username}</span>
                      <div className='follower_count_container'> 
                          <span>Following 2342 </span>
                          <span>Followers 2342</span>
                      </div>
                      {/* { auth.user.id != props.id ?  */}
                      {/* <button className='follow_button'>Follow</button>  */}
                      {/* // <button className='following_button'>Following</button> */}
                      {/* } */}
                  </div>
              </div>    
            </div>
        </header>
        <div className="page_body">
          <div className="profile_content_filter">
            <ul>
              <li onClick={() => setNavState('All')} >All</li>
              <li onClick={() => setNavState('Tracks')}>Tracks</li>
              <li onClick={() => setNavState('Albums')}>Albums</li >
              <li onClick={() => setNavState('Videos')}>Videos</li>
              <li onClick={() => setNavState('Subscribtions')}>Following</li>
            </ul>
          </div>
          <h1 className="page_body_heading">{navState}</h1>
          <div className="page_body_content">
            {
                library.map( item => {
                  {
                  return item.isVerified != undefined ? <UserAvi username={item.name} {...item}/> : <AudioItem {...item}/>}
                })
            }
          </div>
        </div>
      </>
  )}

export default function ProfileHome(props: {id: string}) {

    const [ profileData, setProfileData ] = useState<ProfileDataType>()

    const params = useParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if( params.id) {
            httpclient.get(`http://127.0.0.1:5000/user-profile?id=${params.id}`)
            .then( response => {
              dispatch(setLibraryItems(response.data.library))
              setProfileData(response.data.head)
            })
        }
    },[])

  return (
    <div className='page_container'>
        {profileData ?  <UserProfile {...profileData}/> : <>User Not Found </> }
    </div>
  )
}
