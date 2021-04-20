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
        return {patterns: response.data.patternsInOrder};
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
            Object.assign(state, {...state, status : 'succeeded', patterns : action.payload.patterns});
        },
        [fetchCart.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
    }
})

export const selectPatterns = state => state.basket.patterns

export default basketSlice.reducer
