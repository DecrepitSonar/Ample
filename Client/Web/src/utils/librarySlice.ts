import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpclient  from '../httpclient'
import {  } from "./ObjectFormats";
import { storeSettingsType, PaymentSettings } from "./ObjectTypes";

type LibraryStatePropType = {
    
}
const initialState: storeSettingsType = {
    paymentSettings: <LibraryStatePropType>({})
}

export const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {},
    extraReducers: ( builder: any ) => {}
})

export const library = librarySlice.reducer