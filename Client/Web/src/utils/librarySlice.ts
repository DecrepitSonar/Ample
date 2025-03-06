import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpclient  from '../httpclient'
import {  } from "./ObjectFormats";
import { storeSettingsType, PaymentSettings, AudioListItemPropType, UserAviPropType, LibraryStatePropType } from "./ObjectTypes";


const initialState: LibraryStatePropType = {
    library: []
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
            state.library = action.payload
        }
    },
    extraReducers: ( builder: any ) => {
        builder.addCase(saveItem.fulfilled, ( state: LibraryStatePropType, action: any) => {
            
        })
    }
})

export const library = librarySlice.reducer
export const { setLibraryItems } = librarySlice.actions