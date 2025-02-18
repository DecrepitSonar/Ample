import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpclient  from '../httpclient'
import {  } from "./ObjectFormats";
import { storeSettingsType, PaymentSettings } from "./ObjectTypes";

const initialState: storeSettingsType = {
    paymentSettings: <PaymentSettings>({})
}

const updateSettings = createAsyncThunk("settings/update", async (data: FormData) => {
    return await httpclient.post("http://127.0.0.1:5000/settings", data ).then( response => { return response })
})

const getUserSettings = createAsyncThunk('settings', async () => {
    return await httpclient.get('http://127.0.0.1:5000/settings').then( response => { return response })
})
export const SettingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {},
    extraReducers: ( builder: any ) => {
        builder.addCase( updateSettings.pending, (state: any, action: any ) => { console.log( 'pending ')})
        builder.addCase( updateSettings.rejected, (state: any, action: any) => { console.log( 'rejected ')})
        builder.addCase( updateSettings.fulfilled, (state: any, action: any ) => { console.log( 'fullfilled')})

        builder.addCase( getUserSettings.pending, (state: any, actions: any) => ( console.log( "pending")))
        builder.addCase( getUserSettings.rejected, (state: any, actions: any) => ( console.log( "rejected")))
        builder.addCase( getUserSettings.fulfilled, (state: any, actions: any) => ( console.log( "fultilled")))
    }
})

export const settings = SettingsSlice.reducer
export const updatePreferences = updateSettings 
export const getSettings = getUserSettings