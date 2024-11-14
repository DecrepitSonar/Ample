import React from 'react'

export default function Watch() {
  return (
    <div className='page_container'>
      <header>
        <video 
          className="video_header" 
          src="https://prophile.nyc3.cdn.digitaloceanspaces.com/Videos/yt5s.io-Frank%20Ocean%20-%20Nikes%20%5BLive%20at%20Way%20Out%20West%5D%20(10_08_17)-(1080p).mp4" 
          autoPlay 
          muted
        />
        <div className="headerOverlay">
          <div className="header_detail_container">

            <span className="header_title">Live Now</span>

            {/* Header video description */}
            <div className="header_video_detail">
              <button>Watch</button>
              <span>Frank Ocean</span>
              <span>Live at MSG</span>
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
    </div>
  )
}
