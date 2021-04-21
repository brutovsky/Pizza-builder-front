import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import API from "../../api/Api";

// Initial state
const initialState = {
    status: 'waiting',
    error: null,
    groups: null,
    ingredientsInGroups: null,
    ingredients: null
}

// Thunk prefixes
const FETCH_ALL_GROUPS = 'groups/fetchAll';
const FETCH_ALL_INGREDIENTS = 'ingredients/fetchAll';
const CREATE_GROUP = 'groups/create';
const CREATE_INGREDIENT = 'ingredients/create'
const DELETE_INGREDIENT = 'ingredients/delete'
const DELETE_GROUP = 'groups/delete'
// Thunks
export const fetchAllGroups = createAsyncThunk(
    FETCH_ALL_GROUPS,
    async () => {
        const response = await API.get('/products/group/all');
        return {groups: response.data};
    }
)

export const fetchAllIngredients = createAsyncThunk(
    FETCH_ALL_INGREDIENTS,
    async () => {
        const response = await API.get('/products/all');
        return {ingredients: response.data};
    }
)
///products/all

export const createGroup = createAsyncThunk(
    CREATE_GROUP,
    async groupData => {
        const response = await API.post('/products/group/add', groupData);
        return {group: response.data};
    }
)

export const createIngredient = createAsyncThunk(
    CREATE_INGREDIENT,
    async ingredientData => {
        const response = await API.post('/products/add', ingredientData);
        return {ingredient: response.data};
    }
)

export const deleteIngredient = createAsyncThunk(
    DELETE_INGREDIENT,
    async ingredientData => {
        const response = await API.delete('/products/' + ingredientData.uuid);
        return {ingredient: response.data};
    }
)

export const deleteGroup = createAsyncThunk(
    DELETE_GROUP,
    async groupData => {
        const response = await API.delete('/products/group/' + groupData.uuid);
        return {ingredient: response.data};
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
            Object.assign(state, {...state, status : 'succeeded', groups : action.payload.groups});
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
        [fetchAllIngredients.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchAllIngredients.fulfilled]: (state, action) => {
            Object.assign(state, {...state, status : 'succeeded', ingredients : action.payload.ingredients});
        },
        [fetchAllIngredients.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
        [createIngredient.pending]: (state) => {
            state.status = 'loading'
        },
        [createIngredient.fulfilled]: (state, action) => {
            Object.assign(state, {...state, status : 'succeeded', ingredients : [...state.ingredients, action.payload.ingredient]});
        },
        [createIngredient.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
        [deleteIngredient.pending]: (state) => {
            state.status = 'loading'
        },
        [deleteIngredient.fulfilled]: (state, action) => {
            Object.assign(state, {...state, status : 'succeeded', ingredients : [...state.ingredients, action.payload.ingredient]});
        },
        [deleteIngredient.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
        [deleteGroup.pending]: (state) => {
            state.status = 'loading';
        },
        [deleteGroup.fulfilled]: (state, action) => {
            state.status = 'succeeded';
        },
        [deleteGroup.rejected]: (state, action) => {
            state.status = 'failed';
            console.log(action.error);
        },
    },
})

// Selectors
export const selectStatus = state => state.ingredients.status
export const selectError = state => state.ingredients.error
export const selectGroups = state => state.ingredients.groups
export const selectIngredients = state => state.ingredients.ingredients
//
export default ingredientsSlice.reducer;
