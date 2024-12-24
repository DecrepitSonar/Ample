import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpclient  from '../httpclient'
import { AuthValues } from "./ObjectFormats";
import { LoginFormType, stateAuthType, userAuthType } from "./ObjectTypes";

const initialState: stateAuthType = {
    isLoggedIn: window.localStorage.getItem('user') ? true : false  , 
    user:  <userAuthType>({}),
    error: ''
}

const validateUser = createAsyncThunk('auth/validateUser', async () => {
    
        console.log( 'resolving user')
        return await httpclient.get('http://127.0.0.1:5000/validate')
        .then( response => {

            if (!response.data.error){
                window.localStorage.setItem('user', JSON.stringify(response.data)) 
            } 

            return response 
        })
        .catch( response => {return response })
    
})

const handleLogin = createAsyncThunk("auth/handleLogin", async (data: LoginFormType) => {
    return await httpclient.post("http://127.0.0.1:5000/login", data)
    .then( response => { return response })
})

const handleRegister = createAsyncThunk("auth/register", async (data: object) => { 
    return await httpclient.post("http://127.0.0.1:5000/register", data)
    .then( response => { return response })
})

const handleLogout = createAsyncThunk('auth/logout', async (id) => {
    return await httpclient.delete(`http://127.0.0.1:5000/logout`)
    .then(response => { console.log( response )})
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const user = action.payload
            state.user = { 
                id: user.id,
                username: user.username,
                imageURL: user.imageURL,
                type: 'user',
                headerPosterURL: user.headerPosterURL

            }
        }
    },
    extraReducers: ( builder: any ) => {    
        builder.addCase( handleLogin.pending, (state: any, action: any) => { console.log( 'pending')})
        builder.addCase( handleLogin.fulfilled, (state: any, action: any) => {
            console.log( 'fullfilled')
            state.isLoggedIn = true 
            console.log( action.payload.data)
            state.user = action.payload.data

            window.localStorage.setItem('user', JSON.stringify(action.payload.data))
        })
        builder.addCase( handleLogin.rejected, (state: any, action: any) => {
            console.log( "rejected" )
            throw {
                message: 'username or password incorrect',
                Code: AuthValues.AuthError
            }
            // return AuthValues.AuthError
            // console.log( action.payload)
        })
        builder.addCase( handleRegister.pending, (state: any, action: any) => { console.log("pending")})
        builder.addCase( handleRegister.rejected, (state: any, action: any) => { 
            switch( action.error.code ){
                case 'ERR_BAD_REQUEST':
                    return {
                        "message": "User already exists " ,
                        'Code': 'EMAIlLERR'}
                    break
                default:
                    return
            }
        })
        builder.addCase( handleRegister.fulfilled, (state: any, action: any ) => { 
            console.log(" handleRegister ")
            state.error = ""
            const responseData = action.payload.data
            console.log( responseData )
            
            if( responseData.error){
                switch(responseData.error.Code){
                case AuthValues.EMailError:
                    break;
                default:
                    state.error = 'internal error, try again'
                }
                return
            }
            
            window.localStorage.setItem('userId', responseData.id) 
        })
        builder.addCase(validateUser.pending, ( state: any, action: any ) => { console.log( 'pending')})
        builder.addCase(validateUser.rejected, ( state: any, action: any) => { 
            console.log( 'rejected')
            if (window.localStorage.getItem('userId') ) {
                window.localStorage.removeItem('userId') 
                window.localStorage.removeItem('user')
            }

        })
        builder.addCase(validateUser.fulfilled, ( state: any, action: any ) => {
            const error = action.payload.data.error

            if( !error){
                const storedUser = window.localStorage.getItem('user')
            
            // if( action.payload.data.error != undefined){
                // const error = action.payload.data.errorss
                // console.log( error)
            // }else{
                // console.log( window.localStorage.getItem('user'))
                // console.log( action.payload)
                state.user = storedUser ? JSON.parse(storedUser) : action.payload.data
                state.isLoggedIn = true
            // }
            }
        })

        builder.addCase( handleLogout.pending, ( state: any, action: any) => { console.log( 'pending')})
        builder.addCase( handleLogout.rejected, ( state: any, action: any) => { console.log( 'rejected')})
        builder.addCase( handleLogout.fulfilled, ( state: stateAuthType, action: any) => { 
            console.log( 'user logged out')
            state.user = <userAuthType>({})
            state.isLoggedIn = false

            window.localStorage.removeItem('userId') 
            window.localStorage.removeItem('user')
        }
        )
    }
})

export const auth = authSlice.reducer
export const { setUser } =  authSlice.actions
export const authState = authSlice
export const login = handleLogin
export const register = handleRegister
export const validate = validateUser
export const logout = handleLogout