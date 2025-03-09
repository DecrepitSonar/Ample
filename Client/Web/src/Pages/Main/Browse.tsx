import React, { useEffect, useState } from 'react'
import '../../styles/Browser.css'
import AudioItem from '../../Components/AudioItem'
import UserAvi from '../../Components/UserAvi'
import axios from 'axios'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { AudioItemPropType, UserAviPropType, VideoItemPropType } from '../../utils/ObjectTypes'
import { useNavigate } from 'react-router-dom'
import VideoItem from '../../Components/VideoItem'
import { CgClose } from 'react-icons/cg'

function handleSearchHistory(propitem: any){

    var searchHistory = JSON.parse(localStorage.getItem('searchHistory'))

    if( searchHistory == null ){
        searchHistory = []
        searchHistory.push(propitem)

        localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
        
        return [searchHistory]
    }

    console.log( searchHistory )

    const itemIndex = (searchHistory.findIndex((item) => item.id == propitem.id ))
    console.log( itemIndex )

    if( itemIndex >= 0  ){
        const removedItem = searchHistory.slice(itemIndex, itemIndex+1)
        searchHistory = searchHistory.toSpliced(itemIndex, 1)
        
        console.log( searchHistory)

        searchHistory.unshift(removedItem[0]) 

        localStorage.setItem('searchHistory', JSON.stringify(searchHistory))

    }
    else{
        searchHistory.unshift(propitem)
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
    }

    return searchHistory

}

type searchResultProps = {
    searchItem: any,
    historyFunc: Function
}
const UserSearchResultSection = (props: searchResultProps) => {
    const navigate = useNavigate()

    const item = props.searchItem as UserAviPropType
    const updateSearchHistory = props.historyFunc

    const handleSearchSelection = () => {   
        updateSearchHistory(handleSearchHistory(item))
        navigate(`/user/${item.id}`, {state: item, preventScrollReset: true})
        console.log(item)
    }

    return(
        <div className="search_section" onClick={(e) => handleSearchSelection() }>
            <img className="section_avi" src={`https://prophile.nyc3.digitaloceanspaces.com/images/${item.imageURL}.jpg`}/>
            <div className="section_detail">
                <div className="detail">    
                    <span>User</span>
                    <span>{item.name}</span>
                </div>
                <button><HiEllipsisHorizontal/></button>
                </div>
        </div>
    )
}

const AlbumSearchResultSection = (props: searchResultProps) => {
    const navigate = useNavigate() 

    const item = props.searchItem as AudioItemPropType
    const searchHistory = props.historyFunc

    function handleSelection(){
        navigate(`/playlist/${item.id}`)
        console.log( item )
        searchHistory(handleSearchHistory(item))
    }

    return(
        <div className="search_section" onClick={() => handleSelection()}>
            <img className="section_album_cover" src={`https://prophile.nyc3.digitaloceanspaces.com/images/${item.imageURL}.jpg`}/>
            <div className="section_detail">
                <div className="detail">
                    <span>{item.type}</span>
                    <span>{item.title}</span>
                    <span>{item.name}</span>
                </div>
                <button><HiEllipsisHorizontal/></button>
            </div>
            
        </div>
    )
}
const VideoSearchResultSection = (props: VideoItemPropType) => {
    const navigate = useNavigate()
    return(
        <div className="search_section" onClick={() => navigate(`/video/${props.id}`)}>
            <img className="section_video_cover" src={`https://prophile.nyc3.digitaloceanspaces.com/images/${props.imageURL}.jpg`}/>
            <div className="section_detail">
                <div className="detail">
                    <span>{props.type}</span>
                    <span>{props.title}</span>
                    <span>{props.channel != undefined ? props.channel : props.artist}</span>
                </div>
                <button><HiEllipsisHorizontal/></button>
            </div>
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

        const props: searchResultProps = {
            historyFunc: setsearchHistory,
            searchItem: item
        }

        switch( item.type){
            case 'Artist': 
                return <UserSearchResultSection {...props}/>
            break
            case 'Album': 
                return <AlbumSearchResultSection {...props}/>
            break
            case "Single":
                return <AlbumSearchResultSection {...props}/>
            case 'playlist': 
                return <AlbumSearchResultSection {...props}/>

            case 'music':
                return <VideoSearchResultSection {...props}/>

            case 'podcast':
                return <VideoSearchResultSection {...props}/>
            break
            default: 
                return 'All'
        }

    }

    const clearSearchHistory = () => {
        localStorage.removeItem('searchHistory')
        setsearchHistory([])
    }

    useEffect(()=> {
        if (localStorage.getItem('searchHistory') != null) {
            setsearchHistory(JSON.parse(localStorage.getItem('searchHistory')))
        }
    },[localStorage.length])

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

                {
                    searchResults ?
                        searchResults.length > 0 ? 
                            <>
                                <div className="resultsContainer">
                                    {
                                        searchResults.map( (item: any) => {
                                            return handleResultComponent(item)
                                        })
                                    }
                                </div> 
                            </> : 
                            <>
                            <section>
                                <div className="section_header recent_search_section">
                                    <h1>Recent</h1>
                                    <button onClick={() => clearSearchHistory() }><CgClose/></button>
                                </div>
                                <div className='search_history_container h_list'>
                                {
                                    searchHistory.length > 1 ?
                                    searchHistory.map( item => { 
                                        return {
                                            'Artist' : <UserAvi username={ item.name } {...item} />,
                                            'Album' : <AudioItem {...item } />,
                                            'Video' : <VideoItem {...item } />,
                                        }[item.type]}
                                    )
                                    : <><span>No Recent Searches</span></>
                                }
                                </div>

                            </section>
                                <span> No result for "{ searchQuery}"</span>
                            </>
                : <span> Searching...</span> } 
            </>
            :

            <>
                <section>
                    <div className="section_header recent_search_section">
                        <h1>Recent</h1>
                        <button onClick={() => clearSearchHistory() }><CgClose/></button>
                    </div>

                    <div className='search_history_container h_list'>

                        {
                            searchHistory.length > 1 ?
                            searchHistory.map( item => {

                                const props: searchResultProps = {
                                    historyFunc: setsearchHistory,
                                    searchItem: item
                                }
                                return {
                                    'Artist' : <UserAvi {...item as UserAviPropType} />,
                                    'Album' : <AudioItem {...item as AudioItemPropType} />,
                                    'Video' : <VideoItem {...item as VideoItemPropType} />,
                                }[item.type]}
                            )
                            : <><span>No Recent Searches</span></>
                        }
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

            </>
        }

    </div>
  )
}
