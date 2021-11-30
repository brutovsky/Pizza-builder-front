import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import API from "../../api/Api";

// Initial state
const initialState = {
    status: 'waiting',
    error: null,
    orders: null
}

// Thunk prefixes
const FETCH_ALL_ORDERS = 'orders/fetchAll';
// Thunks
export const fetchAllOrders = createAsyncThunk(
    FETCH_ALL_ORDERS,
    async () => {
        const response = await API.get('/orders');
        return {orders: response.data};
    }
)

// Slice
const ordersSlice = createSlice({
    name: 'orders',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [fetchAllOrders.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchAllOrders.fulfilled]: (state, action) => {
            Object.assign(state, {...state, status: 'succeeded', orders: action.payload.orders});
        },
        [fetchAllOrders.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
    },
})

// Selectors
export const selectStatus = state => state.orders.status
export const selectOrders = state => state.orders.orders

//
export default ordersSlice.reducer;
