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
            state.queue.push(action.payload)
        },
        playNext: ( state, action ) => {

            const player: HTMLAudioElement = document.getElementById('audioPlayer') as HTMLAudioElement

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

                state.nowPlaying = track 
                state = {...state,
                    queue: queue.reverse() as [AudioListItemPropType]
                }
            }
        },
        setAudioHistory: (state, action) => {
            console.log( action.payload )
            return state = {
                ...state, audioHistory: action.payload
            }
        },
        updateAudioHistory: (state, action ) => {

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
export const  {togglePlayer, addToQueue, playNext, setAudioHistory } = AudioPlayer.actions