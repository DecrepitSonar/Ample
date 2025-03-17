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

const subscribe = createAsyncThunk('library/subscriptions', async (props) => {
    await httpclient.post('http://127.0.0.1:5000/save', props)
})

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

            state.library = action.payload
            
            state.library.map( item => {
                switch( item.type){
                    case 'Artist':
                        if (state.Subscriptions.find( storedItem => item.id == storedItem.id)) return 
                        state.Subscriptions.push( item )
                        break;
                    case 'Track':
                        if (state.Tracks.find( storedItem => item.id == storedItem.id)) return 
                        state.Tracks.push( item )
                        break;
                    case 'Album':
                        if (state.Albums.find( storedItem => item.id == storedItem.id)) return 
                        state.Albums.push( item )
                        break;
                    case 'Video':
                        if (state.Videos.find( storedItem => item.id == storedItem.id)) return
                        state.Videos.push( item )
                        break;
                    default: 
                        return
                }
            })
            console.log( state.library)
        }
    },
    extraReducers: ( builder: any ) => {
        builder.addCase(saveItem.fulfilled, ( state: LibraryStatePropType, action: any) => {}),
        builder.addCase(subscribe.fulfilled, (state: LibraryStatePropType, action: any) => {})
    }
})

export const library = librarySlice.reducer
export const handleSubscription = subscribe
export const { setLibraryItems } = librarySlice.actions