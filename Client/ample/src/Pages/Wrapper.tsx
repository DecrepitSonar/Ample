import React, { MouseEvent, ReactNode, useEffect, useState } from "react"
import '../styles/sidebar.css'
// import { FaSearch } from "react-icons/fa"
import { Link, Path } from "react-router-dom"
import { Outlet, useLocation, useParams } from "react-router-dom"
import Nav from '../Components/Nav.js'
import BottomMediaBar from '../Components/BottomMediaBar.js'
import { 
  AudioListItemPropType, 
  MediumUserListItemPropType } from "../utils/ObjectTypes.js"
import { FaThList } from "react-icons/fa"
import { HiHeart } from "react-icons/hi2"
import { BsGlobe, BsRadar } from "react-icons/bs"
import { RiPlayList2Line } from "react-icons/ri"
import { useSelector } from "react-redux"
import { RootState } from "../utils/store.js"

function AudioListItem(props:AudioListItemPropType){
  return(
  <div className="audio_list_item_container">
    <img className="audio_list_item_image" src={`${props.imageURL}`}/>
    <div className="audio_list_item_info">
      <span>{props.title}</span>
      <span>{props.artist}</span>
    </div>
  </div>
  )
}

function MediumUserListItem(props:MediumUserListItemPropType){

  return(
    <div className="medium_user_list_item_container">
      <div className="medium_user_list_item">
        <img className="medium_user_list_item_image" src={`${props.imageURL}`}/>
        <div className="medium_user_list_item_info">
          <span>{props.artist}</span>
        </div>
      </div>
    </div>
  )
}
function AsideQueue(){
  
  const nowplayin = {
    "title": "86Sentra",
    "artist": "NxWorries, Anderson .Paak",
    "imageURL": "../whylawd.jpg"
  }

  const queue = [
    {
      "title": "MoveOn",
      "artist": "NxWorries, Anderson .Paak",
      "imageURL": "../whylawd.jpg"
    },
    {
      "title": "KeepHer (feat. Thundercat )",
      "artist": "NxWorries, Anderson .Paak",
      "imageURL": "../whylawd.jpg"
    },
    {
      "title": "KeepHer (feat. Thundercat )",
      "artist": "NxWorries, Anderson .Paak",
      "imageURL": "../whylawd.jpg"
    },
    {
      "title": "KeepHer (feat. Thundercat )",
      "artist": "NxWorries, Anderson .Paak",
      "imageURL": "../whylawd.jpg"
    }
  ]

  const features = [
    {
      "artist": "Anderson .Paak",
      "imageURL": "../andersonpaak.jpg"
    },
    {
      "artist": "NxWorries",
      "imageURL": "../yeslawd.jpg"
    },

    {
      "artist": "Knowledge",
      "imageURL": "../knx.jpg"
    },
  ]

  return(
    <>
    {/* Now Playing */}
    <section>
      <span className="aside_section_title">Now Playling</span>
      <div className="lib_collection_container">
        <AudioListItem {...nowplayin}/>
      </div>
    </section>

    {/* Queued  */}

    <section>
      <span className="aside_section_title">Up next</span>
      <div className="lib_collection_container">
      {
        queue.map( (item: AudioListItemPropType) => {
          return <AudioListItem {...item}/>
        })
      }
      </div>
    </section>
    
    {/* Features */}
    <section>
      <span className="aside_section_title">Track Features</span>
      <div className="lib_collection_container">
        {
          features.map( feature => {
            return <MediumUserListItem {...feature}/>
          })
        }
      </div>
    </section>
    </>
  )
}
function AsideSaved(){
  return(
    <><span className="aside_section_title">Saved</span></>
  )
}
function AsideHistory(){
  return(
    <><span className="aside_section_title">History</span></>
  )
}
function AsideSubscriptions() {

  const Subscriptions = [
    {
      "artist": "Anderson .Paak",
      "imageURL": "andersonpaak.jpg"
    },
    {
      "artist": "NxWorries",
      "imageURL": "yeslawd.jpg"
    },

    {
      "artist": "Knowledge",
      "imageURL": "knx.jpg"
    },
    {
      "artist": "Knowledge",
      "imageURL": "knx.jpg"
    },
    {
      "artist": "Knowledge",
      "imageURL": "knx.jpg"
    },
    {
      "artist": "Knowledge",
      "imageURL": "knx.jpg"
    },
    {
      "artist": "Knowledge",
      "imageURL": "knx.jpg"
    },
    {
      "artist": "Knowledge",
      "imageURL": "knx.jpg"
    },
    {
      "artist": "Knowledge",
      "imageURL": "knx.jpg"
    },
    {
      "artist": "Knowledge",
      "imageURL": "knx.jpg"
    },
    {
      "artist": "Knowledge",
      "imageURL": "knx.jpg"
    },
  ]
  return(
    <>
    <section>
      <span className="aside_section_title">Subscriptions</span>
      <div className="lib_collection_container">
        {
          Subscriptions.map( item => {
            return <MediumUserListItem {...item}/>
          })
        }
      </div>
    </section></>
  )
}
function AsideVideoCollection(){
  return(
    <div className="video_collection_container">
      <h3>Recommended</h3>
      <div className="small_video_item_container">
        <div className="small_video_item_poster" style={{backgroundImage: 'url(6lack.jpg'}}/>
        <div className="small_video_item_detail_container">
          <span>East Atlanta Love letter</span>
          <span>6lack</span>
          <span>1231 Views</span>
        </div>
      </div>

      <div className="small_video_item_container">
        <div className="small_video_item_poster" style={{backgroundImage: 'url(6lack.jpg'}}/>
        <div className="small_video_item_detail_container">
          <span>East Atlanta Love letter</span>
          <span>6lack</span>
          <span>1231 Views</span>
        </div>
      </div>

      <div className="small_video_item_container">
        <div className="small_video_item_poster" style={{backgroundImage: 'url(6lack.jpg'}}/>
        <div className="small_video_item_detail_container">
          <span>East Atlanta Love letter</span>
          <span>6lack</span>
          <span>1231 Views</span>
        </div>
      </div>

      <div className="small_video_item_container">
        <div className="small_video_item_poster" style={{backgroundImage: 'url(6lack.jpg'}}/>
        <div className="small_video_item_detail_container">
          <span>East Atlanta Love letter</span>
          <span>6lack</span>
          <span>1231 Views</span>
        </div>
      </div>

      <div className="small_video_item_container">
        <div className="small_video_item_poster" style={{backgroundImage: 'url(6lack.jpg'}}/>
        <div className="small_video_item_detail_container">
          <span>East Atlanta Love letter</span>
          <span>6lack</span>
          <span>1231 Views</span>
        </div>
      </div>

      <div className="small_video_item_container">
        <div className="small_video_item_poster" style={{backgroundImage: 'url(6lack.jpg'}}/>
        <div className="small_video_item_detail_container">
          <span>East Atlanta Love letter</span>
          <span>6lack</span>
          <span>1231 Views</span>
        </div>
      </div>


    </div>
  )
}

function LiveComments(){
  return(
    <>Live Comments </>
  )
}

function Library(){

  const [ libstate, setLibstate ] = useState("Queue")

  function setNav(value: String){
    setLibstate( value )
  }

  const active = {
    color: "#C6A168",
    fontWeight: "bold",
    borderBottom: "1px solid rgba(198, 161, 104, 1)"
  }
  const inacitve = {
    color: "#ddd"
  }

  return(
  <>
  <div className="aside_header">
      <span>Library</span>
      <ul>
        <button name="Queue" style={ libstate == "Queue" ? active : inacitve}
        onClick={() => { setNav('Queue')}}><RiPlayList2Line/></button>
        <button name="Saved" style={ libstate == "Saved" ? active : inacitve}
        onClick={() => { setNav('Saved')}}><HiHeart/></button>
        <button name="Saved" style={ libstate == "History" ? active : inacitve}
        onClick={() => { setNav('History')}}><BsGlobe/></button>
        <button value="Subscriptions" style={ libstate == "Subscriptions" ? active : inacitve}
        onClick={() => { setNav('Subscriptions')}}><BsRadar/></button>
      </ul>
    </div>
    <div className="aside_body">
      {
        {
          "Queue": <AsideQueue/>,
          "Saved": <AsideSaved/>,
          "History":<AsideHistory/>,
          "Subscriptions": <AsideSubscriptions/>
        }[libstate]
      }
    </div>
  </>
)
}

function Aside(){
  
  const [ asideLocation, setAsideLocation ] = useState('Library')

  const params = useParams()
  const location = useLocation()
  const auth = useSelector( ( state: RootState) => state.auth)

  function setNav(e: MouseEvent){
    // setLibstate( e)
    console.log( e.currentTarget)
  }

  useEffect(() => {
    console.log( params )
    const currentLocation = location.pathname.split('/')[1]
    setAsideLocation(currentLocation)
  },[location])

  return(
  <aside>
    { 
      auth.isLoggedIn ? 
        {
          "video": <AsideVideoCollection/>,
          "live":<LiveComments/>,
        }[asideLocation] || <Library/>
        : <div className="unauthorized_Aside_container">
          <span>Sign in to view libarary</span>
          <Link to='/login' className="unauthorized_Aside_button">Sign in</Link>
        </div>
    }
  </aside>
  )
}

function Wrapper(){
    return(
        <main>
          <Nav/>
          <div className="content">
            <Outlet/>
          </div>
          <Aside/>
          <BottomMediaBar/>
        </main>
    )
  }
  export default Wrapper