import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpclient  from '../httpclient'
import {  } from "./ObjectFormats";
import { storeSettingsType, PaymentSettings, AudioListItemPropType, UserAviPropType, LibraryStatePropType, VideoItemPropType } from "./ObjectTypes";


const initialState: LibraryStatePropType = {
    library: [],
    Tracks: [],
    Albums: [],
    Videos: [],
    Subscriptions: [],

}

const saveItem = createAsyncThunk('library/saveItem', async (item: AudioListItemPropType ) => {
    try{
        await httpclient.post(`http://127.0.0.1:5000/save`, item)
    }
    catch( error ){
        console.log( error )
    }
})

export const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {
        setLibraryItems: (state, action) =>{
            action.payload.map( item => {
                switch( item.type){
                    case 'Artist':
                        state.Subscriptions.push( item)
                        break;
                    case 'Track':
                        state.Tracks.push( item)
                        break;
                    case 'Album':
                        state.Albums.push( item)
                        break;
                    case 'Video':
                        state.Videos.push( item)
                        break;
                    default: 
                        return
                }
            })
            state.library = action.payload
            console.log( state.library)
        }
    },
    extraReducers: ( builder: any ) => {
        builder.addCase(saveItem.fulfilled, ( state: LibraryStatePropType, action: any) => {
            
        })
    }
})

export const library = librarySlice.reducer
export const { setLibraryItems } = librarySlice.actions