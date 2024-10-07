import React, { useEffect, useState } from 'react'
import '../styles/listen.css'
import AudioItem from '../Components/AudioItem'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { AudioItemPropType, AudioListItemPropType } from '../utils/ObjectTypes'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../utils/store'
import { play } from '../utils/mediaPlayerSlice'

function TrackStrip(props: AudioListItemPropType){
    const dispatch = useAppDispatch()

    return(
        <div className='small_list_item_container' onClick={() => dispatch(play(props))}>
            <img className='small_list_item_image' src={`https://prophile.nyc3.cdn.digitaloceanspaces.com/images/${props.imageURL}.jpg`}/>
            <div className='small_list_item_detail_container'>
                <span>{props.title}</span>
                <span>{props.name}</span>
            </div>
            <button className='ellipsis_button'><HiEllipsisHorizontal/></button>
        </div>
    )
}

type listenPageDataType = {
    featured: [AudioItemPropType],
    new: [AudioListItemPropType],
    trending: [AudioItemPropType],
    genres: {
        alternative: [AudioItemPropType],
        rnb: [AudioItemPropType],
        hiphop: [AudioItemPropType]
    }
}
export default function Listen() {

    const [pageData, setPageData ] = useState<listenPageDataType>()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/listen')
        .then( response => {
            setPageData( response.data )
            console.log( response.data)
        })
    },[])

  return (
    <>
        <div className='listen_page_header' style={{backgroundImage: `url(https://prophile.nyc3.cdn.digitaloceanspaces.com/images/${pageData?.featured[0].imageURL}.jpg`}}>
            <div className="listen_page_header_overlay">
                    <div className='header_feature'>
                        
                        <div className='listen_header_track_detail_container'>
                            <span>Feature Release</span>
                            <span className='track_title'>{pageData?.featured[0].title}</span>
                            <span className='track_author'>{pageData?.featured[0].author}</span>
                            <button onClick={() => navigate(`/playlist/${pageData?.featured[0].id}`)} className='track_cta'>Go to Album</button>
                        </div>    

                        <img className='listen_header_track_image' src={`https://prophile.nyc3.cdn.digitaloceanspaces.com/images/${pageData?.featured[0].imageURL}.jpg`}/>
                    </div>
                <div/>
            </div>
        </div>

    <div className='listen_page_container page_container'>
        
        <section>
            <h1>New For you</h1>
            <div className='h_list'>
                
                {
                    pageData?.new.map( item => {
                        return <AudioItem {...item}/>
                    })
                }
                    
            </div>
        </section>

        <section>
            <h1>Trending Songs</h1>
            <div className="dual_list_collection">

                {pageData?.trending.map( track => {
                    return <TrackStrip {...track}/>
                })}

            </div>
                
        </section>

        <section>
            <h1>New in Alternative</h1>
            <div className='h_list'>
                {
                    pageData?.genres.alternative.map( item => {
                        return <AudioItem {... item} />
                    })
                }
                    
            </div>
        </section>

        <section>
            <h1>New in R&B</h1>
            <div className='h_list'>
                {
                    pageData?.genres.rnb.map( item => {
                        return <AudioItem {... item}/>
                    })
                }

            </div>
        </section>

        <section>
            <h1>New in  Hip Hop</h1>
            <div className='h_list'>
                {
                    pageData?.genres.hiphop.map( item => {
                        return<AudioItem {...item}/>
                    })
                }                    
            </div>
        </section>
    </div>
    </>
  )
}
