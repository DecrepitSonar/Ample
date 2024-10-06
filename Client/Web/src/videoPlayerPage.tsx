import React, { useEffect, useState } from "react";
import './styles/videoPlayerPage.css'
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import VideoItem from "./Components/VideoItem";
import { BsShareFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { VideoItemPropType } from "./utils/ObjectTypes";
import axios from "axios";

type videPlayerPageData = {
    video: VideoItemPropType,
    recommendedVideos?: [],
}

function VideoPlayerPage(){

    const [content, setContent] = useState<videPlayerPageData>()
    const params = useParams()
    

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/video?videoId=${params.videoId}`)
        .then( response => {
            console.log( response.data )
            setContent( response.data )
        })
    },[])

    const Videos = [
        {
          "title": "Alternate Ending - Episode 606",
          "author": "The Joe Budden Podcast",
          "posterURL": "alternateending.jpg",
          "imageURL": "",
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
          "imageURL": "/rorynmal.jpg",
          "views": 12313
        },
      ]

    return(
        <div className="video_page_container">
            <div className="videoHeaderContainer">
                <video autoPlay muted controls className="video_player" src={content ? content.video.contentURL : ''}/>
                <div className="videoDetailContainer">
                    <div className="videoDetail">
                        
                        <div className="authorDetailContainer">
                            <img className="authorAvi" src={`${content ? 'https://prophile.nyc3.cdn.digitaloceanspaces.com/images/' + content.video.imageURL + '.jpg' : ''}`}/>
                            <div className="authorDetail">
                            <span className="videoDetail_title">{content ? content.video.title : 'Loading'}</span>
                                <span className="AuthorName">{content ? content.video.author : 'Loading'}</span>
                                <span className="videoViews">{content ? content.video.views : 'Loading'} views</span>
                            </div>

                        </div>
                    </div>
                    <div className="videoButtons">
                        <button><FaThumbsUp/> 231</button>
                        <button><FaThumbsDown/> 132 </button>
                        <button><BsShareFill/></button>
                        <button><HiEllipsisHorizontal/></button>
                    </div>
                </div>
            </div>

            {
                content?.recommendedVideos?.length > 0 ? 
                    <section>
                        <span className="section_subheading">More from { content.video.author}</span>
                        <div className="section_item_container">
                            {
                                Videos ?
                                Videos.map( (video, index) => {
                                return <VideoItem key={index} {...video}/>
                            }) : null
                            }
                        </div>
                    </section>
                : null
            }
        </div>
    )
}

export default VideoPlayerPage