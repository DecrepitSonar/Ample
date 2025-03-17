import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import { AudioItemPropType, HomePageDataType, SectionDataType, UserAviPropType, VideoItemPropType } from "../../utils/ObjectTypes";
import AudioItem from "../../Components/AudioItem";
import VideoItem from "../../Components/VideoItem";
import UserAvi from "../../Components/UserAvi";
import axios from "axios";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

function PageHeader(props: SectionDataType<VideoItemPropType>){
  const [headerIndex, setHeaderIndex ] = useState(0)
  function updateHeaderIndex(index: number){
    setHeaderIndex(index)
  }

  return<>
      <header className="main_header">
        <video 
          className="video_header" 
          src={`${props ? props.items[headerIndex].contentURL : '' }`} 
          autoPlay 
          muted
        />
        <div className="headerOverlay">
          <div className="header_detail_container">

            <span className="header_title">{props.tagline}</span>

            {/* Header video description */}
            <div className="header_video_detail">
              <button onClick={ () => navigate( `video/${props?.items[headerIndex].id}` )}>Watch</button>
              <span>{props ? props.items[headerIndex].title : ''}</span>
              <span>{props ? props.items[headerIndex].author : ''}</span>
            </div>
            
          </div>

          {/* Floating video Progressbar */}
          {/* <div className="header_progress_bar_container">
              <div className="header_progress_bar"></div>
            </div> */}
        </div>
        {/* Pagination buttons */}
        {/* <div className="pagination_container">
            <div className="pagination_dots">
              { 
                props &&
                  props.items?.map( (item: VideoItemPropType, index) => {
                    return <div 
                    style={headerIndex == index ? { 'backgroundColor': "#C6A168"}: {}}
                    key={index} 
                    onClick={(e) => updateHeaderIndex(index)}
                    className="pagination_dot"/>
                  })
              } 
            </div>
          </div> */}
      </header>
    </>
}

function Home() {

  const [homeData, setHomeData] = useState<[SectionDataType<null>]>()
  const navigate = useNavigate()

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
      {
        homeData &&
        homeData?.map((item: SectionDataType<T>) => {
          return {
              "Featured": <PageHeader {...item}/>,
              "Videos":
                <section>
                  <div className="section_header">
                    <h3 className="section_subheading">{item.tagline}</h3>
                    <h2 onClick={() => navigate('#')} >See more<i><BiChevronRight/></i> </h2>
                  </div>

                  <div className="section_item_container">
                      {
                          item &&
                          item.items.map( video => {
                            return <VideoItem key={video.id} {...video}/>
                        })
                      }
                  </div>
                </section>,

              "Music":
              <section>
                <div className="section_header">
                  <h3 className="section_subheading">Music</h3>
                  <h2 onClick={() => navigate('/listen')} >See more<i><BiChevronRight/></i> </h2>
                </div>
                  
                <div className="section_item_container">
                {
                item &&
                    item.items.map( item => {
                        console.log(item)
                        return <AudioItem key={item.id} {...item}/>
                    })}
                </div>
              </section>,
              "Artists" : 
              <section>
                <div className="section_header">
                  <h3 className="section_subheading">Top Creators</h3>
                </div>
                <div className="section_item_container">
                    {
                      item &&
                      item.items.map( (user: UserAviPropType)  => {
                            return <UserAvi {...user}/>}) 
                    }
                </div>
              </section>,
              "Music Videos":
              <section>
                <div className="section_header">
                  <h3 className="section_subheading">{item.tagline}</h3>
                  <h2 onClick={() => navigate('#')} >See more<i><BiChevronRight/></i> </h2>
                </div>
                
                <div className="section_item_container">
                    {
                        item &&
                        item.items.map( video => {
                          return <VideoItem key={video.id} {...video}/>
                      })
                    }
                </div>
              </section>
          }[item.type]
        })
      }
     
    </div>
  );
}

export default Home;
