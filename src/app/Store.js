import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/test/Counter'
import {basketSlice} from '../features/basket/basketSlice'
import authReducer from "../features/auth/Auth";

let preloadedState
const persistedToken = localStorage.getItem('token')

if (persistedToken) {
    preloadedState = {
        token: persistedToken
    }
}

export default configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer
    },
    preloadedState
})
