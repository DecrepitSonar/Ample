import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpclient  from '../httpclient'

const initialState = {
    library: []
}


export const dashboardSlice = createSlice({
    name: 'dahboard',
    initialState,
    reducers: {},
    extraReducers: ( builder: any ) => {}
})

export const dashboard = dashboardSlice.reducer