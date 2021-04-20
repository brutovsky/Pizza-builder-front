import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import API from '../../api/Api';

// Initial state
const initialState = {
    status: 'waiting',
    error: null,
    user: null
}

// Thunk prefixes
const SIGN_IN_USER = 'auth/signInUser';
const SIGN_UP_USER = 'auth/signUpUser';
const UPDATE_USER = 'auth/updateUser';

// Thunks
export const signInUser = createAsyncThunk(
    SIGN_IN_USER,
    async userData => {
        const response = await API.post('/login', userData);
        return {user: response.data, token: response.headers.authorization};
    }
)

export const signUpUser = createAsyncThunk(
    SIGN_UP_USER,
    async userData => {
        const response = await API.post('/sign-up', userData);
        return {user: response.data, token: response.headers.authorization};
    }
)

export const updateUser = createAsyncThunk(
    UPDATE_USER,
    async userData => {
        const response = await API.put('/update-user', userData);
        return {user: response.data};
    }
)

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: loadFromLocalStorage(),
    reducers:{
        signOut: state => {
            forgetUser(state);
        },
    },
    extraReducers: {
        [signInUser.pending]: (state) => {
            state.status = 'loading'
        },
        [signInUser.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            saveUser(state, action);
            saveToken(action.payload.token);
        },
        [signInUser.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
        [signUpUser.pending]: (state) => {
            state.status = 'loading';
        },
        [signUpUser.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            saveUser(state, action);
            saveToken(action.payload.token);
        },
        [signUpUser.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
        [updateUser.pending]: (state) => {
            state.status = 'loading';
        },
        [updateUser.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            saveUser(state, action);
        },
        [updateUser.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        }
    },
})

// User actions

const forgetUser = (state) => {
    Object.assign(state, initialState);
    deleteState();
};

const saveUser = (state, action) => {
    state.status = 'succeeded'
    state.user = action.payload.user;
    saveState(state);
};

// LocalStorage Utils

const deleteState = () => {
    try {
        localStorage.setItem('userState', null);
        deleteToken();
    } catch (err){
        console.log(err)
    }
};

const saveState = (state) => {
    try {
        const serializedUser = JSON.stringify(state.user);
        let serializedState = JSON.stringify({...state, user:serializedUser});
        localStorage.setItem('userState', serializedState);
    } catch (err){
        console.log(err)
    }
};

function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("userState");
        if (serialisedState === null) return initialState;
        else{
            let parsedState = JSON.parse(serialisedState);
            let parsedUser = JSON.parse(parsedState.user);
            return {...parsedState, user:parsedUser};
        }
    } catch (e) {
        console.warn(e);
        return initialState;
    }
}

// Token Utils
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
// Actions
export const {signOut} = authSlice.actions
//
export default authSlice.reducer;
