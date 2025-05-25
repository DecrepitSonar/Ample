import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AudioItemPropType, userAuthType, UserAviPropType } from '../../utils/ObjectTypes'
import { activeNavButtonStyle, inActiveButtonStyle } from '../../utils/computedSyles'
import TrackStrip from '../../Components/TrackStrip'
// import Home from './Home'
import { useParams } from 'react-router-dom'
import httpclient from '../../httpclient'
import AudioItem from '../../Components/AudioItem'
import { BiCheckCircle } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { RootState } from '../utils/store'
import { handleSubscription, save } from '../../utils/librarySlice'
import { useDispatch } from 'react-redux'
import { useAppDispatch } from '../../utils/store'


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
  
type createorPropType = {
    id: String, 
    type: String
    name: String
    imageURL: String, 
    isVerified: Boolean
    joinDate: Date
    subscribers: Number 
}

type profileData = {
    creator: createorPropType
    trending: [AudioItemPropType]
    albums: [AudioItemPropType]
    singles: [AudioItemPropType]
}
function FollowButton(props: UserAviPropType){
    

    const library = useSelector( (state: RootState) => state.library.library)
    const isSubscribed = library != undefined ? library.find(_ => _.id == props.id) != undefined : false
    
    const dispatch = useAppDispatch() 
    
    return(
        <>
            {
                isSubscribed  ?
                <button 
                    onClick={() => handleSubscription()}
                    className='following_button'>Subscribed</button> :
                <button
                    onClick={() => dispatch(save(props))}
                    className='follow_button'>Subscribe</button>  
            }
        </>
    )
}


export default function CreatorProfile(){

    const [ navState, setNavState ] = useState("Home")
    const [ profileData, setProfileData ] = useState<profileData>()
    const params = useParams()

    const library = useSelector( (state: RootState) => state.library.library)
    
    useEffect(() => {

        if( params.id) {
            httpclient.get(`http://127.0.0.1:5000/creator-profile?id=${params.id}`)
            .then( response => { setProfileData(response.data) })
        }
    },[])

    function formatNumber(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    return(
        <div className='page_container'>
        <header className='creator_profile_header' 
        style={{'backgroundImage': `url(https://prophile.nyc3.cdn.digitaloceanspaces.com/images/${profileData && profileData.creator.imageURL}.jpg)`}}>
            <div className="creator_profile_header_overlay"> 
                
                <section className='creator_profile_header_section'>                    
                    <div className='featured_section'>    

                                    <div className='creator_profile_header_info'>   
                                        <span>{profileData && profileData.creator.type} <i><BiCheckCircle/></i></span> 
                                        <span className='profile_section_title'>{profileData &&  profileData.creator.name}</span>
                                        <span>Subscribers: {profileData && formatNumber(profileData.creator.subscribers.toString())}</span>
                                        <FollowButton {...profileData?.creator}/>
                                    </div>

                        <div className='profile_about_sub_section'>
                            <span>About</span>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo magni reiciendis quasi possimus aspernatur. Reiciendis reprehenderit repudiandae alias eos ad optio! Consequuntur quo quod vel distinctio eius qui? Iusto, omnis.</p>
                        </div>  
                    </div>
                </section>
            </div>

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
            
        </header>
        <div className='page_body'>
            {
                profileData && 
                <>
                    <section>
                        <h1>Trending Songs</h1>
                        <div className="dual_list_collection">

                            {profileData.trending.length > 0 && profileData.trending?.map( track => {
                                return <TrackStrip key={track.id} {...track}/>
                            })}

                        </div>
                    </section>

                    {
                        profileData.albums.length > 0 &&
                        <section>
                            <h1>Albums</h1>
                            <div className='h_list'>
                                {
                                    profileData.albums.map( item => {
                                        return <AudioItem key={item.id} {... item} />
                                    })
                                }
                                    
                            </div>
                        </section>
                    }
                    {
                        profileData.singles.length > 0 && 
                        <section>
                            <h1>Singles</h1>
                            <div className='h_list'>
                                {
                                    profileData.singles.map( item => {
                                        return <AudioItem key={item.id} {... item} />
                                    })
                                }  
                            </div>
                        </section>
                    }
                </>
            }
        </div>
    </div>
    )
}