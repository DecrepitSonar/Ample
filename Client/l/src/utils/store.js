import { configureStore } from '@reduxjs/toolkit'
import { auth } from './Authslice'

export const store = configureStore({
    reducer: { auth }
})

export const rootState = store.getState()