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

export default function CreatorProfile(){

    const [ navState, setNavState ] = useState("Home")
    const [ profileData, setProfileData ] = useState<profileData>()
    const [modalOpen, setModalOpen ] = useState(false)
    
    const params = useParams()
    const dispatch = useAppDispatch() 

    const library = useSelector( (state: RootState) => state.library.library)
    const isSubscribed = library != undefined ? library.find(_ => _.id == profileData?.creator.id) != undefined : false


    useEffect(() => {

        if( params.id) {
            httpclient.get(`http://127.0.0.1:5000/creator-profile?id=${params.id}`)
            .then( response => { 
                setProfileData(response.data) })
        }
    },[])

    function formatNumber(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    const subscribeToCreator = async () => {

        try{
            
            const response = await dispatch(save(profileData?.creator))
            console.log( response )
            setModalOpen(false)
        }
        catch( error ){
            console.log( error )
        }
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
                                        
                                        {
                                            isSubscribed  ?
                                            <button 
                                                
                                                className='following_button'>Subscribed</button> :
                                            <button
                                                // onClick={() => {}}
                                                onClick={() => setModalOpen(true)}
                                                className='follow_button'>Subscribe</button>  
                                        }
                                        
                                    </div>

                        <div className='profile_about_sub_section'>
                            {/* <span>About</span> */}
                            {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo magni reiciendis quasi possimus aspernatur. Reiciendis reprehenderit repudiandae alias eos ad optio! Consequuntur quo quod vel distinctio eius qui? Iusto, omnis.</p> */}
                        </div>  
                    </div>
                </section>
            </div>

            <div className='profile_header_nav'>
                <ul>
                    <li 
                    style={navState == "Home" ? activeNavButtonStyle : inActiveButtonStyle}
                    onClick={(e: React.SyntheticEvent) => setNavState(e.currentTarget.innerHTML)}>Home</li>
                    <li 
                    style={navState == "About" ? activeNavButtonStyle : inActiveButtonStyle}
                    onClick={(e: React.SyntheticEvent) => setNavState(e.currentTarget.innerHTML)}>About</li>
                </ul>
            </div>
            
        </header>
        <div className='page_body'>
            {
                profileData && 
                {
                'Home': 
                
                <>
                    {   profileData.trending.length > 0 && 
                        <section>
                        <h1>Trending Songs</h1>
                        <div className="dual_list_collection">

                            {profileData.trending.length > 0 && 
                            profileData.trending?.map( track => {
                                return <TrackStrip key={track.id} {...track}/>
                            })}

                        </div>
                    </section>
                    }

                    {
                        profileData.albums.length > 0 &&
                        <section>
                            <h1>Albums</h1>
                            <div className='h_list'>
                                {
                                    profileData.albums.map( item => {

                                        console.log( item )
                                        return <AudioItem key={item.id} {...item} />
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
                                        return <AudioItem key={item.id} {...item} />
                                    })
                                }  
                            </div>
                        </section>
                    }
                </>,
                'About': <section><h1>About</h1></section>
                }[navState]
            }
        </div>
        <div style={modalOpen ? {} : {'display': 'none'} }
        className="ModalContainer">
            <div className="subscription_modal_container">

                <div className="subscription_modal_header">
                    <h1>Subscription Plans</h1>
                    <span>Subscribe to {profileData?.creator.name}</span>
                </div>
                <div className="Subscription_plan_list_container">
                    <div className="Subscription_plan_item">
                        <h2>Free Plan</h2>
                        <span>For regular listeners </span>
                        <h1>$0 <span>/m</span></h1>
                        <span>Includes</span>
                        <ul>
                            <li>Notified on new content </li>
                            <li>Regular streams </li>
                        </ul>
                    </div>
                    <div className="Subscription_plan_item">
                        <h2>Fan </h2>
                        <span>For Fans </span>
                        <h1>$5.00 <span>/m</span></h1>
                        <span>Includes</span>
                        <ul>
                            <li>Notified on new content </li>
                            <li>unlimited streams </li>
                            <li>exclusive content</li>
                        </ul>
                    </div>
                </div>
                <button onClick={() => subscribeToCreator() } className='submit_button_solid'>Subscribe</button>
            </div>
        </div>
    </div>
    )
}