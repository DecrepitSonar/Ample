import React, { useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom'

function UserAvi(props) {

  const navigate = useNavigate()

  const styles = {
      backgroundImage: `url(//${props.data.imageUrl})`
  }

  useEffect(()=> {
  },[])

  return (
    <div className="large_user_avi"
    onClick={() => navigate('/profile', {state: props.data, preventScrollReset: true})}>
      <div
        className="user_avi"
        style={{'background-image': `url(${props.data.imageUrl})`}}
      ></div>
      <span>{props.data.username}</span>
    </div>
  );
}

function VideoItem(props){

  const navigate = useNavigate()

  return(
    <div className="video_item_container" onClick={() => navigate('/video')}>
      <div className="video_item_poster"
        style={{"backgroundImage": `url(${props.data.posterURL})`}}
      />
      <div className="video_item_info_container">
        <div className="video_item_author_avi"
          style={{"backgroundImage":`url(${props.data.imageURL})`}}
        />
        <div className="video_item_info">
        <span>{props.data.title}</span>
        <span>{props.data.author}</span>
        <span>{props.data.views} views</span>
        </div>

      </div>
    </div>
  )
}

function AudioItem(props){
  
  const navigate = useNavigate()

  return(
    <div className="audio_item_container" onClick={() => navigate("/audio")}>
      <div className="audio_item_art"
      style={{"backgroundImage": `url(${props.data.imageURL})`}}
      />
      <div className="audio_item_info">
        <span>{props.data.title}</span>
        <span>{props.data.author}</span>
      </div>
    </div>
  )
}
function Home() {


  const users = [
    {
      username: "6lack",
      imageUrl: "6lack2.jpg",
    },
    {
      username: "Doja Cat",
      imageUrl: "Doja.jpg",
    },
    {
      username: "The Alchemist",
      imageUrl: "thealchemist.jpg",
    },
    {
      username: "Anderson .Paak",
      imageUrl: "6lack2.jpg",
    },
    {
      username: "Tems",
      imageUrl: "6lack2.jpg",
    },
    {
        username: "Tems",
        imageUrl: "6lack2.jpg",
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
                    return <VideoItem data={video}/>
                })
                
            }
        </div>
      </section>
      <section>
        <span className="section_subheading">Music</span>
        <div className="section_item_container">
        {
            AudioItems.map( item => {
                return <AudioItem data={item}/>
            })
            
        }
        </div>
      </section>
      <section>
        <span className="section_subheading">Top Creators</span>
        <div className="section_item_container">
            {
                users.map( user => {
                    return <UserAvi data={user}/>
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
