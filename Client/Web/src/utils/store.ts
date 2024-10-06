import { configureStore } from '@reduxjs/toolkit'
import { auth } from './Authslice'
import { useDispatch } from 'react-redux'
import { settings } from './settingsSlice'
import { audioPlayer } from './mediaPlayerSlice'

export const store = configureStore({
    reducer: { 
        auth, 
        settings,
        audioPlayer }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 