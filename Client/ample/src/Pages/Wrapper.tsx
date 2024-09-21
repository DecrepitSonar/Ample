import React, { MouseEvent, useEffect, useState } from "react"
import '../styles/sidebar.css'
// import { FaSearch } from "react-icons/fa"
import { Outlet, useLocation, useParams } from "react-router-dom"
import Nav from '../Components/Nav.js'
import BottomMediaBar from '../Components/BottomMediaBar.js'
import { 
  AudioListItemPropType, 
  MediumUserListItemPropType } from "../utils/ObjectTypes.js"

function AudioListItem(props:AudioListItemPropType){
  return(
  <div className="audio_list_item_container">
    <div className="audio_list_item_image" 
    style={{'backgroundImage': `url(${props.imageURL})`}}/>
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
        <div className="medium_user_list_item_image"
        style={{"backgroundImage": `url(${props.imageURL})`}}/>
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
    "imageURL": "whylawd.jpg"
  }

  const queue = [
    {
      "title": "MoveOn",
      "artist": "NxWorries, Anderson .Paak",
      "imageURL": "whylawd.jpg"
    },
    {
      "title": "KeepHer (feat. Thundercat )",
      "artist": "NxWorries, Anderson .Paak",
      "imageURL": "whylawd.jpg"
    },
    {
      "title": "KeepHer (feat. Thundercat )",
      "artist": "NxWorries, Anderson .Paak",
      "imageURL": "whylawd.jpg"
    },
    {
      "title": "KeepHer (feat. Thundercat )",
      "artist": "NxWorries, Anderson .Paak",
      "imageURL": "whylawd.jpg"
    }
  ]

  const features = [
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
    <>Saved</>
  )
}
function AsideHistory(){
  return(
    <>History</>
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
  function setNav(e: MouseEvent){
    // setLibstate( e)
    console.log( e.currentTarget)
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
        <li style={ libstate == "Queue" ? active : inacitve}
        onClick={(e) => { setNav(e)}}>Queue</li>
        <li style={ libstate == "Saved" ? active : inacitve}
        onClick={(e) => { setNav(e)}}>Saved</li>
        <li style={ libstate == "History" ? active : inacitve}
        onClick={(e) => { setNav(e)}}>History</li>
      </ul>
    </div>
    <div className="aside_body">
      {
        {
          "Queue": <AsideQueue/>,
          "Saved": <AsideSaved/>,
          "History":<AsideHistory/>
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
        {
          "video": <AsideVideoCollection/>,
          "live":<LiveComments/>,
        }[asideLocation] || <Library/>
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