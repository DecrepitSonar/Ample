import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpclient  from '../httpclient'

const initialState = {
    isLoggedIN: false, 
    user: {},
    error: {
        message: "",
        errorCode: ""
    }
}
const AuthValues = {
    EMailError: "EMAIlLERR",
    PWError: "PWError",
    AuthError: "AuthError"
}

const validateUser = createAsyncThunk('auth/validateUser/', async( ) => {
    return await httpclient.get('http://127.0.0.1:5000/whoami')
    .then( response => { return response })
})

const handleLogin = createAsyncThunk("auth/handleLogin/", async (data) => {
    return await httpclient.post("http://127.0.0.1:5000/login", data)
    .then( response => { return response })
})

const handleRegister = createAsyncThunk("auth/register/", async (data) => {
    const response = await httpclient.post("http://127.0.0.1:5000/register", data);
    return response;
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state, data) => {
            state.user = data.user
            state.isLoggedIN = true
        }
    },
    extraReducers: ( builder ) => {
        builder.addCase( handleLogin.pending, (state, action) => {
            console.log( action)
        })
        builder.addCase( handleLogin.fulfilled, (state, action) => {
            action.payload.data.error ? 
            state.error = action.payload.data.error : state.error = {} 
            // console.log( action.payload.data)

            console.log( action )
        })
        builder.addCase( handleLogin.rejected, (state, action) => {
            console.log( action )
            state.error = AuthValues.AuthError
        })
        builder.addCase( handleRegister.pending, (state, action) => { console.log("pending")})
        builder.addCase( handleRegister.rejected, (state, action) => { console.log("rejected")})
        builder.addCase( handleRegister.fulfilled, (state, action ) => { 
            state.user = action.payload
        })
        builder.addCase(validateUser.pending, ( state, action ) => { console.log( 'pending')})
        builder.addCase(validateUser.rejected, ( state, action) => { console.log( 'rejected')})
        builder.addCase(validateUser.fulfilled, ( state, action ) => {
            console.log( action.payload )
        })
    }
})

export const auth = authSlice.reducer
export const authState = authSlice
export const login = handleLogin
export const register = handleRegister
export const AuthError = AuthValues
export const validate = validateUser