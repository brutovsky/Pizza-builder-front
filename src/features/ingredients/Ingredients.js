import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import API from "../../api/Api";

// Initial state
const initialState = {
    status: 'waiting',
    error: null,
    groups: null,
    ingredientsInGroups: null
}

// Thunk prefixes
const FETCH_ALL_GROUPS = 'groups/fetchAll';
const CREATE_GROUP = 'groups/create';

// Thunks
export const fetchAllGroups = createAsyncThunk(
    FETCH_ALL_GROUPS,
    async () => {
        const response = await API.get('/products/group/all');
        console.log(response);
        return {groups: response.data};
    }
)

export const createGroup = createAsyncThunk(
    CREATE_GROUP,
    async groupData => {
        const response = await API.post('/products/group/add', groupData);
        return {group: response.data};
    }
)

// Slice
const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers:{},
    extraReducers: {
        [fetchAllGroups.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchAllGroups.fulfilled]: (state, action) => {
            const newState = {...initialState, status : 'succeeded', groups : action.payload.groups};
            Object.assign(state, newState);
        },
        [fetchAllGroups.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
        [createGroup.pending]: (state) => {
            state.status = 'loading'
        },
        [createGroup.fulfilled]: (state, action) => {
            Object.assign(state, {...state, status : 'succeeded', groups : [...state.groups, action.payload.group]});
        },
        [createGroup.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
    },
})

// Selectors
export const selectStatus = state => state.ingredients.status
export const selectError = state => state.ingredients.error
export const selectGroups = state => state.ingredients.groups
//
export default ingredientsSlice.reducer;
