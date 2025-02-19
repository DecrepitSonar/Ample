import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpclient  from '../httpclient'

const AuthValues = {
    EMailError: "EMAIlLERR",
    PWError: "PWError",
    AuthError: "AuthError"

}

const initialState = {
    isLoggedIN: false, 
    user: {},
    error: 'error'
}

const validateUser = createAsyncThunk('auth/validateUser', async( ) => {
    return await httpclient.get('http://127.0.0.1:5000/whoami')
    .then( response => { return response })
})

const handleLogin = createAsyncThunk("auth/handleLogin", async (data) => {
    return await httpclient.post("http://127.0.0.1:5000/login", data)
    .then( response => { return response })
})

const handleRegister = createAsyncThunk("auth/register", async (data) => { 
    return await httpclient.post("http://127.0.0.1:5000/register", data)
    .then( response => { return response })
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: ( builder ) => {
        builder.addCase( handleLogin.pending, (state, action) => {})
        builder.addCase( handleLogin.fulfilled, (state, action) => {
            state.isLoggedIN = true 
            state.user = action.payload.data
        })
        builder.addCase( handleLogin.rejected, (state, action) => {
            state.error = AuthValues.AuthError
        })
        builder.addCase( handleRegister.pending, (state, action) => { console.log("pending")})
        builder.addCase( handleRegister.rejected, (state, action) => { console.log("rejected")})
        builder.addCase( handleRegister.fulfilled, (state, action ) => { 
            const responseData = action.payload.data
            console.log( responseData)
            if( responseData.error){
                switch(responseData.error){
                case AuthValues.EMailError:
                    state.error = "Account with email already exists"
                    console.log( state.error)
                    break;
                default:
                    state.error = 'internal error, try again'
            }

            }
            // state.user = action.payload
        })
        builder.addCase(validateUser.pending, ( state, action ) => { console.log( 'pending')})
        builder.addCase(validateUser.rejected, ( state, action) => { console.log( 'rejected')})
        builder.addCase(validateUser.fulfilled, ( state, action ) => {
            const error = action.payload.data.error
            if( action.payload.data.error){
                console.log( error)
            }else{
                console.log( action.payload)
                // state.user = action.payload.data
                // state.isLoggedIN = true
            }
        })
    }
})

export const auth = authSlice.reducer
export const authState = authSlice
export const login = handleLogin
export const register = handleRegister
export const AuthError = AuthValues
export const validate = validateUser