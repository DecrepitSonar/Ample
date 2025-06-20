import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AudioItemPropType, UserAviPropType, VideoItemPropType } from '../../../utils/ObjectTypes'
import { useSelector } from 'react-redux'

import AudioItem from '../../../Components/AudioItem'
import VideoItem from '../../../Components/VideoItem'
import httpclient from '../../../httpclient'
import { RootState, useAppDispatch } from '../../../utils/store'
import { BiChevronLeft, BiListUl } from 'react-icons/bi'
import { setLibraryItems } from '../../../utils/librarySlice'
import UserAvi from '../../../Components/UserAvi'
import { BsArrowUp } from 'react-icons/bs'

function UserProfileSavedVideos(props: {id: String}){
  return (
    <div className="page_body">
      <div className="section_header">
      <h3 onClick={() => props.setNavState('/')}><i><BiChevronLeft/></i> Home</h3>
      <button><i><BiListUl/></i></button>
      </div>
      <h2>Saved Videos</h2>
    </div>
  )}
  
function UserProfileSavedAudio(props: {setNavState: Function}){ 
  
  const savedTracks = useSelector( ( state: RootState) => state.audioPlayer.savedTracks) 

  return (
    <div className="page_body">
      <div className="section_header">
        <h3><i onClick={() => props.setNavState('/')}><BiChevronLeft/></i> Home</h3>
      </div>
      <h2>Saved Audio</h2>
    .
    </div>
  )}
function UserProfileFollowing(props: {id: string, setNavState: string}){

  const [ following, setFollowing ] = useState<[UserAviPropType]>()

  return( 
    <div className="page_body">
      <div className="section_header">
        <h3 onClick={() => props.setNavState('/')} ><i><BiChevronLeft/></i> Home</h3>
      </div>
      <h2>Following</h2>
      {
        following?.length > 0 && following != undefined ? <></> : <> You are not following anyone yet</>
      }

    </div>
  )}
function UserProfileWatchHistory(props: {id: string, setNavState: Function}){
  
  const [videos, setVideos ] = useState<[VideoItemPropType]>([])

  useEffect(() => {
    httpclient.get(`http://127.0.0.1:5000/history?id=${id}&&filter=video`)
    .then( response => setVideos( response.data ))
  },[])

  return(
    <div className="page_body">
      <div className="section_header">
        <h3><i onClick={() => props.setNavState('/')}><BiChevronLeft/></i> Home</h3>
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
function UserProfileAudioHistory(props: {id: string, setNavState: Function}){

  const [tracks, setTracks ] = useState<[AudioItemPropType]>()

  useEffect(() => {
    httpclient.get(`http://127.0.0.1:5000/history?filter=audio`)
    .then( response => setTracks( response.data ))
  },[])
  return(
    <div className="page_body">
      <div className="section_header">
        <h3 onClick={() => props.setNavState('/')}><i><BiChevronLeft/></i> Home</h3>
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
function UserProfile(props: {navState: String, setNavState: Function}) {

    const userState = useSelector( ( state: RootState) => state)
    
    const [libItems, setLibItems] = useState([])
    
    const library = useSelector((state: RootState) => state.library)
    const user = useSelector( ( state: RootState) => state.auth.user)

    useEffect(() => {
      console.log( user )
    })
  return(
    <>
        <header className='profile_header' style={{'backgroundImage': `url(${user.headerimage})`}}>
            <div className="profile_header_overlay">
              <div className='user_profile_header_detail_container'>
                  <img className='profile_avi' src={user.profileimage}/>
                  <div className='user_profile_header_detail'>
                      <span className='label_username'>{user.username}</span>
                      <div className='follower_count_container'> 
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
              <li onClick={() => props.setNavState('All')} >All</li>
              <li onClick={() => props.setNavState('Tracks')}>Tracks</li>
              <li onClick={() => props.setNavState('Albums')}>Albums</li >
              <li onClick={() => props.setNavState('Videos')}>Videos</li>
              <li onClick={() => props.setNavState('Subscriptions')}>Subscribtions</li>
            </ul>
          </div>
          <h1 className="page_body_heading">{props.navState}</h1>
          <div className="page_body_content">
            {
              {
                'All': library.library.length > 0 ? library.library.map( item => item.type == 'Artist' ? <UserAvi username={item.name} {...item}/> : <AudioItem {...item}/> )
                : <span className='empty_description'>You have nothing saved in your library</span>,
                'Tracks': library.Tracks.length > 0 ? library.Tracks.map( item => <AudioItem {...item}/> ) 
                : <span className='empty_description'>You have no Saved Tracks</span>,
                'Albums': library.Albums.length > 0 ? library.Albums.map( item => <AudioItem {...item}/> )
                : <span className='empty_description'>You have Saved Albums</span>,
                'Videos': library.Videos.length > 0 ?library.Videos.map( item =>  <VideoItem {...item}/> )
                : <span className='empty_description'>You have Saved Videos</span>,
                'Subscriptions': library.Subscriptions.length > 0 ? 
                  library.Subscriptions.map( item =>  <UserAvi username={item.name} {...item}/> )
                : <span className='empty_description'>You are not subscribed to anyone</span>
              }[props.navState]
            }
          </div>
        </div>
      </>
  )}

export default function ProfileHome() {

    const params = useParams()
    const dispatch = useAppDispatch()
    
    const [ navState, setNavState ] = useState("All")

    useEffect(() => {
        if( params.id) {
            httpclient.get(`http://127.0.0.1:5000/library?filter`)
            .then( response => {
              dispatch(setLibraryItems(response.data))
            })
        }
    },[])

  return (
    <div className='page_container'>
        <UserProfile navState={navState} setNavState={setNavState}/>
    </div>
  )
}
