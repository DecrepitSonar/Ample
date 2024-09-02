import { configureStore } from '@reduxjs/toolkit'
import { auth } from './Authslice'
import { useDispatch } from 'react-redux'
import { settings } from './settingsSlice'

export const store = configureStore({
    reducer: { auth, settings }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 