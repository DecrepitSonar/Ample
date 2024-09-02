import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpclient  from '../httpclient'
import { AuthValues } from "./ObjectFormats";
import { LoginFormType, stateAuthType, userAuthType } from "./ObjectTypes";

const initialState: stateAuthType = {
    isLoggedIn: false, 
    user: <userAuthType>({}),
    error: ''
}

const validateUser = createAsyncThunk('auth/validateUser', async () => {
    return await httpclient.get('http://127.0.0.1:5000/whoami')
    .then( response => { return response })
})

const handleLogin = createAsyncThunk("auth/handleLogin", async (data: LoginFormType) => {
    return await httpclient.post("http://127.0.0.1:5000/login", data)
    .then( response => { return response })
})

const handleRegister = createAsyncThunk("auth/register", async (data: object) => { 
    return await httpclient.post("http://127.0.0.1:5000/register", data)
    .then( response => { return response })
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: ( builder: any ) => {
        builder.addCase( handleLogin.pending, (state: any, action: any) => { console.log( 'pending')})
        builder.addCase( handleLogin.fulfilled, (state: any, action: any) => {
            console.log( 'fullfilled')
            state.isLoggedIn = true 
            state.user = action.payload.data
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
        builder.addCase( handleRegister.rejected, (state: any, action: any) => { console.log("rejected")})
        builder.addCase( handleRegister.fulfilled, (state: any, action: any ) => { 
            console.log(" handleRegister ")
            const responseData = action.payload
            console.log( responseData.data)
            state.user = responseData.data
            state.isLoggedIn = true
            
            if( responseData.error){
                switch(responseData.error){
                case AuthValues.EMailError:
                    state.error = "Account with email already exists"
                    break;
                default:
                    state.error = 'internal error, try again'
            }

            }
            // state.user = action.payload
        })
        builder.addCase(validateUser.pending, ( state: any, action: any ) => { console.log( 'pending')})
        builder.addCase(validateUser.rejected, ( state: any, action: any) => { console.log( 'rejected')})
        builder.addCase(validateUser.fulfilled, ( state: any, action: any ) => {
            const error = action.payload.data.error
            if( action.payload.data.error){
                console.log( error)
            }else{
                console.log( action.payload.data)
                state.user = action.payload.data
                state.isLoggedIn = true
            }
        })
    }
})

export const auth = authSlice.reducer
export const authState = authSlice
export const login = handleLogin
export const register = handleRegister
export const validate = validateUser