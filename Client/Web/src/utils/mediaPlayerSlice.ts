import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpclient  from '../httpclient'
import {  } from "./ObjectFormats";
import { AudioItemPropType, AudioListItemPropType, storeSettingsType, userSettingsType, userUpdateDataType } from "./ObjectTypes";
import axios from "axios";


type PlayerState = {
    nowPlaying: AudioListItemPropType,
    queue: [AudioListItemPropType],
    upnext: [AudioListItemPropType],
    player: {
        isPlaying: boolean
    },
    audioHistory: [AudioListItemPropType],
    savedTracks: [AudioListItemPropType]
}
const initialState: PlayerState = {
    nowPlaying: <AudioListItemPropType>({}),
    queue: [],
    upnext: [],
    player: {
        isPlaying: false
    },
    audioHistory: [],
    savedTracks: [<AudioListItemPropType>{}]
} 

const playTrack = createAsyncThunk('mediaPlayer/playTrack',  async (track: AudioListItemPropType ) => {     

    // Register track in listening history
    try{
        await httpclient.post(`http://127.0.0.1:5000/listen?audio_id=${track.id}`, )
    }
    catch( err ){
        console.log( err)
    }

    return track
})



const playNextTrack = createAsyncThunk('mediaPlayer/playNextTrack', async (queue: [AudioListItemPropType]) => {
        // console.log( queue )
    try{
        await httpclient.post(`http://127.0.0.1:5000/listen?audio_id=${queue[0].id}`, )
    }
    catch( err ){
        console.log( err)
    }

    return
})

const populatePlayer = createAsyncThunk('mediaPlayer/playRandomTrack', async () => {
    try{
        const response = await httpclient.get('http://127.0.0.1:5000/listen/random')
        return response.data
    }
    catch( error ){
        console.log( error )
    }

})

export const AudioPlayer = createSlice({
    name: 'audioPlayer',
    initialState,
    reducers: {
        togglePlayer: (state, action ) => {

            const player = document.getElementById('audioPlayer') as HTMLAudioElement

            if( player.src == '' ) return

            if( state.player.isPlaying){
                state.player = {
                        ...state, 
                        isPlaying: false
                }
                player?.pause!()
            }
            else{
                state.player = {
                    ...state, 
                    isPlaying: true
                }
                player?.play()
            }
            
        },
        addToQueue: ( state, action ) => {

            if ( action.payload.length > 1) {

                if(state.queue.length > 0) {
                    const queue = [...state.queue ]
                    
                    for (const i in action.payload){
                        
                        queue.push(action.payload[i])
                    }

                    return state = {
                        ...state, 
                        queue: queue
                    }
                }


                return state = {
                    ...state, 
                    queue: action.payload
                }
            }

            state.queue.push(action.payload)
        },
        addToPlayNext: ( state, action ) => {

            console.log( action.payload )

            const player: HTMLAudioElement = document.getElementById('audioPlayer') as HTMLAudioElement
            
            const upnext: [AudioListItemPropType] = [...action.payload] as [AudioListItemPropType]
            const track: AudioListItemPropType = upnext.shift() as AudioListItemPropType

            // try{
            //     httpclient.post(`http://127.0.0.1:5000/listen?audio_id=${track.id}`)
            // }
            // catch( err ){
            //     // console.log( err)
            // }
            
            player!.src = track.contenturl as string

            state.player.isPlaying = true
            state.nowPlaying = track 
            state.upnext = upnext
        },

        playNext: ( state, action ) => {

            const player: HTMLAudioElement = document.getElementById('audioPlayer') as HTMLAudioElement

            if( state.upnext.length > 0){
                
                const upnext: [AudioListItemPropType] = [...state.upnext] as [AudioListItemPropType]
                const track: AudioListItemPropType = upnext.shift() as AudioListItemPropType
                
                // try{
                //     httpclient.post(`http://127.0.0.1:5000/listen?audio_id=${track.id}`)
                // }
                // catch( err ){
                //     console.log( err)
                // }
                
                player!.src = track.contenturl as string

                state.nowPlaying = track 
                state.upnext = upnext

                if( !state.player.isPlaying) state.player.isPlaying = true

            }
            else if ( state.queue.length > 0){
                
                const queue: [AudioListItemPropType] = [...state.queue] as [AudioListItemPropType]
                const track: AudioListItemPropType = queue.shift() as AudioListItemPropType
                
                try{
                    httpclient.post(`http://127.0.0.1:5000/listen?audio_id=${track.id}`)
                }
                catch( err ){
                    console.log( err)
                }
                
                player!.src = 'https://prophile.nyc3.cdn.digitaloceanspaces.com/audio/' + track.audioURL + '.mp3'

                if( player.paused == true && state.player.isPlaying == false ){
                    state.player.isPlaying = true
                    player.play() 
                }

                state.nowPlaying = track 
                state.queue = queue
                
                return
            }
            
        },
        // setAudioHistory: (state, action) => {
        //     return state = {
        //         ...state, audioHistory: action.payload
        //     }
        // },
        clearQueue: ( state ) => {
            state.queue = []
        },
        setSavedTracks: (state, action ) => {
            console.log( 'settings media', action.payload)
            state.savedTracks  = action.payload
        },
    },
    extraReducers: (builder: any) => {
        builder.addCase(playTrack.fulfilled, (state: PlayerState, action: any) => {

            const queue = [...state.queue] 
            const upnext = [...state.upnext] 
            
            upnext.map( (item, index) => {
                if( item.id == action.payload.id){
                    upnext.splice(0, index+1)

                    state.upnext = upnext
                    return 
                }
                    
            })
            
            queue.map( (item, index) => {
                if( item.id == action.payload.id){
                    queue.splice(0, index+1)

                    state.queue = queue
                    return 
                }
                    
            })
            
            const player: HTMLAudioElement = document.getElementById('audioPlayer') as HTMLAudioElement
            
            player.src = action.payload.contenturl
            player.play()

            state.player.isPlaying = true
            state.nowPlaying = action.payload

        }),
        builder.addCase(populatePlayer.fulfilled, (state: PlayerState, action: any) => {
            console.log( action.payload)

            const player: HTMLAudioElement = document.getElementById('audioPlayer') as HTMLAudioElement

            player.src = 'https://prophile.nyc3.cdn.digitaloceanspaces.com/audio/' + action.payload.audioURL + '.mp3'
            player.play()
            state.player.isPlaying = true

            state.nowPlaying = action.payload
        })
    }
})

export const audioPlayer = AudioPlayer.reducer
export const play = playTrack
export const next = playNextTrack
export const populateAudioPlayer = populatePlayer
export const  {
    togglePlayer, 
    addToQueue, 
    playNext, 
    // setAudioHistory, 
    addToPlayNext, 
    clearQueue,
    setSavedTracks } = AudioPlayer.actions