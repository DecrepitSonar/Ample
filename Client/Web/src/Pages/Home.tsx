import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import { AudioItemPropType, HomePageDataType, UserAviPropType, VideoItemPropType } from "../utils/ObjectTypes";
import AudioItem from "../Components/AudioItem";
import VideoItem from "../Components/VideoItem";
import UserAvi from "../Components/UserAvi";
import axios from "axios";

function Home() {

  const [homeData, setHomeData] = useState<HomePageDataType>()
  const [headerIndex, setHeaderIndex ] = useState(0)
  const navigate = useNavigate()

  function updateHeaderIndex(index: number){
    setHeaderIndex(index)
  }

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/')
    .then( response => {
      console.log( response.data)
      setHomeData(response.data )
    })
  },[])

  // style={{"backgroundImage": 'url(6lack.jpg)'}}
  return (
    <div className="page_container">
      <header>
        <video 
          className="video_header" 
          src={`${homeData ? homeData.featured[headerIndex].contentURL : '' }`} 
          autoPlay 
          muted
        />
        <div className="headerOverlay">
          <div className="header_detail_container">

            <span className="header_title">Discover</span>

            {/* Header video description */}
            <div className="header_video_detail">
              <button onClick={ () => navigate( `video/${homeData?.featured[headerIndex].id}` )}>Watch</button>
              <span>{homeData ? homeData.featured[headerIndex].title : ''}</span>
              <span>{homeData ? homeData.featured[headerIndex].author : ''}</span>
            </div>
            
          </div>

          {/* Floating video Progressbar */}
          <div className="header_progress_bar_container">
              <div className="header_progress_bar"></div>
            </div>

          {/* Pagination buttons */}
          <div className="pagination_container">
            <div className="pagination_dots">
              { 
                homeData ? 
                   homeData.featured?.map( (item, index) => {
                    return <div 
                    style={headerIndex == index ? { 'backgroundColor': "#C6A168"}: {}}
                    key={index} 
                    onClick={(e) => updateHeaderIndex(index)}
                    className="pagination_dot"/>
                  })
                 : null
              } 
            </div>
          </div>
        </div>
      </header>
      <div className="page_body">
      <section>
        <span className="section_subheading">Podcast</span>
        <div className="section_item_container">
            {
                homeData ?
                homeData.podcasts.map( video => {
                  return <VideoItem key={video.id} {...video}/>
              }) : null
            }
        </div>
      </section>
      <section>
        <span className="section_subheading">Music</span>
        <div className="section_item_container">
        {
        homeData ? 
            homeData.music.map( item => {
                return <AudioItem {...item}/>
            }) : null
            
        }
        </div>
      </section>
      <section>
        <span className="section_subheading">Top Creators</span>
        <div className="section_item_container">
            {
              homeData ?
              homeData.artists.map( (user: UserAviPropType)  => {
                    return <UserAvi {...user}/>
                }) : null
                
            }
        </div>
      </section>
      <section>
        <span className="section_subheading">Videos</span>
        <div className="section_item_container">
            {
                homeData ?
                homeData.videos.map( video => {
                  return <VideoItem key={video.id} {...video}/>
              }) : null
            }
        </div>
      </section>
      </div>
     
    </div>
  );
}

export default Home;

//   <UserAvi/>
