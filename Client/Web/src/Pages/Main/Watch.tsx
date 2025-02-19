import React, { useState } from 'react'
import { VideoItemPropType } from '../../utils/ObjectTypes'
import VideoItem from '../../Components/VideoItem'
import { useNavigate } from 'react-router-dom'

type WatchPageDateType = {
  headerFeatures: [VideoItemPropType],  
  music: [VideoItemPropType],  
  podcasts: [VideoItemPropType]
}

export default function Watch() {

  const [pageData, setPageData] = useState<WatchPageDateType>()
  const [headerIndex, setHeaderIndex ] = useState(0)
  const navigate = useNavigate()

  function updateHeaderIndex(index: number){
    setHeaderIndex(index)
  }

  return (
    <div className='page_container ' >
        <header className='main_header'>
          <video 
            className="video_header" 
            src="https://prophile.nyc3.cdn.digitaloceanspaces.com/Videos/yt5s.io-Frank%20Ocean%20-%20Nikes%20%5BLive%20at%20Way%20Out%20West%5D%20(10_08_17)-(1080p).mp4" 
            autoPlay 
            muted
          />
          <div className="headerOverlay">
            <div className="header_detail_container">

              <span className="header_title">Watch</span>

              {/* Header video description */}
              <div className="header_video_detail">
                <button>Watch</button>
                <span>Frank Ocean</span>
                <span>Live at MSG</span>
              </div>

              {/* Header video description */}
            {/* <div className="header_video_detail">
              <button onClick={ () => navigate( `video/${pageData?.headerFeatures[headerIndex].id}` )}>Watch</button>
              <span>{pageData ? pageData.headerFeatures[headerIndex].title : ''}</span>
              <span>{pageData ? pageData?.headerFeatures[headerIndex].author : ''}</span>
            </div> */}
            
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
            <span className="section_subheading">Music</span>
              <div className="section_item_container">
                  {
                      pageData &&
                      pageData.music.map( video => {
                        return <VideoItem key={video.id} {...video}/>
                    }) 
                  }
              </div>
            </section>

        </div>

    </div>
  )
}
