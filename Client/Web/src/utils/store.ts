import { configureStore } from '@reduxjs/toolkit'
import { auth } from './Authslice'
import { useDispatch } from 'react-redux'
import { settings } from './settingsSlice'
import { audioPlayer } from './mediaPlayerSlice'
import { library } from './librarySlice'

export const store = configureStore({
    reducer: { 
        auth, 
        settings,
        audioPlayer,
        library
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 