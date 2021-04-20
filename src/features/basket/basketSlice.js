import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: 'waiting',
    error: null,
    patterns: []
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        increment: state => {
            state.pizzaInBasket += 1
        },
        decrement: state => {
            state.pizzaInBasket -= 1
        },
        incrementByAmount: (state, action) => {
            state.pizzaInBasket += action.payload
        }
    }
})

export const { increment, decrement, incrementByAmount } = basketSlice.actions

export const selectCount = state => state.basket

export default basketSlice.reducer
