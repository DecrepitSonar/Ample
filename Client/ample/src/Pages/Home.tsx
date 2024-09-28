import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import { AudioItemPropType, UserAviPropType, VideoItemPropType } from "../utils/ObjectTypes";
import AudioItem from "../Components/AudioItem";
import VideoItem from "../Components/VideoItem";
import UserAvi from "../Components/UserAvi";
import axios from "axios";

type HomePageDataType = {
  featured: [VideoItemPropType],
  podcasts: [VideoItemPropType],
  music: [AudioItemPropType],
  artists: [UserAviPropType]
}
function Home() {

  const [homeData, setHomeData] = useState<HomePageDataType>()

  const [headerIndex, setHeaderIndex ] = useState(0)

  function updateHeaderIndex(index: number){
    setHeaderIndex(index)
  }

  const users = [
    {
      username: "Childish Major",
      imageURL: "https://prophile.nyc3.cdn.digitaloceanspaces.com/images/045c4400b983f685285eda35b519a5b249ff94fb.jpg",
    },
    {
      username: "Doja Cat",
      imageURL: "doja.jpg",
    },
    {
      username: "The Alchemist",
      imageURL: "thealchemist.jpg",
    },
    {
      username: "Anderson .Paak",
      imageURL: "andersonpaak.jpg",
    },
    {
      username: "Knxwledge",
      imageURL: "knx.jpg",
    },
    {
      username: "6lack",
      imageURL: "6lack2.jpg",
    }
  ];

  const Videos = [
    {
      "title": "Alternate Ending - Episode 606",
      "author": "The Joe Budden Podcast",
      "posterURL": "alternateending.jpg",
      "imageURL": "jbp.jpg",
      "views": 12313
    },
    {
      "title": "Gritz and Cornbread",
      "author": "The Brilliant Idiot Podcast",
      "posterURL": "gritzandcornbread.jpg",
      "imageURL": "brilliantidiots.jpg",
      "views": 12313
    }
    ,
    {
      "title": "Day Walker | Episode 10",
      "author": "Rory & Mal Podcast",
      "posterURL": "daywalker.jpg",
      "imageURL": "rorynmal.jpg",
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
      "imageURL": "tyla.jpg"
    },
    {
      "title": "Talk Memory",
      "author": "BADBADNOTGOOD",
      "imageURL": "Bbngtalkmemory.jpg"
    },
    {
      "title": "Yes Lawd",
      "author": "NxWorries",
      "imageURL": "yeslawd.jpg"
    },
    {
      "title": "Why Lawd",
      "author": "Anderson .Paak",
      "imageURL": "whylawd.jpg"
    }
  ]

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
              <button>Watch</button>
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
      </div>
     
    </div>
  );
}

export default Home;

//   <UserAvi/>
