import { configureStore } from '@reduxjs/toolkit'
import basketSlice from '../features/basket/basketSlice'

export default configureStore({
    reducer: {
        //user: usersReducer,
        basket: basketSlice,
    }
})
