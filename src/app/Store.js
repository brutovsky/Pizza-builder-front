import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth/Auth";

export default configureStore({
    reducer: {
        auth: authReducer
    }
})
