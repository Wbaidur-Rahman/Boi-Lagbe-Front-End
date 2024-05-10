import { createSlice } from "@reduxjs/toolkit";

const initialState = {loggedinuser: null};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setuser: (state, action) => {
            state.loggedinuser = action.payload;
        }
    }
});

export default usersSlice.reducer;
export const { setuser } = usersSlice.actions;