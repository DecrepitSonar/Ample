import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpclient  from '../httpclient'
import {  } from "./ObjectFormats";
import { storeSettingsType, userSettingsType, userUpdateDataType } from "./ObjectTypes";

const initialState: storeSettingsType = {
    userSettings: <userSettingsType>({}),
}


const updateSettings = createAsyncThunk("settting/update", async (data: FormData) => {

    return await httpclient.put("http://127.0.0.1:5000/updateSettings", data)
    .then( response => { return response })
})

export const SettingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {},
    extraReducers: ( builder: any ) => {
        builder.addCase( updateSettings.pending, (state: any, action: any ) => { console.log( 'pending ')})
        builder.addCase( updateSettings.rejected, (state: any, action: any) => { console.log( 'rejected ')})
        builder.addCase( updateSettings.fulfilled, (state: any, action: any ) => { console.log( 'fullfilled')})
    }
})

export const settings = SettingsSlice.reducer
export const updatePreferences = updateSettings