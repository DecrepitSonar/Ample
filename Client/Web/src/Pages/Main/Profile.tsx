import React, { useEffect, useState } from 'react'
import { Link, Navigate, replace, useNavigate, useParams } from 'react-router-dom'
import { activeNavButtonStyle, inActiveButtonStyle } from '../../utils/computedSyles'
import axios from 'axios'
import { userAuthType } from '../../utils/ObjectTypes'
import { useSelector } from 'react-redux'
import { RootState } from '@reduxjs/toolkit/query'
import AudioItem from '../../Components/AudioItem'
import VideoItem from '../../Components/VideoItem'



function Home() {

  return (
    <>
    <section>
        <span className='profile_section_title'>Featured</span>
        <div className='featured_section'>
            <div className='h_video_item_container'>
                <div className='h_video_item_poster'></div>
                <div className='h_video_item_info'>
                    <span>title</span>
                    <span>Artist</span>
                    <span>213123 views</span>
                </div>
            </div>
            
            <div className='profile_about_sub_section'>
                <span>About</span>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo magni reiciendis quasi possimus aspernatur. Reiciendis reprehenderit repudiandae alias eos ad optio! Consequuntur quo quod vel distinctio eius qui? Iusto, omnis.</p>
            </div>  
        </div>
    </section>
    <section>

    </section>
    </>
  )
}


function Video() {
  return (
    <>
    <section>
        <span className='profile_section_title'>Videos</span>
    </section>
    </>
  )
}

function Audio() {
return (
    <>
        <section>
            <span className='profile_section_title'>Tracks</span>
        </section>
    </>
)
}

function CreatorProfile(props: userAuthType) {

    const [ navState, setNavState ] = useState("Home")

  return (
    <div>
        <header style={{'backgroundImage': `url(${props.headerPosterURL})`}}>
            <div className="profile_header_overlay"/>
            <div className='profile_header_nav'>
                <ul>
                    <li 
                    style={navState == "Home" ? activeNavButtonStyle : inActiveButtonStyle}
                    onClick={(e: React.SyntheticEvent) => setNavState(e.currentTarget.innerHTML)}>Home</li>
                    <li 
                    style={navState == "Video" ? activeNavButtonStyle : inActiveButtonStyle}
                    onClick={(e: React.SyntheticEvent) => setNavState(e.currentTarget.innerHTML) }>Video</li>
                    <li 
                    style={navState == "Tracks" ? activeNavButtonStyle : inActiveButtonStyle}
                    onClick={(e: React.SyntheticEvent) => setNavState(e.currentTarget.innerHTML)}>Tracks</li>
                </ul>
            </div>
            <div className='profile_header_info_container'>
                <div className='profile_header_info'>
                    <span>{props.username}</span>
                    <span>{props.type}</span>
                    <span>Subscribers 1312</span>
                </div>
                <div className='profile_avi'
                style={{'backgroundImage': `url(${props.imageURL})`}}
                />
            </div>
        </header>
        <div className='profile_body'>
            {
                {
                    "Home": <Home/>,
                    "Video": <Video/>,
                    "Tracks": <Audio/>
                }[navState]
            }
        </div>
    </div>
  )
}

function UserProfile(props: userAuthType) {

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
      ]


    const AudioItems = [
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
        console.log( auth.user.id === props.id)
    })
    return (
      <div>
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
                      <button className='follow_button'>Follow</button> 
                      {/* // <button className='following_button'>Following</button> */}
                      {/* } */}
                  </div>
              </div>    
              <div className='profile_header_nav'>
                  <ul>
                      <li 
                      style={navState == "Home" ? activeNavButtonStyle : inActiveButtonStyle}
                      onClick={(e: React.SyntheticEvent) => setNavState(e.currentTarget.innerHTML)}>Home</li>
                      <li 
                      style={navState == "Video" ? activeNavButtonStyle : inActiveButtonStyle}
                      onClick={(e: React.SyntheticEvent) => setNavState(e.currentTarget.innerHTML) }>Video</li>
                      <li 
                      style={navState == "Tracks" ? activeNavButtonStyle : inActiveButtonStyle}
                      onClick={(e: React.SyntheticEvent) => setNavState(e.currentTarget.innerHTML)}>Tracks</li>
                  </ul>
              </div>
            </div>
        </header>
        <div className="page_body">
            <section>
                <span className="section_subheading">Podcast</span>
                <div className="section_item_container">
                    {
                        Videos.map( video => {
                            return <VideoItem {...video}/>
                        })
                        
                    }
                </div>
            </section>
        <section>
            <span className="section_subheading">Music</span>
            <div className="section_item_container">
            {
                AudioItems.map( item => {
                    return <AudioItem {...item}/>
                })
                
            }
            </div>
        </section>
      </div>
      </div>
    )
  }

export default function Profile() {

    const [ profileData, setProfileData ] = useState<userAuthType>()

    const params = useParams()

    useEffect(() => {
        if( params.id) {
            axios.get(`http://127.0.0.1:5000/user?id=${params.id}`)
            .then( response => {
            setProfileData(response.data)
            })
        }
    },[])

  return (
    <div className='page_container'>
        {profileData ? 
            profileData.type  == 'User' ? <UserProfile {...profileData}/> : <CreatorProfile {...profileData}/>
        : <>User Not Found </> }
    </div>
  )
}
