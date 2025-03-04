import React, { useEffect, useState } from 'react'
import Trackstrip from '../../Components/TrackStrip'
import AudioItem from '../../Components/AudioItem'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import { AudioItemPropType, AudioListItemPropType } from '../../utils/ObjectTypes'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../utils/store'
import { play } from '../../utils/mediaPlayerSlice'

type listenPageDataType = {
    featured: [AudioItemPropType],
    new: [AudioListItemPropType],
    trending: [AudioItemPropType],
    genres: {
        alternative: [AudioItemPropType],
        rnb: [AudioItemPropType],
        hiphop: [AudioItemPropType]
    },
    playlists: [AudioItemPropType]
}
export default function Listen() {

    const [pageData, setPageData ] = useState<listenPageDataType>()
    const navigate = useNavigate()
    const [featureIndex, setFeatureIndex ] = useState(0)

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/listen')
        .then( response => {
            setPageData( response.data )
            console.log( response.data)
        })
    },[])

    useEffect(() => {
        setTimeout(() => {
            if( featureIndex == pageData?.featured.length-1 ){
                setFeatureIndex(0)
                return
            }

            setFeatureIndex(featureIndex+1)
        }, 10000);
    },[featureIndex])

  return (
    <div className="page_container">
        <div className='listen_page_header' style={{backgroundImage: `url(https://prophile.nyc3.cdn.digitaloceanspaces.com/images/${pageData?.featured[featureIndex].imageURL}.jpg`}}>
            <div className="listen_page_header_overlay">
                    <div className='header_feature'>
                        
                        <div className='listen_header_track_detail_container'>
                            <span>Feature Release</span>
                            <span className='track_title'>{pageData?.featured[featureIndex].title}</span>
                            <span className='track_author'>{pageData?.featured[featureIndex].author}</span>
                            <button onClick={() => navigate(`/playlist/${pageData?.featured[featureIndex].id}`)} className='track_cta'>Go to Album</button>
                        </div>    

                    </div>
                <div/>
                <div className="paginationButtonContainer">
                    <div className="paginationBtns">
                        {
                            pageData?.featured.map((item, index) => {
                                return <div className="paginationBtn"
                                        onClick={() => (setFeatureIndex(index))}
                                        style={featureIndex == index ? {backgroundColor: 'rgba(198, 161, 104,1)'} : {}}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>

    <div className='listen_page_container'>
        
        <section>
            <h1>New For you</h1>
            <div className='h_list' style={{'justifyContent': 'space-between'}}>
                
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
                    return <Trackstrip {...track}/>
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
            <h1>Playlists</h1>
            <div className='h_list'>
                {
                    pageData?.playlists.map( (item, index) => {
                        return <AudioItem {...item} key={index}/>
                    })
                }

            </div>
        </section>
    </div>
    </div>

  )
}
