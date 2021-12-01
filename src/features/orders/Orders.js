import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import API from "../../api/Api";

// Initial state
const initialState = {
    status: 'waiting',
    error: null,
    orders: null,
    orderStatuses: []
}

// Thunk prefixes
const FETCH_ALL_ORDERS = 'orders/fetchAll';
const FETCH_ALL_STATUSES = 'statuses/fetchAll';
const UPDATE_ORDER_STATUS = 'orders/updateStatus';
// Thunks
export const fetchAllOrders = createAsyncThunk(
    FETCH_ALL_ORDERS,
    async () => {
        const response = await API.get('/orders');
        return {orders: response.data};
    }
)

export const fetchAllStatuses = createAsyncThunk(
    FETCH_ALL_STATUSES,
    async () => {
        const response = await API.get('/orders/statuses');
        return {statuses: response.data};
    }
)

export const updateStatus = createAsyncThunk(
    UPDATE_ORDER_STATUS,
    async updateStatusData => {
        const response = await API.put('/order/update/status', updateStatusData);
        return {patterns: response.data};
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
        [fetchAllStatuses.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchAllStatuses.fulfilled]: (state, action) => {
            Object.assign(state, {...state, status: 'succeeded', orderStatuses: action.payload.statuses});
        },
        [fetchAllStatuses.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
        [updateStatus.pending]: (state) => {
            state.status = 'loading'
        },
        [updateStatus.fulfilled]: (state, action) => {
            // Object.assign(state, {...state, status: 'succeeded', orderStatuses: action.payload.statuses});
        },
        [updateStatus.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
    },
})

// Selectors
export const selectStatus = state => state.orders.status
export const selectOrders = state => state.orders.orders
export const selectOrderStatuses = state => state.orders.orderStatuses

//
export default ordersSlice.reducer;
