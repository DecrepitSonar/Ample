import { configureStore } from '@reduxjs/toolkit'
import { auth } from './Authslice'
import { useDispatch } from 'react-redux'
import { settings } from './settingsSlice'
import { audioPlayer } from './mediaPlayerSlice'
import { library } from './librarySlice'
import { notifications } from './notificationSlice'
import { dashboard } from './dashboardSlice'

export const store = configureStore({
    reducer: { 
        auth, 
        settings,
        audioPlayer,
        library,
        notifications,
        dashboard
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 