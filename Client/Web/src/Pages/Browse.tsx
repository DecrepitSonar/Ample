import React, { useEffect, useState } from 'react'
import '../styles/Browser.css'
import AudioItem from '../Components/AudioItem'
import UserAvi from '../Components/UserAvi'
import axios from 'axios'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { UserAviPropType, VideoItemPropType } from '../utils/ObjectTypes'
import { useNavigate } from 'react-router-dom'


const UserSearchResultSection = (props: UserAviPropType) => {
    return(
        <div className="search_section">
            <img className="section_avi" src={`https://prophile.nyc3.digitaloceanspaces.com/images/${props.imageURL}.jpg`}/>
            <div className="section_detail">
                <span>User</span>
                <span>{props.name}</span>
            </div>
            <button><HiEllipsisHorizontal/></button>
        </div>
    )
}

const AlbumSearchResultSection = (props: VideoItemPropType) => {

    const navigate = useNavigate() 

    return(
        <div className="search_section" onClick={() => navigate(`/playlist/${props.id}`)}>
            <img className="section_album_cover" src={`https://prophile.nyc3.digitaloceanspaces.com/images/${props.imageURL}.jpg`}/>
            <div className="section_detail">
            <span>{props.type}</span>
                <span>{props.title}</span>
                <span>{props.name}</span>
            </div>
            <button><HiEllipsisHorizontal/></button>
        </div>
    )
}

const VideoSearchResultSection = (props: VideoItemPropType) => {
    const navigate = useNavigate()
    return(
        <div className="search_section" onClick={() => navigate(`/playlist/${props.id}`)}>
            <img className="section_video_cover" src={`https://prophile.nyc3.digitaloceanspaces.com/images/${props.imageURL}.jpg`}/>
            <div className="section_video_detail">
                <span>{props.title}</span>
                <span>{props.channel != undefined ? props.channel : props.artist}</span>
            </div>
            <button><HiEllipsisHorizontal/></button>
        </div>
    )
}
export default function Browse() {

    const [searchQuery, setSearchQuery ] = useState('')
    const [filter, setFilter ] = useState('All')
    const [searchResults, setResults] = useState([])
    const [searchHistory, setsearchHistory] = useState([])

    const handleSearchInput = (e: React.SyntheticEvent) => {

        const target = e.target as typeof e.target & {
            value: string 
        }

        setSearchQuery(target.value)

            axios.get(`http://127.0.0.1:5000/search?query=${target.value}&&filter=${filter}`)
            .then( response => {
                setResults( response.data )
                console.log( response.data)

            })

    }

    const handleFilter = (e: React.SyntheticEvent) => {
        setFilter(e.currentTarget.innerHTML)

        axios.get(`http://127.0.0.1:5000/search?query=${searchQuery}&&filter=${e.currentTarget.innerHTML}`)
        .then( response => {
            setResults( response.data )

        })
    }

    const handleResultComponent = (item) => {
        switch( item.type){
            case 'Artist': 
                return <UserSearchResultSection {...item}/>
            break
            case 'Album': 
                return <AlbumSearchResultSection {...item}/>
            break
            case "Single":
                return <AlbumSearchResultSection {...item}/>
            case 'playlist': 
                return <AlbumSearchResultSection {...item}/>

            case 'music':
                return <VideoSearchResultSection {...item}/>

            case 'podcast':
                return <VideoSearchResultSection {...item}/>
            break
            default: 
                return 'All'
        }

    }
  return (
    <div className='page_container browserContainer '>
        <h1>Search</h1>
        <input onInput={(e) => { handleSearchInput(e)}} type="text" placeholder='Search' />
        <div className="search_filter_container">
                    <span>Filter</span>
                    <ul>
                        <li style={ filter == 'All' ? {borderBottom: '1px solid rgb(198, 161, 104)'} : {}}
                        onClick={(e) => handleFilter(e)}>All</li>
                        <li style={ filter == 'User' ? {borderBottom: '1px solid rgb(198, 161, 104)'} : {}}
                        onClick={(e) => handleFilter(e)}>User</li>
                        <li style={ filter == 'Video' ? {borderBottom: '1px solid rgb(198, 161, 104)'} : {}}
                        onClick={(e) => handleFilter(e)}>Video</li>
                        <li style={ filter == 'Album' ? {borderBottom: '1px solid rgb(198, 161, 104)'} : {}}
                        onClick={(e) => handleFilter(e)}>Album</li>
                        <li style={ filter == 'Track' ? {borderBottom: '1px solid rgb(198, 161, 104)'} : {}}
                        onClick={(e) => handleFilter(e)}>Track</li>
                        <li style={ filter == 'Podcast' ? {borderBottom: '1px solid rgb(198, 161, 104)'} : {}}
                        onClick={(e) => handleFilter(e)}>Podcast</li>
                        <li style={ filter == 'Playlist' ? {borderBottom: '1px solid rgb(198, 161, 104)'} : {}}
                        onClick={(e) => handleFilter(e)}>Playlist</li>
                    </ul>
                </div>
        {
            searchQuery.length > 0 ? 
            <>            
                <h1>Results for: <span>{searchQuery}</span></h1>

                {searchResults ? 
                    <div className="resultsContainer">
                    {
                        searchResults.map( (item: any) => {
                            return handleResultComponent(item)
                        })
                    }
                    </div> :
                    <span> Searching...</span>
                }

            </>
            :

            <>
                <section>
                    <h1>Recent</h1>

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

                <h1>Catagories</h1>
                
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

            </>
        }

    </div>
  )
}
