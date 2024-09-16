import React from 'react'
import '../styles/listen.css'
import AudioItem from '../Components/AudioItem'

export default function Listen() {
  return (
    <div className='listen_page_container'>
        <div className='listen_page_header' style={{backgroundImage: 'url(whylawd.jpg'}}>
            <div className="listen_page_header_overlay">
                <div className='listen_header_track_image' style={{backgroundImage: 'url(whylawd.jpg'}}/>
                <div className='listen_header_track_detail_container'>
                    <span>Feature Release</span>
                    <span className='track_title'>Yes Lawd!!</span>
                    <span className='track_author'>NxWorries</span>
                    <button className='track_cta'>Go to Album</button>
                </div>
            </div>
        </div>
        <section>
            <h3>New For you</h3>
            <div className='h_list'>
                <AudioItem {... 
                    {title: "Why Lawd",
                    author: "NxWorries",
                    imageURL: "../whylawd.jpg"}}/>

                <AudioItem {... 
                    {title: "Born in the wild",
                    author: "Tems",
                    imageURL: "../borninthewild.jpg"}}/>

                <AudioItem {... 
                    {title: "HEAVY",
                    author: "S.I.R.",
                    imageURL: "../heavy.jpeg"}}/>

                <AudioItem {... 
                    {title: "DarkTimes",
                    author: "Vince Stales",
                    imageURL: "../darktimes.jpg"}}/>
                
                <AudioItem {... 
                    {title: "TYLA",
                    author: "Tyla",
                    imageURL: "../tyla.jpg"}}/>
                    
            </div>
        </section>

        <section>
            <h1>Trending Songs</h1>
        </section>

        <section>
            <h1>New in Alternative</h1>
            <div className='h_list'>
                <AudioItem {... 
                    {title: "Why Lawd",
                    author: "NxWorries",
                    imageURL: "../whylawd.jpg"}}/>

                <AudioItem {... 
                    {title: "Born in the wild",
                    author: "Tems",
                    imageURL: "../borninthewild.jpg"}}/>

                <AudioItem {... 
                    {title: "HEAVY",
                    author: "S.I.R.",
                    imageURL: "../heavy.jpeg"}}/>

                <AudioItem {... 
                    {title: "DarkTimes",
                    author: "Vince Stales",
                    imageURL: "../darktimes.jpg"}}/>
                
                <AudioItem {... 
                    {title: "TYLA",
                    author: "Tyla",
                    imageURL: "../tyla.jpg"}}/>
                    
            </div>
        </section>

        <section>
            <h1>New in R&B</h1>
            <div className='h_list'>
                <AudioItem {... 
                    {title: "Why Lawd",
                    author: "NxWorries",
                    imageURL: "../whylawd.jpg"}}/>

                <AudioItem {... 
                    {title: "Born in the wild",
                    author: "Tems",
                    imageURL: "../borninthewild.jpg"}}/>

                <AudioItem {... 
                    {title: "HEAVY",
                    author: "S.I.R.",
                    imageURL: "../heavy.jpeg"}}/>

                <AudioItem {... 
                    {title: "DarkTimes",
                    author: "Vince Stales",
                    imageURL: "../darktimes.jpg"}}/>
                
                <AudioItem {... 
                    {title: "TYLA",
                    author: "Tyla",
                    imageURL: "../tyla.jpg"}}/>
                    
            </div>
        </section>

        <section>
            <h1>New in  Hip Hop</h1>
            <div className='h_list'>
                <AudioItem {... 
                    {title: "Why Lawd",
                    author: "NxWorries",
                    imageURL: "../whylawd.jpg"}}/>

                <AudioItem {... 
                    {title: "Born in the wild",
                    author: "Tems",
                    imageURL: "../borninthewild.jpg"}}/>

                <AudioItem {... 
                    {title: "HEAVY",
                    author: "S.I.R.",
                    imageURL: "../heavy.jpeg"}}/>

                <AudioItem {... 
                    {title: "DarkTimes",
                    author: "Vince Stales",
                    imageURL: "../darktimes.jpg"}}/>
                
                <AudioItem {... 
                    {title: "TYLA",
                    author: "Tyla",
                    imageURL: "../tyla.jpg"}}/>
                    
            </div>
        </section>
    </div>
  )
}
