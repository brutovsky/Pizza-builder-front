import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import API from "../../api/Api";

// Initial state
const initialState = {
    status: 'waiting',
    error: null,
    patterns: []
}

// Thunk prefixes
const FETCH_ALL_PATTERNS = 'pizzaPatterns/fetchAll';
const CREATE_PATTERN = 'pizzaPatterns/create';
const CONFIRM_PATTERN = 'pizzaPatterns/confirm';

// Thunks
export const fetchAllPatterns = createAsyncThunk(
    FETCH_ALL_PATTERNS,
    async () => {
        const response = await API.get('/patterns/all');
        return {patterns: response.data};
    }
)

export const createPattern = createAsyncThunk(
    CREATE_PATTERN,
    async patternData => {
        const response = await API.post('/patterns/add', patternData);
        return {pattern: response.data};
    }
)

export const confirmPizzaPattern = createAsyncThunk(
    CONFIRM_PATTERN,
    async confirmData => {
        const response = await API.post('/patterns/confirm/'+confirmData.uuid);
        return {pattern: response.data};
    }
)

///patterns/confirm/{patternUuid}

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
        [createPattern.pending]: (state) => {
            state.status = 'loading'
        },
        [createPattern.fulfilled]: (state, action) => {
            Object.assign(state,  {...state, status : 'succeeded', patterns : [...state.patterns, action.payload.pattern]});
        },
        [createPattern.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
        [confirmPizzaPattern.pending]: (state) => {
            state.status = 'loading'
        },
        [confirmPizzaPattern.fulfilled]: (state, action) => {
            state.status = 'succeeded'
        },
        [confirmPizzaPattern.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
    },
})

// Selectors
export const selectStatus = state => state.pizzaPatterns.status
export const selectPatterns = state => state.pizzaPatterns.patterns
//
export default pizzaPatternsSlice.reducer;
