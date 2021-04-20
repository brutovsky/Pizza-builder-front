import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth/Auth";
import pizzaPatternsReducer from "../features/pizzaPatterns/PizzaPatterns";
import ingredientsReducer from "../features/ingredients/Ingredients";
import basketRedicer from "../features/basket/basketSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        pizzaPatterns: pizzaPatternsReducer,
        ingredients: ingredientsReducer,
        basket: basketRedicer
    }
})
