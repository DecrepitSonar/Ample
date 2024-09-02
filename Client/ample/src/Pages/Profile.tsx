import React, { useEffect, useState } from 'react'
import '../styles/profile.css'
import { useParams } from 'react-router-dom'
import { activeNavButtonStyle, inActiveButtonStyle } from '../utils/computedSyles'
import axios from 'axios'

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

export default function Profile() {

    const [ navState, setNavState ] = useState("Home")
    const [ profileData, setProfileData ] = useState({})

    const params = useParams()
    const setState = (e: React.SyntheticEvent) => {}

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/user?id=${params.id}`)
        .then( response => {
          setProfileData(response.data)
        })
    },[])

  return (
    <div className='profile_container'>
        <header style={{'backgroundImage': `url(${profileData.headerPosterURL})`}}>
            <div className="profile_header_overlay"/>
            <div className='profile_header_nav'>
                <ul>
                    <li 
                    style={navState == "Home" ? activeNavButtonStyle : inActiveButtonStyle}
                    onClick={(e: React.SyntheticEvent) => setState(e)}>Home</li>
                    <li 
                    style={navState == "Video" ? activeNavButtonStyle : inActiveButtonStyle}
                    onClick={(e: React.SyntheticEvent) => setState(e)}>Video</li>
                    <li 
                    style={navState == "Tracks" ? activeNavButtonStyle : inActiveButtonStyle}
                    onClick={(e: React.SyntheticEvent) => setState(e)}>Tracks</li>
                </ul>
            </div>
            <div className='profile_header_info_container'>
                <div className='profile_header_info'>
                    <span>{profileData.username}</span>
                    <span>{profileData.type}</span>
                    <span>Subscribers 1312</span>
                </div>
                <div className='profile_avi'
                style={{'backgroundImage': `url(${profileData.imageURL})`}}
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
