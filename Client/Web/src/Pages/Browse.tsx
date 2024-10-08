import React, { useEffect, useState } from 'react'
import '../styles/Browser.css'
import AudioItem from '../Components/AudioItem'
import UserAvi from '../Components/UserAvi'
import axios from 'axios'

function Search(){
    return(
        <>
        
        </>
    )
}


export default function Browse() {

    const [searchQuery, setSearchQuery ] = useState('')
    const [filter, setFilter ] = useState('All')


  return (
    <div className='page_container browserContainer '>

        <input onChange={(e) => { setSearchQuery(e.target.value)}} type="text" placeholder='Search' />

        {
            searchQuery.length > 0 ? 
            <>
                <div className="search_filter_container">
                    <span>Filter</span>
                    <ul>
                        <li style={ filter == 'All' ? {borderBottom: '1px solid rgb(198, 161, 104)'} : {}}
                        onClick={(e) => setFilter(e.currentTarget.innerHTML)}>All</li>
                        <li style={ filter == 'User' ? {borderBottom: '1px solid rgb(198, 161, 104)'} : {}}
                        onClick={(e) => setFilter(e.currentTarget.innerHTML)}>User</li>
                        <li style={ filter == 'Video' ? {borderBottom: '1px solid rgb(198, 161, 104)'} : {}}
                        onClick={(e) => setFilter(e.currentTarget.innerHTML)}>Video</li>
                        <li style={ filter == 'Album' ? {borderBottom: '1px solid rgb(198, 161, 104)'} : {}}
                        onClick={(e) => setFilter(e.currentTarget.innerHTML)}>Album</li>
                        <li style={ filter == 'Podcast' ? {borderBottom: '1px solid rgb(198, 161, 104)'} : {}}
                        onClick={(e) => setFilter(e.currentTarget.innerHTML)}>Podcast</li>
                        <li style={ filter == 'Playlist' ? {borderBottom: '1px solid rgb(198, 161, 104)'} : {}}
                        onClick={(e) => setFilter(e.currentTarget.innerHTML)}>Playlist</li>
                    </ul>
                </div>            
                <h1>Search: <span>{searchQuery}</span></h1>

            </>
            :

            <>
                <h1>Browse</h1>
                <div className='catagory_browser_container' >
                    <div className='catagory_browser_item' style={{backgroundImage: `url(l_RiiEHQmsBGeqHMNFw5VH632eeb-r8JE4L7i0LnXaU.jpg)`}}>
                        <div className='catagory_browser_item_overlay'>Music</div>
                    </div>
                    <div className='catagory_browser_item' style={{backgroundImage: `url(mic.webp)`}}>
                        <div className='catagory_browser_item_overlay'>Podcast</div>
                    </div>
                    <div className='catagory_browser_item' style={{backgroundImage: `url(hq720.jpg)`}}>
                        <div className='catagory_browser_item_overlay'>Video</div>
                    </div>
                    <div className='catagory_browser_item' style={{backgroundImage: `url(live.webp)`}}>
                        <div className='catagory_browser_item_overlay'>Live</div>
                    </div>
                    <div className='catagory_browser_item' style={{backgroundImage: `url(lifestyle.jpg)`}}>
                        <div className='catagory_browser_item_overlay'>Lifestyle</div>
                    </div>
                    <div className='catagory_browser_item' style={{backgroundImage: `url(sports.jpeg)`}}>
                        <div className='catagory_browser_item_overlay'>Sports</div>
                    </div>
                    <div className='catagory_browser_item' style={{backgroundImage: `url(commentary.jpg)`}}>
                        <div className='catagory_browser_item_overlay'>Commentary</div>
                    </div>
                    <div className='catagory_browser_item' style={{backgroundImage: `url(education.jpeg)`}}>
                        <div className='catagory_browser_item_overlay'>Education</div>
                    </div>
                    <div className='catagory_browser_item' style={{backgroundImage: `url(news.jpeg)`}}>
                        <div className='catagory_browser_item_overlay'>News</div>
                    </div>
                </div>

                <section>
                    <h1>Search history</h1>

                    <div className='search_history_container h_list'>
                        <AudioItem {... 
                            {title: "DarkTimes",
                            author: "Vince Stales",
                            imageURL: "../darktimes.jpg"}}/>

                        <UserAvi {...{
                            username: '6lack',
                            imageURL: "6lack2.jpg"}}/>

                        <UserAvi {...{
                            username: "Tems",
                            imageURL: "6lack2.jpg"}}/>

                        <AudioItem {...{   
                            title: "Tyla",
                            author: "Tyla",
                            imageURL: "tyla.jpg"}}/>
                        <AudioItem {...{    
                            title: "Yes Lawd",
                            author: "NxWorries",
                            imageURL: "yeslawd.jpg"}}/>

                    </div>
                </section>
                
                <section>
                    <h1>Genres</h1>
                    <div className='genre_container'>
                        <div className='genre_item'>Hip-Hop</div>
                        <div className='genre_item'>R&B</div>
                        <div className='genre_item'>Neo Soul</div>
                        <div className='genre_item'>Rap</div>
                        <div className='genre_item'>Jazz</div>
                        <div className='genre_item'>Soul</div>
                        <div className='genre_item'>Afro Beats</div>
                        <button className='genre_item_more_button'>More</button>
                    </div>
                </section>

                <section>
                    <h1>Creators</h1>
                    <div className='h_list'>
                        <UserAvi {...{
                            username: '6lack',
                            imageURL: "6lack2.jpg"}}/>

                        <UserAvi {...{
                            username: '6lack',
                            imageURL: "6lack2.jpg"}}/>


                        <UserAvi {...{
                            username: '6lack',
                            imageURL: "6lack2.jpg"}}/>


                        <UserAvi {...{
                            username: '6lack',
                            imageURL: "6lack2.jpg"}}/>


                        <UserAvi {...{
                            username: '6lack',
                            imageURL: "6lack2.jpg"}}/>

                        <UserAvi {...{
                            username: '6lack',
                            imageURL: "6lack2.jpg"}}/>
                    </div>
                </section>

                <section>
                    <h1>playlists</h1>
                    <div className='h_list'>
                        <AudioItem {... 
                            {title: "DarkTimes",
                            author: "Vince Stales",
                            imageURL: "../darktimes.jpg"}}/>
                    
                        <AudioItem {... 
                            {title: "DarkTimes",
                            author: "Vince Stales",
                            imageURL: "../darktimes.jpg"}}/>

                        <AudioItem {... 
                            {title: "DarkTimes",
                            author: "Vince Stales",
                            imageURL: "../darktimes.jpg"}}/>

                        <AudioItem {... 
                            {title: "DarkTimes",
                            author: "Vince Stales",
                            imageURL: "../darktimes.jpg"}}/>

                    </div>
                </section>
            </>
        }

    </div>
  )
}
