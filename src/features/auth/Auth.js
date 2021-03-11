import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import API from '../../api/Api';

export const signInUser = createAsyncThunk(
    'auth/signInUser',
    async userData => {
        return (await API.post('/login', userData)).headers.authorization
    }
)

export const signUpUser = createAsyncThunk(
    'auth/signUpUser',
    async userData => {
        const response = await API.post('/sign-up', userData)
        console.log(response)
        return {data: response.data, token: response.headers.authorization}
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
        status: 'waiting'
    },
    reducers: {
        test: state => {
            state.token = 'FUCK';
        },
        signUp: state => {
            state.pizzaInBasket += 1
        },
        resetToken: state => {
            deleteToken(state)
        }
    },
    extraReducers: {
        [signInUser.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            saveToken(state, action.payload)
            console.log(action.payload)
        },
        [signInUser.rejected]: (state, action) => {
            state.status = 'failed'
            console.log(action.error)
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

export const {resetToken, test} = authSlice.actions

const saveToken = (state, token) => {
    try {
        localStorage.setItem('token', token);
        state.token = localStorage.getItem('token');
    } catch (err) {
        console.log(err)
    }
};

const deleteToken = (state) => {
    try {
        localStorage.setItem('token', null);
        state.token = localStorage.getItem('token');
    } catch (err) {
        console.log(err)
    }
};

const selectToken = state => state.auth.token;

export default authSlice.reducer;
