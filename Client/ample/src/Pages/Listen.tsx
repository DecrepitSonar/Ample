import React from 'react'
import '../styles/listen.css'
import AudioItem from '../Components/AudioItem'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { AudioItemPropType } from '../utils/ObjectTypes'

function TrackStrip(props: AudioItemPropType){
    return(
        <div className='small_list_item_container'>
            <div className='small_list_item_image' style={{backgroundImage: `url(${props.imageURL})`}}/>
            <div className='small_list_item_detail_container'>
                <span>{props.title}</span>
                <span>{props.author}</span>
            </div>
            <button className='ellipsis_button'><HiEllipsisHorizontal/></button>
        </div>
    )
}
export default function Listen() {

    const tracks = [
        {
            title: "KeepHer (feat. Thundercat)",
            author: "NxWorries, Anderson. Paak, Knowledge",
            imageURL: "whylawd.jpg"
        },
        {
            title: "KeepHer (feat. Thundercat)",
            author: "NxWorries, Anderson. Paak, Knowledge",
            imageURL: "whylawd.jpg"
        },{
            title: "KeepHer (feat. Thundercat)",
            author: "NxWorries, Anderson. Paak, Knowledge",
            imageURL: "whylawd.jpg"
        },{
            title: "KeepHer (feat. Thundercat)",
            author: "NxWorries, Anderson. Paak, Knowledge",
            imageURL: "whylawd.jpg"
        },{
            title: "KeepHer (feat. Thundercat)",
            author: "NxWorries, Anderson. Paak, Knowledge",
            imageURL: "whylawd.jpg"
        },{
            title: "KeepHer (feat. Thundercat)",
            author: "NxWorries, Anderson. Paak, Knowledge",
            imageURL: "whylawd.jpg"
        },{
            title: "KeepHer (feat. Thundercat)",
            author: "NxWorries, Anderson. Paak, Knowledge",
            imageURL: "whylawd.jpg"
        },{
            title: "KeepHer (feat. Thundercat)",
            author: "NxWorries, Anderson. Paak, Knowledge",
            imageURL: "whylawd.jpg"
        }
    ]
  return (
    <>
        <div className='listen_page_header' style={{backgroundImage: 'url(whylawd.jpg'}}>
            <div className="listen_page_header_overlay">
                    <div className='header_feature'>
                        
                        <div className='listen_header_track_detail_container'>
                            <span>Feature Release</span>
                            <span className='track_title'>Yes Lawd!!</span>
                            <span className='track_author'>NxWorries</span>
                            <button className='track_cta'>Go to Album</button>
                        </div>    

                        <div className='listen_header_track_image' style={{backgroundImage: 'url(whylawd.jpg'}}/>
                    </div>
                <div/>
            </div>
        </div>

    <div className='listen_page_container'>
        
        <section>
            <h1>New For you</h1>
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
            <div className="dual_list_collection">

                {tracks.map( track => {
                    return <TrackStrip {...track}/>
                })}

            </div>
                
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
    </>
  )
}
