import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpclient  from '../httpclient'
import { AuthValues } from "./ObjectFormats";
import { LoginFormType, stateAuthType, userAuthType } from "./ObjectTypes";
import { setSavedTracks } from "./mediaPlayerSlice";

const initialState: stateAuthType = {
    isLoggedIn: window.localStorage.getItem('user') ? true : false  , 
    user:  <userAuthType>({}),
    error: ''
}

const validateUser = createAsyncThunk('auth/validateUser', async () => {
    
    if ( window.localStorage.getItem('user') != undefined ){
        return JSON.parse(window.localStorage.getItem('user'))
    }

    return await httpclient.get('http://127.0.0.1:5000/validate')
    .then( response => {

        if (response.data.error == undefined){
            window.localStorage.setItem('user', JSON.stringify(response.data)) 
            return response 
        } 

        return response
        
    })
    .catch( response => {
        return response 
    })
    
})

const handleLogin = createAsyncThunk("auth/handleLogin", async (data: LoginFormType) => {
    return await httpclient.post("http://127.0.0.1:5000/login", data)
    .then( response => { 
        console.log( response )
        return response })
})

const handleRegister = createAsyncThunk("auth/register", async (data: object) => { 
    return await httpclient.post("http://127.0.0.1:5000/register", data)
    .then( response => { 
        console.log( response )
        return response })
})

const handleUserDetails = createAsyncThunk("auth/details", async (data: object) => {
    return await httpclient.post('http://127.0.0.1:5000/register/details', data)
    .then( response => { console.log( response )})
    .catch( error => console.log( error ))
})

const handleLogout = createAsyncThunk('auth/logout', async (id) => {
    return await httpclient.delete(`http://127.0.0.1:5000/logout`)
    .then(response => { return response })
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state: stateAuthType, action: any) => {
            const user = action.payload
            
            const storedUser = window.localStorage.getItem('user')

            if( storedUser != undefined){
                window.localStorage.removeItem('user')
            }
            
            window.localStorage.setItem('user', JSON.stringify(user))
            
            return state = { 
                ...state,
                user: user
            }
        },

        logOutUser: ( state: stateAuthType, action: any) => {
            return  state = {
                ...state,
                user: <userAuthType>({}),
                isLoggedIn: false
            }
        }
    },
    extraReducers: ( builder: any ) => {    
        builder.addCase( handleLogin.pending, (state: stateAuthType, action: any) => { 
            return state = { ...state }
        })
        builder.addCase( handleLogin.fulfilled, (state: stateAuthType, action: any) => {
            console.log( 'fullfilled')

            if( action.payload.data.error){
                return action.payload.data.error
            }
            
            state.isLoggedIn = true 
            console.log( action.payload.data)
            const user = action.payload.data
            state.user = <userAuthType>(user)

            window.localStorage.setItem('user', JSON.stringify(user))
        })
        builder.addCase( handleLogin.rejected, (state: stateAuthType, action: any) => {})
        builder.addCase( handleRegister.pending, (state: stateAuthType, action: any) => {
            return state = { ...state }
        })
        builder.addCase( handleRegister.rejected, (state: stateAuthType, action: any) => {})
        builder.addCase( handleRegister.fulfilled, (state: stateAuthType, action: any ) => { console.log(" handleRegister ") })
        builder.addCase(validateUser.pending, ( state: stateAuthType, action: any ) => {})
        builder.addCase(validateUser.rejected, ( state: stateAuthType, action: any) => {

            const storedUser = window.localStorage.getItem('user')

            if( storedUser != undefined){
                window.localStorage.removeItem('user')
            }

            if( action.payload.error  != undefined){
                return action.payload.data.error
            }

            state.isLoggedIn = false
        })
        builder.addCase(validateUser.fulfilled, ( state: stateAuthType, action: any ) => {
                
                if( action.payload.data.error != undefined){
                    state.isLoggedIn = false
                    return action.payload.data.error
                }
                
                console.log( 'action.payload')
                state.user = action.payload
                state.isLoggedIn = true
        })
        builder.addCase( handleLogout.pending, ( state: stateAuthType, action: any) => { console.log( 'pending')})
        builder.addCase( handleLogout.rejected, ( state: stateAuthType, action: any) => { 
            console.log( 'rejected')
            
            window.localStorage.clear()

            state = {
                ...state, 
                user: <userAuthType>({}),
            }
            state.isLoggedIn = false
            
        })
        builder.addCase( handleLogout.fulfilled, ( state: stateAuthType, action: any) => { 
            console.log( 'user logged out')
         
            window.localStorage.clear()

        })
        builder.addCase( handleUserDetails.fulfilled, ( state: stateAuthType, action: any) => { console.log( action.payload)})
    }
})

export const auth = authSlice.reducer
export const { setUser,logOutUser } =  authSlice.actions
export const authState = authSlice
export const login = handleLogin
export const register = handleRegister
export const addUserDetail = handleUserDetails
export const validate = validateUser
export const logout = handleLogout