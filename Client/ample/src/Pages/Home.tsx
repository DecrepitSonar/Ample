import React, { useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import { AudioItemPropType, UserAviPropType, VideoItemPropType } from "../utils/ObjectTypes";
import AudioItem from "../Components/AudioItem";
import VideoItem from "../Components/VideoItem";
import UserAvi from "../Components/UserAvi";

function Home() {


  const users = [
    {
      username: "6lack",
      imageUrl: "6lack2.jpg",
      type: 'creator'
    },
    {
      username: "Doja Cat",
      imageUrl: "Doja.jpg",
      type: 'creator'
    },
    {
      username: "The Alchemist",
      imageUrl: "thealchemist.jpg",
      type: 'creator'
    },
    {
      username: "Anderson .Paak",
      imageUrl: "6lack2.jpg",
      type: 'creator'
    },
    {
      username: "Tems",
      imageUrl: "6lack2.jpg",
      type: 'creator'
    },
    {
      username: "Tems",
      imageUrl: "6lack2.jpg",
      type: 'creator'
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

  return (
    <div className="page_container">
      <header style={{"backgroundImage": 'url(6lack.jpg)'}}>
        <div className="headerOverlay">
          <span className="header_title">Discover</span>
          {/* Floating video Progressbar */}
          <div className="header_progress_bar_container">
            <div className="header_progress_bar"></div>
          </div>
          {/* Header video description */}
          <div className="header_video_detail">
            <button>Watch</button>
            <span>Switch</span>
            <span>6lack</span>
          </div>

          {/* Pagination buttons */}
          <div className="pagination_container">
            <div className="pagination_dots">
              <div className="pagination_dot"/>
              <div className="pagination_dot"/>
              <div className="pagination_dot"/>
              <div className="pagination_dot"/>
            </div>
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
      <section>
        <span className="section_subheading">Top Creators</span>
        <div className="section_item_container">
            {
                users.map( user => {
                    return <UserAvi imageURL={""} {...user}/>
                })
                
            }
        </div>
      </section>
      </div>
     
    </div>
  );
}

export default Home;

//   <UserAvi/>
