import React, { useEffect, useState } from "react";
import '../../styles/videoPlayerPage.css'
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import VideoItem from "../Components/VideoItem";
import { BsShareFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { VideoItemPropType } from "../../utils/ObjectTypes";
import axios from "axios";
import AsideVideoCollection from "../../Components/AsideVideoCollection";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../utils/store";
import { togglePlayer } from "../../utils/mediaPlayerSlice";
import { BiBookmarkAlt } from "react-icons/bi";
import httpclient from "../../httpclient";
import { auth } from "../../utils/Authslice";

type videPlayerPageData = {
    video: VideoItemPropType,
    recommendedVideos?: [],
}
type CommentPropType = {
  username: String, 
  postDate: String, 
  imageURL: String, 
  comment: String
}
function CommentComponent(props: CommentPropType){
  return(
    <div className="comment_item_container">
      <div className="comment_avi"/>
      <div className="comment_content_container">
        <div className="comment_header">
          <span>{props.username}</span>
          <span>date</span>
        </div>
        <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas nihil non velit sint ipsam qui ducimus facere et quod amet assumenda iusto explicabo rerum illum, autem dicta ipsa alias harum!</p>
      </div>
    </div>
  )
}
function VideoPlayerPage(){

    const [content, setContent] = useState<videPlayerPageData>()
    const params = useParams()
    const audioPlayer = useSelector((state: RootState) => state.audioPlayer) 
    const user = useSelector( (state: RootState) => state.auth.user)

    const dispatch = useAppDispatch()

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/video?videoId=${params.videoId}&&id=${user.id}`)
        .then( response => {
            console.log( response.data )
            setContent( response.data )
        })
    },[])

    const handleCommentPost = (e) => {
      e.preventDefault()
       
      const target = e.target as typeof e.target & { comment: {value: String} } 
      
      const data = {
        'user_id': user.id, 
        'username': user.username, 
        'imageurl': user.imageURL,
        'comment': target.comment.value,
        'video_id': content?.video.id
      }

      console.log( data )

      try{
        const response = httpclient.post('http://127.0.0.1:5000/video/comment', data) 
        console.log( response )
      }
      catch( error) {
        console.log( error )
      }
      
    }
    
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

      const videos = [
        {
            "title": "Day Walker | Episode 10",
            "author": "Rory & Mal Podcast",
            "posterURL": "daywalker.jpg",
            "imageURL": "/rorynmal.jpg",
            "views": 12313
          },
          {
            "title": "Day Walker | Episode 10",
            "author": "Rory & Mal Podcast",
            "posterURL": "daywalker.jpg",
            "imageURL": "/rorynmal.jpg",
            "views": 12313
          },
          {
            "title": "Day Walker | Episode 10",
            "author": "Rory & Mal Podcast",
            "posterURL": "daywalker.jpg",
            "imageURL": "/rorynmal.jpg",
            "views": 12313
          },
          {
            "title": "Day Walker | Episode 10",
            "author": "Rory & Mal Podcast",
            "posterURL": "daywalker.jpg",
            "imageURL": "/rorynmal.jpg",
            "views": 12313
          },
          {
            "title": "Day Walker | Episode 10",
            "author": "Rory & Mal Podcast",
            "posterURL": "daywalker.jpg",
            "imageURL": "/rorynmal.jpg",
            "views": 12313
          },
          {
            "title": "Day Walker | Episode 10",
            "author": "Rory & Mal Podcast",
            "posterURL": "daywalker.jpg",
            "imageURL": "/rorynmal.jpg",
            "views": 12313
          },
          {
            "title": "Day Walker | Episode 10",
            "author": "Rory & Mal Podcast",
            "posterURL": "daywalker.jpg",
            "imageURL": "/rorynmal.jpg",
            "views": 12313
          },
          {
            "title": "Day Walker | Episode 10",
            "author": "Rory & Mal Podcast",
            "posterURL": "daywalker.jpg",
            "imageURL": "/rorynmal.jpg",
            "views": 12313
          },
          {
            "title": "Day Walker | Episode 10",
            "author": "Rory & Mal Podcast",
            "posterURL": "daywalker.jpg",
            "imageURL": "/rorynmal.jpg",
            "views": 12313
          },
          {
            "title": "Day Walker | Episode 10",
            "author": "Rory & Mal Podcast",
            "posterURL": "daywalker.jpg",
            "imageURL": "/rorynmal.jpg",
            "views": 12313
          },
          {
            "title": "Day Walker | Episode 10",
            "author": "Rory & Mal Podcast",
            "posterURL": "daywalker.jpg",
            "imageURL": "/rorynmal.jpg",
            "views": 12313
          },
          {
            "title": "Day Walker | Episode 10",
            "author": "Rory & Mal Podcast",
            "posterURL": "daywalker.jpg",
            "imageURL": "/rorynmal.jpg",
            "views": 12313
          },
          {
            "title": "Day Walker | Episode 10",
            "author": "Rory & Mal Podcast",
            "posterURL": "daywalker.jpg",
            "imageURL": "/rorynmal.jpg",
            "views": 12313
          },
          {
            "title": "Day Walker | Episode 10",
            "author": "Rory & Mal Podcast",
            "posterURL": "daywalker.jpg",
            "imageURL": "/rorynmal.jpg",
            "views": 12313
          }

      ]

      const comments = [
        {
          'username': 'Hannahmant',
          'postDAte': '',
          'imageURL':'',
          'comment':'The song literally sounds like how suede feels'
        },
        {
          'username': 'Comerpl',
          'postDAte': '',
          'imageURL':'',
          'comment':'The song literally sounds like how suede feels'
        },
        {
          'username': 'Dialoonce',
          'postDAte': '',
          'imageURL':'',
          'comment':'Not gonna lie. Best duo since outcast'
        },
        {
          'username': 'Everat',
          'postDAte': '',
          'imageURL':'',
          'comment':'I think i found my favourite song forever'
        },
        {
          'username': 'Virtuosoftad',
          'postDAte': '',
          'imageURL':'',
          'comment':'Nah, this is so good youd buy leater gloves, then take them off just to slap wana slap somebody'
        },
      ]

    return(
        <div className=" video_page_container ">
            <div className="video_page_main">
                <div className="videoHeaderContainer">
                    <video 
                    onPlay={() => {
                      if( audioPlayer.player.isPlaying){
                        dispatch(togglePlayer(null))
                      }
                    }}
                    autoPlay  muted controls className="video_player" src={content ? content.video.contentURL : ''}/>
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
                            <div className="description_container">
                              <span>Description</span>
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid consectetur, fugit ab distinctio ipsam saepe quos soluta fugiat architecto, voluptatem amet odit minus inventore cumque facilis fuga, enim sed corporis!</p>
                            </div>
                        </div>
                        <div className="videoButtons">
                            <button><FaThumbsUp/> 231</button>
                            <button><FaThumbsDown/> 132 </button>
                            <button><BsShareFill/></button>
                            <button><BiBookmarkAlt/></button>
                            <button><HiEllipsisHorizontal/></button>
                        </div>
                    </div>
                </div>
                <div className="commentSection">
                  <div className="comment_form_container">
                    <span>Comments</span>
                    <form action="#" onSubmit={(e) => handleCommentPost(e)}>
                      <img className="form_avi" src={user.imageURL}/>
                      <input type="text" placeholder="Add a comment..." name="comment"/>
                      <button>Post</button>
                    </form>
                    <div className="comments_collection_container">
                      {
                        comments.map( (item) => {
                          return <CommentComponent {...item}/>
                        })
                      }
                    </div>

                  </div>
                </div>
            </div>

            <div className="videoPage_side">
              {
                content?.recommendedVideos?.map( (item) => [
                  <AsideVideoCollection {...item}/>
                ])
              }
            </div>
        </div>
    )
}

export default VideoPlayerPage