import React, { useEffect, useState } from 'react'
import { Link, Navigate, replace, useNavigate, useParams } from 'react-router-dom'
import { activeNavButtonStyle, inActiveButtonStyle } from '../../utils/computedSyles'
import axios from 'axios'
import { AudioItemPropType, userAuthType, VideoItemPropType } from '../../utils/ObjectTypes'
import { useSelector } from 'react-redux'

import AudioItem from '../../Components/AudioItem'
import VideoItem from '../../Components/VideoItem'
import httpclient from '../../httpclient'
import { RootState } from '../../utils/store'

type ProfileDataType = {
  head: userAuthType, 
  watchHistory: [VideoItemPropType],
  audioHistory: [AudioItemPropType]
}
function UserProfile(props: ProfileDataType) {

    const head = props.head
    const auth = useSelector( ( state: RootState) => state.auth)
    const [ navState, setNavState ] = useState("Home")

    const navigate = useNavigate()

    const Videos = [
        {
          "title": "Alternate Ending - Episode 606",
          "author": "The Joe Budden Podcast",
          "posterURL": "../alternateending.jpg",
          "imageURL": "../jbp.jpg",
          "views": 12313
        },
        {
          "title": "Gritz and Cornbread",
          "author": "The Brilliant Idiot Podcast",
          "posterURL": "../gritzandcornbread.jpg",
          "imageURL": "../brilliantidiots.jpg",
          "views": 12313
        }
        ,
        {
          "title": "Day Walker | Episode 10",
          "author": "Rory & Mal Podcast",
          "posterURL": "../daywalker.jpg",
          "imageURL": "../rorynmal.jpg",
          "views": 12313
        },
        {
          "title": "Day Walker | Episode 10",
          "author": "Rory & Mal Podcast",
          "posterURL": "../daywalker.jpg",
          "imageURL": "../rorynmal.jpg",
          "views": 12313
        },
      ]


    const AudioItems = [
        {
          "title": "Dark Times",
          "author": "Vince Staples",
          "imageURL": "darktimes.jpg"
        },
        {
          "title": "Dark Times",
          "author": "Vince Staples",
          "imageURL": "darktimes.jpg"
        },
        {
          "title": "Tyla",
          "author": "Tyla",
          "imageURL": "../tyla.jpg"
        },
        {
          "title": "Talk Memory",
          "author": "BADBADNOTGOOD",
          "imageURL": "../Bbngtalkmemory.jpg"
        },
        {
          "title": "Yes Lawd",
          "author": "NxWorries",
          "imageURL": "../yeslawd.jpg"
        },
        {
          "title": "Why Lawd",
          "author": "Anderson .Paak",
          "imageURL": "../whylawd.jpg"
        }
      ]
      
    useEffect(() => {
        // console.log( auth.user.id === head.id)
    })
    return (
      <>
        <header className='profile_header' style={{'backgroundImage': `url(${head.headerPosterURL})`}}>
            <div className="profile_header_overlay">
              <div className='user_profile_header_detail_container'>
                  <div className='profile_avi' style={{'backgroundImage': `url(${head.imageURL})`}}/>
                  <div className='user_profile_header_detail'>
                      <span className='label_username'>{head.username}</span>
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
              <div className='profile_header_nav'>
                  <ul>
                      {/* <li 
                      style={navState == "Home" ? activeNavButtonStyle : inActiveButtonStyle} onClick={(e: React.SyntheticEvent) => setNavState(e.currentTarget.innerHTML)}>Home</li><li 
                      style={navState == "Video" ? activeNavButtonStyle : inActiveButtonStyle} onClick={(e: React.SyntheticEvent) => setNavState(e.currentTarget.innerHTML) }>Saved</li><li 
                      style={navState == "Tracks" ? activeNavButtonStyle : inActiveButtonStyle} onClick={(e: React.SyntheticEvent) => setNavState(e.currentTarget.innerHTML)}>Tracks</li> */}
                  </ul>
              </div>
            </div>
        </header>
        <div className="page_body">
          {
            props.watchHistory.length > 0 ? 
            <section>
                <span className="section_subheading">Watch again</span>
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
              <span className="section_subheading">Recent Plays</span>
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

        <section>
          <span className="section_subheading">Saved</span>
        </section>
        <section>
          <span className="section_subheading">Following</span>
        </section>
        </div>
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
