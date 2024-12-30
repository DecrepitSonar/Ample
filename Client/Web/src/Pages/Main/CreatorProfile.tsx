import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { userAuthType } from '../../utils/ObjectTypes'
import { activeNavButtonStyle, inActiveButtonStyle } from '../../utils/computedSyles'
// import Home from './Home'
import { useParams } from 'react-router-dom'


function Home() {

    return (
      <>
      
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
  
export default function CreatorProfile(){

    const [ navState, setNavState ] = useState("Home")
    const [ profileData, setProfileData ] = useState<userAuthType>()
    const params = useParams()

    useEffect(() => {

        console.log( params )

        if( params.id) {
            axios.get(`http://127.0.0.1:5000/user-profile?id=${params.id}`)
            .then( response => {
            // setProfileData(response.data)
            // console.log( response.data)
            })
        }
    },[])

    return(
        <div className='page_container'>
        <header className='profile_header' style={{'backgroundImage': `url(${profileData && profileData.headerPosterURL})`}}>
            <div className="profile_header_overlay"/>
            {/* <div className='profile_header_nav'>
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
            </div> */}
            <div className='profile_header_info_container'>
                
                    {
                        profileData ?
                            <>
                                <div className='profile_header_info'>   
                                    {/* <div> */}
                                        <span>{profileData.type}</span> 
                                        <span>{profileData.username}</span> 
                                    {/* </div> */}
                                    {/* <span>Subscribers {profileData.subscribers}</span> */}
                                </div>
                                <div className='profile_avi'style={{'backgroundImage': `url(https://prophile.nyc3.digitaloceanspaces.com/images/${profileData.imageURL}.jpg)`}}/>
                            </> : <></>
                    }
            </div>
        </header>
        <div className='page_body'>
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
        </div>
    </div>
    )
}