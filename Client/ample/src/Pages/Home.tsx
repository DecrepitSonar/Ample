import React, { useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import { AudioItemPropType, UserAviPropType, VideoItemPropType } from "../utils/ObjectTypes";
import AudioItem from "../Components/AudioItem";
import VideoItem from "../Components/VideoItem";
import UserAvi from "../Components/UserAvi";

function Home() {


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

  // style={{"backgroundImage": 'url(6lack.jpg)'}}
  return (
    <div className="page_container">
      <header>
        <video 
          className="video_header" 
          src="https://prophile.nyc3.cdn.digitaloceanspaces.com/Videos/028b78a391ba8ec29dd3bee1ef9470936b2ea627.mp4" 
          autoPlay 
          muted
        />
        <div className="headerOverlay">
          <div className="header_detail_container">

            <span className="header_title">Discover</span>

            {/* Header video description */}
            <div className="header_video_detail">
              <button>Watch</button>
              <span>Switch</span>
              <span>6lack</span>
            </div>
            
          </div>

          {/* Floating video Progressbar */}
          <div className="header_progress_bar_container">
              <div className="header_progress_bar"></div>
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
                users.map( (user: UserAviPropType)  => {
                    return <UserAvi {...user}/>
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
