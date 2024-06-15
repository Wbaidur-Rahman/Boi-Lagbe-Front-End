import { createSlice } from "@reduxjs/toolkit";

const initialState = {categorybooks: null};

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setcategory: (state, action) => {
            state.categorybooks = action.payload;
        }
    }
});

export default booksSlice.reducer;
export const { setcategory } = booksSlice.actions;