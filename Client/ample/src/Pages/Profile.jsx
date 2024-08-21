import React, { useEffect, useState } from 'react'
import '../styles/profile.css'

function Home(props) {

    useEffect(() => {
        console.log( props)
    })
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

    const setState = (e) => {
        setNavState(e.target.innerHTML)
        console.log( e.target.innerHTML)
    }

    const activeStyle = {
        fontWeight: "bold",
        color: "rgb(198, 161, 104)"
    }

    const inActiveStyle = {
        
    }
  return (
    <div className='profile_container'>
        <header>
            <div className="profile_header_overlay"></div>
            <div className='profile_header_nav'>
                <ul>
                    <li 
                    style={navState == "Home" ? activeStyle : inActiveStyle}
                    onClick={(e) => setState(e)}>Home</li>
                    <li 
                    style={navState == "Video" ? activeStyle : inActiveStyle}
                    onClick={(e) => setState(e)}>Video</li>
                    <li 
                    style={navState == "Tracks" ? activeStyle : inActiveStyle}
                    onClick={(e) => setState(e)}>Tracks</li>
                </ul>
            </div>
            <div className='profile_header_info_container'>
                <div className='profile_header_info'>
                    <span>Username</span>
                    <span>Artist</span>
                    <span>Subscribers 1312</span>
                </div>
                <div className='profile_avi'></div>
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
