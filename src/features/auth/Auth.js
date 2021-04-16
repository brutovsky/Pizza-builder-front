import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import API from '../../api/Api';

// Initial state
const initialState = {
    status: 'waiting',
    error: null,
    user: null
}
//

// Thunk prefixes
const SIGN_IN_USER = 'auth/signInUser';
const SIGN_UP_USER = 'auth/signUpUser';
//

// Thunks

export const signInUser = createAsyncThunk(
    SIGN_IN_USER,
    async userData => {
        return (await API.post('/login', userData)).headers.authorization
    }
)

export const signUpUser = createAsyncThunk(
    SIGN_UP_USER,
    async userData => {
        const response = await API.post('/sign-up', userData)
        console.log(response)
        return {data: response.data, token: response.headers.authorization}
    }
)

//

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    extraReducers: {
        [signInUser.pending]: (state) => {
            state.status = 'loading'
        },
        [signInUser.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            saveToken(action.payload)
            console.log(action.payload)
        },
        [signInUser.rejected]: (state, action) => {
            state.status = 'failed'
            console.log(action.error)
        },
        [signUpUser.pending]: (state) => {
            state.status = 'loading'
        },
        [signUpUser.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            saveToken(state, action.payload.token)
            console.log(action.payload)
        },
        [signUpUser.rejected]: (state, action) => {
            state.status = 'failed'
            console.log(action.error)
        }
    },
})
//
export const {resetToken, test} = authSlice.actions

const saveToken = (token) => {
    try {
        localStorage.setItem('token', token);
        API.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    } catch (err) {
        console.log(err)
    }
};

const deleteToken = () => {
    try {
        localStorage.setItem('token', null);
        API.defaults.headers.common['Authorization'] = null;
    } catch (err) {
        console.log(err)
    }
};

// Selectors
export const selectStatus = state => state.auth.status
export const selectError = state => state.auth.error
export const selectUser = state => state.auth.user
//

export default authSlice.reducer;
