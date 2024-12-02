import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpclient  from '../httpclient'
import {  } from "./ObjectFormats";
import { AudioListItemPropType, storeSettingsType, userSettingsType, userUpdateDataType } from "./ObjectTypes";
import axios from "axios";


type PlayerState = {
    nowPlaying: AudioListItemPropType,
    queue: [AudioListItemPropType],
    player: {
        isPlaying: boolean
    }
}
const initialState = {
    nowPlaying: <AudioListItemPropType>({}),
    queue: [],
    player: {
        isPlaying: false
    }

}

const playTrack = createAsyncThunk('mediaPlayer/playTrack', (track: AudioListItemPropType ) => {     
    return track 
})
const playNextTrack = createAsyncThunk('mediaPlayer/playNextTrack', () => {
    console.log( 'PLAYING NEXT TRACK')
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
            const player = document.getElementById('audioPlayer')

            if ( state.queue.length > 0){
                state.nowPlaying = state.queue.pop()
                player.src = 'https://prophile.nyc3.cdn.digitaloceanspaces.com/audio/' + state.nowPlaying.audioURL + '.mp3'
            }
            return
        }


    },
    extraReducers: (builder: any) => {
        builder.addCase(playTrack.fulfilled, (state: PlayerState, action: any) => {

            console.log( action.payload )
            const player = document.getElementById('audioPlayer')
            player.src = 'https://prophile.nyc3.cdn.digitaloceanspaces.com/audio/' + action.payload.audioURL + '.mp3'
            player.play()
            state.player.isPlaying = true

            state.nowPlaying = action.payload

        }),
        builder.addCase(playNextTrack.fulfilled, (state: PlayerState, action: any) => {
            
        })
    }
})

export const audioPlayer = AudioPlayer.reducer
export const play = playTrack
export const next = playNextTrack
export const  {togglePlayer, addToQueue, playNext } = AudioPlayer.actions