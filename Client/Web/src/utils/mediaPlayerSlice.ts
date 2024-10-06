import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpclient  from '../httpclient'
import {  } from "./ObjectFormats";
import { AudioListItemPropType, storeSettingsType, userSettingsType, userUpdateDataType } from "./ObjectTypes";
import axios from "axios";


const initialState = {
    nowPlaying: <AudioListItemPropType>({}),
    queue: [],
    player: {
        isPlaying: false,
        duration: 0,
    }

}

const playTrack = createAsyncThunk('mediaPlayer/actions', (track: AudioListItemPropType ) => {     
    return track 
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
            
        }

    },
    extraReducers: (builder: any) => {
        builder.addCase(playTrack.fulfilled, (state: any, action: any) => {

            console.log( action.payload )
            const player = document.getElementById('audioPlayer')
            player.src = 'https://prophile.nyc3.cdn.digitaloceanspaces.com/audio/' + action.payload.audioURL + '.mp3'
            player.play()
            state.player.isPlaying = true

            console.log( action.payload)
            state.nowPlaying = action.payload
            // console.log(action.payload )
            // console.log( state.nowPlaying)
        })
    }
})

export const audioPlayer = AudioPlayer.reducer
export const play = playTrack
export const  {togglePlayer } = AudioPlayer.actions