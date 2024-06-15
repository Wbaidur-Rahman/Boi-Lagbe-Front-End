import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./books/booksSlices";
import usersReducer from "./users/usersSlice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        books: booksReducer,
    },
});

export default store;