import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpclient  from '../httpclient'

const initialState = {
    message: undefined,
    isShown: false
}

export const NotificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        showNotification: ( state, action) => {
            state.message = action.payload
            state.isShown = true
        },
        hideNotification: ( state) => {
            state.isShown = false
        }
    },

    extraReducers: ( builder: any ) => {
    }
})

export const { showNotification, hideNotification } =  NotificationSlice.actions
export const notifications = NotificationSlice.reducer
