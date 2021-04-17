import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth/Auth";
import pizzaPatternsReducer from "../features/pizzaPatterns/PizzaPatterns";

export default configureStore({
    reducer: {
        auth: authReducer,
        pizzaPatterns: pizzaPatternsReducer
    }
})
