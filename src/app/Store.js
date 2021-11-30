import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth/Auth";
import pizzaPatternsReducer from "../features/pizzaPatterns/PizzaPatterns";
import ingredientsReducer from "../features/ingredients/Ingredients";
import basketReducer from "../features/basket/basketSlice";
import ordersReducer from "../features/orders/Orders";
import {combineReducers} from "redux";

const combinedReducer = combineReducers({
    auth: authReducer,
    pizzaPatterns: pizzaPatternsReducer,
    ingredients: ingredientsReducer,
    basket: basketReducer,
    orders: ordersReducer
});

const rootReducer = (state, action) => {
    return combinedReducer(state, action);
};

export default configureStore({
    reducer: rootReducer
});
