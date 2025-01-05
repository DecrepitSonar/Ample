import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpclient  from '../httpclient'
import {  } from "./ObjectFormats";
import { AudioItemPropType, AudioListItemPropType, storeSettingsType, userSettingsType, userUpdateDataType } from "./ObjectTypes";
import axios from "axios";


type PlayerState = {
    nowPlaying: AudioListItemPropType,
    queue: [AudioListItemPropType],
    player: {
        isPlaying: boolean
    },
    audioHistory: [AudioListItemPropType]
}
const initialState: PlayerState = {
    nowPlaying: <AudioListItemPropType>({}),
    queue: [],
    player: {
        isPlaying: false
    },
    audioHistory: []
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

const savedItem = createAsyncThunk('mediaPlayer/savedItem', async (track: AudioListItemPropType ) => {
    try{
        await httpclient.post(`http://127.0.0.1:5000/save`, track)
    }
    catch( error ){
        console.log( error )
    }
    return 
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

export const AudioPlayer = createSlice({
    name: 'audioPlayer',
    initialState,
    reducers: {
        togglePlayer: (state, action ) => {

            const player = document.getElementById('audioPlayer')

            if( player.src == '' ) return

            if( state.player.isPlaying){
                state.player = {
                        ...state, 
                        isPlaying: false
                }
                player?.pause()
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
                    
                    
                    for (const i in action.payload){
                        state.queue.push(i)
                    }


                }

                return state = {
                    ...state, 
                    queue: action.payload
                }
            }

            state.queue.push(action.payload)
        },
        playPlaylist: ( state, action ) => {

            const player: HTMLAudioElement = document.getElementById('audioPlayer') as HTMLAudioElement
            
            const queue: [AudioListItemPropType] = [...action.payload] as [AudioListItemPropType]
            const track: AudioListItemPropType = queue.reverse().pop() as AudioListItemPropType

            try{
                httpclient.post(`http://127.0.0.1:5000/listen?audio_id=${track.id}`)
            }
            catch( err ){
                // console.log( err)
            }
            
            player!.src = 'https://prophile.nyc3.cdn.digitaloceanspaces.com/audio/' + track.audioURL + '.mp3'
            state.player.isPlaying = true
            state.nowPlaying = track 
            state.queue = queue.reverse() as [AudioListItemPropType]
            console.log( state.queue.length )
        },

        playNext: ( state, action ) => {

            const player: HTMLAudioElement = document.getElementById('audioPlayer') as HTMLAudioElement

            console.log( state.queue.length > 0  )
            if ( state.queue.length > 0){
                
                const queue: [AudioListItemPropType] = state.queue.reverse() as [AudioListItemPropType]
                const track: AudioListItemPropType = queue.pop() as AudioListItemPropType
                
                try{
                    httpclient.post(`http://127.0.0.1:5000/listen?audio_id=${track.id}`)
                }
                catch( err ){
                    console.log( err)
                }
                
                player!.src = 'https://prophile.nyc3.cdn.digitaloceanspaces.com/audio/' + track.audioURL + '.mp3'
                // player.play() 

                state.nowPlaying = track 
                state = {...state,
                    queue: queue.reverse() as [AudioListItemPropType]
                }
            }
            console.log( null )
        },
        setAudioHistory: (state, action) => {
            return state = {
                ...state, audioHistory: action.payload
            }
        },
        clearQueue: ( state ) => {
            state.queue = []
        }
    },
    extraReducers: (builder: any) => {
        builder.addCase(playTrack.fulfilled, (state: PlayerState, action: any) => {

            console.log( action.payload )
            
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
export const save = savedItem
export const  {
    togglePlayer, 
    addToQueue, 
    playNext, 
    setAudioHistory, 
    playPlaylist, 
    clearQueue } = AudioPlayer.actions