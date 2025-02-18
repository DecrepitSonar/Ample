import React, { useEffect, useState } from 'react'
import { Link, Navigate, replace, useLocation, useNavigate, useNavigation, useParams } from 'react-router-dom'
import { activeNavButtonStyle, inActiveButtonStyle } from '../../utils/computedSyles'
import axios from 'axios'
import { AudioItemPropType, userAuthType, UserAviPropType, VideoItemPropType } from '../../utils/ObjectTypes'
import { useSelector } from 'react-redux'

import AudioItem from '../../Components/AudioItem'
import VideoItem from '../../Components/VideoItem'
import httpclient from '../../httpclient'
import { RootState } from '../../utils/store'
import { Dispatch } from '@reduxjs/toolkit'
import { BiChevronLeft, BiChevronRight, BiListUl } from 'react-icons/bi'

type ProfileDataType = {
  head: userAuthType, 
  watchHistory: [VideoItemPropType],
  audioHistory: [AudioItemPropType],
  savedAudio: [AudioItemPropType],
}

const  UserProfileHome = ({props, setNavState }) => {

  const library = useSelector((state: RootState) => state.audioPlayer)

  return(
    <>
        <header className='profile_header' style={{'backgroundImage': `url(${props.head.headerPosterURL})`}}>
            <div className="profile_header_overlay">
              <div className='user_profile_header_detail_container'>
                  <div className='profile_avi' style={{'backgroundImage': `url(${props.head.imageURL})`}}/>
                  <div className='user_profile_header_detail'>
                      <span className='label_username'>{props.head.username}</span>
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
          {
            props.watchHistory.length > 0 ? 
            <section>
              <div className="section_header">
                <h3 className="section_subheading">Watch again</h3>
                <h2 onClick={() => setNavState('Watch_history')} >See all<i><BiChevronRight/></i> </h2>
              </div>
                <div className="profile_section_item_container">
                    {
                        props.watchHistory.map( video => {
                            return <VideoItem key={video.id} {...video}/>
                        })
                    }
                </div>
            </section> : <></>
          }

        {
          props.watchHistory.length > 0 ? 
            <section>
              <div className="section_header">
                <h3 className="section_subheading">Recent Plays</h3>
                <h2 onClick={() => setNavState('audio_history')} >See all<i><BiChevronRight/></i> </h2>
              </div>
              <div className="profile_section_item_container">
              {
                  props.audioHistory.map( item => {
                      return <AudioItem key={item.id} {...item}/>
                  })
                  
              }
              </div>
          </section> 
          :<></>
        }

        {
          library.savedTracks.length > 0 ? 
            <section>
              <div className="section_header">
                <h3 className="section_subheading">Saved</h3>
                <h2 onClick={() => setNavState('saved_audio')} >See all<i><BiChevronRight/></i> </h2>
              </div>
              <div className="profile_section_item_container">
              {
                  library.savedTracks.map( item => {
                      return <AudioItem key={item.id} {...item}/>
                  })
                  
              }
              </div>
            </section> 
          :<></>
        }
        {
          props.savedAudio.length > 0 ? 
            <section>
              <div className="section_header">
                <h3 className="section_subheading">Saved Videos</h3>
                <h2 onClick={() => setNavState('saved_videos')} >See all<i><BiChevronRight/></i> </h2>
              </div>
              <div className="profile_section_item_container">
              </div>
            </section> 
          :<></>
        }

        <section>
          <div className="section_header">
            <h3 className="section_subheading">Following</h3>
            <span onClick={() => setNavState('following')}>See all</span>
          </div>
        </section>
        </div>
      </>
  )
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
function UserProfileSavedAudio({id, setNavState}){ 
  return (
    <div className="page_body">
      <div className="section_header">
        <h3><i onClick={() => setNavState('/')}><BiChevronLeft/></i> Home</h3>
      </div>
      <h2>Saved Audio</h2>
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
    const auth = useSelector( ( state: RootState) => state.auth)
    const [ navState, setNavState ] = useState("/")
    
    
    return (
      <>
      {
        {
          'saved_videos': <UserProfileSavedVideos id={auth.user.id}/>,
          'saved_audio': <UserProfileSavedAudio id={auth.user.id} setNavState={setNavState}/>,
          'audio_history': <UserProfileAudioHistory id={auth.user.id} setNavState={setNavState}/>,
          'Watch_history': <UserProfileWatchHistory id={auth.user.id} setNavState={setNavState}/>,
          'following': <UserProfileFollowing id={auth.user.id} setNavState={setNavState} />
        }[navState] || <UserProfileHome  props={props}  setNavState={setNavState}/>
      }
      </>
    )
  }

export default function ProfileHome(props: {id: string}) {

    const [ profileData, setProfileData ] = useState<ProfileDataType>()

    const params = useParams()

    useEffect(() => {
        if( params.id) {
            httpclient.get(`http://127.0.0.1:5000/user-profile?id=${params.id}`)
            .then( response => {
            setProfileData(response.data)
            })
        }
    },[])

  return (
    <div className='page_container'>
        {profileData ?  <UserProfile {...profileData}/> : <>User Not Found </> }
    </div>
  )
}
