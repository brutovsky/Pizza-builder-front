import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import API from "../../api/Api";

// Initial state
const initialState = {
    status: 'waiting',
    error: null,
    patterns: null
}

// Thunk prefixes
const FETCH_ALL_PATTERNS = 'pizzaPatterns/fetchAll';

// Thunks
export const fetchAllPatterns = createAsyncThunk(
    FETCH_ALL_PATTERNS,
    async () => {
        const response = await API.get('/all-patterns');
        console.log(response);
        return {patterns: response.data};
    }
)

// Slice
const pizzaPatternsSlice = createSlice({
    name: 'pizzaPatterns',
    initialState: initialState,
    reducers:{},
    extraReducers: {
        [fetchAllPatterns.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchAllPatterns.fulfilled]: (state, action) => {
            const newState = {...initialState, status : 'succeeded', patterns : action.payload.patterns};
            Object.assign(state, newState);
        },
        [fetchAllPatterns.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
    },
})

// Selectors
export const selectStatus = state => state.pizzaPatterns.status
export const selectError = state => state.pizzaPatterns.error
export const selectPatterns = state => state.pizzaPatterns.patterns
//
export default pizzaPatternsSlice.reducer;
