import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import API from "../../api/Api";

const initialState = {
    status: 'waiting',
    error: null,
    patterns: []
}

export const fetchCart = createAsyncThunk(
    "cart/getAll",
    async () => {
        const response = await API.get('/cart');
        return {patterns: response.data};
    }
)

/*
    private UUID pattern;
    private Integer amount;
    private Integer size;
    private Double price;
 */
export const addPatternToCart = createAsyncThunk(
    "cart/add",
    async (patternData) => {
        const response = await API.post('/cart/add', patternData);
        return {result: response.data};
    }
)

export const increment = createAsyncThunk(
    "cart/inc",
    async (incData) => {
        console.log(incData)
        const response = await API.put('/pattern/increment/' + incData.uuid + '/' + incData.size);
        return {result: response.data};
    }
)

export const decrement = createAsyncThunk(
    "cart/dec",
    async (decData) => {
        console.log(decData)
        const response = await API.put('/pattern/decrement/' + decData.uuid + '/' + decData.size);
        return {result: response.data};
    }
)

export const deletePatternFromBasket = createAsyncThunk(
    "cart/del",
    async (delData) => {
        console.log(delData)
        const response = await API.delete('/cart/delete/' + delData.uuid + '/' + delData.size);
        return {result: response.data};
    }
)

export const placeOrder = createAsyncThunk(
    "cart/order",
    async (addressData) => {
        console.log(addressData)
        const response = await API.put('/cart/order', addressData);
        console.log(response)
        return {result: response.data};
    }
)

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
    },
    extraReducers:{
        [fetchCart.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchCart.fulfilled]: (state, action) => {
            Object.assign(state, {...initialState, status : 'succeeded', patterns : action.payload.patterns});
        },
        [fetchCart.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
        [addPatternToCart.pending]: (state) => {
            state.status = 'loading'
        },
        [addPatternToCart.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            console.log(action.payload);
        },
        [addPatternToCart.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
        [increment.pending]: (state) => {
            state.status = 'loading'
        },
        [increment.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            console.log(action.payload);
        },
        [increment.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
        [decrement.pending]: (state) => {
            state.status = 'loading'
        },
        [decrement.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            console.log(action.payload);
        },
        [decrement.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
        [placeOrder.pending]: (state) => {
            state.status = 'loading'
        },
        [placeOrder.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            console.log(action.payload);
        },
        [placeOrder.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
        [deletePatternFromBasket.pending]: (state) => {
            state.status = 'loading'
        },
        [deletePatternFromBasket.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            console.log(action.payload);
        },
        [deletePatternFromBasket.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        }
    }
})

export const selectPatterns = state => state.basket.patterns

export default basketSlice.reducer
