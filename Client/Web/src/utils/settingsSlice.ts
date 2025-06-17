import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpclient  from '../httpclient'
import {  } from "./ObjectFormats";
import { 
    userSettings, 
    PaymentSettings, 
    UserAccountSettingsType 
} from "./ObjectTypes";

const initialState: userSettings = {
    accountSettings: <UserAccountSettingsType>({}),
    paymentSettings: <PaymentSettings>({})
}

const updateAccountSettings = createAsyncThunk("settings/account/update", async (data: FormData) => {
    return await httpclient.post("http://127.0.0.1:5000/profile/settings/account", data )
    .then( response => { return response })
})
const updateSecuritySettings = createAsyncThunk("settings/security", async (data: object) => {
    return await httpclient.post("http://127.0.0.1:5000/profile/settings/security", data )
    .then( response => { return response })
})
// const updateAccountSettings = createAsyncThunk("settings/account", async (data: FormData) => {
//     return await httpclient.post("http://127.0.0.1:5000/settings/account", data )
//     .then( response => { return response })
// })
// const updateAccountSettings = createAsyncThunk("settings/account", async (data: FormData) => {
//     return await httpclient.post("http://127.0.0.1:5000/settings/account", data )
//     .then( response => { return response })
// })
// const updateAccountSettings = createAsyncThunk("settings/account", async (data: FormData) => {
//     return await httpclient.post("http://127.0.0.1:5000/settings/account", data )
//     .then( response => { return response })
// })

const getAccountSettings = createAsyncThunk("settings/account", async () => {

    const storedSettings = window.localStorage.getItem('accountSettings')
    
    console.log(typeof(storedSettings) != undefined )
    console.log(typeof(storedSettings) == undefined )

    if(  typeof(storedSettings) == undefined){
        console.log( storedSettings )
            return JSON.parse(storedSettings!)
    }
    console.log( 'false ')
    window.localStorage.removeItem('accountSettings') 

    return await httpclient.get("http://127.0.0.1:5000/profile/settings/account" )
    .then( response => { return response })
})

const getPaymentSettings = createAsyncThunk('settings/payment', async () => {
    
    const storedSettings = window.localStorage.getItem('paymentSettings')
    console.log( storedSettings )

    if(  storedSettings != null){
            return JSON.parse(storedSettings)
    }

    return await httpclient.get('http://127.0.0.1:5000/profile/settings/payment')
    .then( response => { 
        console.log( response )
        return response })})

const getUserSettings = createAsyncThunk('settings', async () => {
    return await httpclient.get('http://127.0.0.1:5000/profile/settings')
    .then( response => { return response })
})

export const SettingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setAccountSettings: (state: userSettings, action: any) => {
            return state = {
                ...state, 
                accountSettings: action.payload
            }
        },

        setPaymentSettings: (state: userSettings, action: any) => {
            console.log( 'payload', action.payload )
            return state = {
                ...state, 
                paymentSettings: action.payload
            }
        }
    },
    extraReducers: ( builder: any ) => {

        builder.addCase( getUserSettings.pending, (state: userSettings, actions: any) => ( console.log( "pending")))
        builder.addCase( getUserSettings.rejected, (state: userSettings, actions: any) => ( console.log( "rejected")))
        builder.addCase( getUserSettings.fulfilled, (state: userSettings, actions: any) => ( console.log( "fultilled")))
        
        builder.addCase( getAccountSettings.pending, (state: userSettings, action: any) => ( console.log( "pending")))
        builder.addCase( getAccountSettings.rejected, (state: userSettings, action: any) => ( console.log( "rejected")))
        builder.addCase( getAccountSettings.fulfilled, (state: userSettings, action: any) => ( 
            action.payload != undefined && 
            window.localStorage.setItem('accountSettings', JSON.stringify(action.payload.data)) 
        ))
        
        builder.addCase( updateAccountSettings.pending, (state: userSettings, action: any ) => { console.log( 'pending ')})
        builder.addCase( updateAccountSettings.rejected, (state: userSettings, action: any) => { console.log( 'rejected ')})
        builder.addCase( updateAccountSettings.fulfilled, (state: userSettings, action: any ) => { console.log( 'fullfilled')})
        
        builder.addCase( updateSecuritySettings.pending, (state: userSettings, action: any ) => { console.log( 'pending ')})
        builder.addCase( updateSecuritySettings.rejected, (state: userSettings, action: any) => { console.log( 'rejected ')})
        builder.addCase( updateSecuritySettings.fulfilled, (state: userSettings, action: any ) => { console.log( 'fullfilled')})
        
        builder.addCase( getPaymentSettings.pending, (state: userSettings, action: any) => ( console.log( "pending")))
        builder.addCase( getPaymentSettings.rejected, (state: userSettings, action: any) => ( window.localStorage.removeItem('accountSettings') ))
        builder.addCase( getPaymentSettings.fulfilled, (state: userSettings, action: any) => (  action.payload != undefined && window.localStorage.setItem('paymenttSettings', JSON.stringify(action.payload.data)) ))
        
        // builder.addCase( getPaymentSettings.pending, (state: userSettings, action: any) => ( console.log( "pending")))
        // builder.addCase( getPaymentSettings.rejected, (state: userSettings, action: any) => ( window.localStorage.removeItem('accountSettings') ))
        // builder.addCase( getPaymentSettings.fulfilled, (state: userSettings, action: any) => (  action.payload != undefined && window.localStorage.setItem('paymenttSettings', JSON.stringify(action.payload.data)) ))
    }
})

export const { setAccountSettings, setPaymentSettings } =  SettingsSlice.actions
export const settings = SettingsSlice.reducer
export const updateAccountPreferences = updateAccountSettings 
export const updateSecurityPreferences = updateSecuritySettings  
export const getSettings = getUserSettings
export const getUserAccount = getAccountSettings
export const getUserPayments = getPaymentSettings