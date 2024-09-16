import React from 'react'

export default function Watch() {
  return (
    <div className='page_container'>
        <header style={{"backgroundImage": "url(frank-ocean-pyramids-the-heartbeat-life-2.jpg"}}>
        <div className="headerOverlay">
          <span className="header_title">Watch</span>
          {/* Floating video Progressbar */}
          <div className="header_progress_bar_container">
            <div className="header_progress_bar"></div>
          </div>
          {/* Header video description */}
          <div className="header_video_detail">
            <button>Watch</button>
            <span>Frank Ocean</span>
            <span>Pyramids</span>
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
