import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
    name: "book",
    initialState: {
        books: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //GET ALL
        getBookStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getBookSSuccess: (state, action) => {
            state.isFetching = false;
            state.books = action.payload;
        },
        getBookFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //DELETE
        deleteBookStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteBookSuccess: (state, action) => {
            state.isFetching = false;
            state.books.splice(
                state.books.findIndex((item) => item._id === action.payload),
                1
            );
        },
        deleteBookFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //UPDATE
        updateBookStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateBookSuccess: (state, action) => {
            state.isFetching = false;
            state.books[
                state.books.findIndex((item) => item._id === action.payload.id)
                ] = action.payload.book;
        },
        updateBookFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //UPDATE
        addBookStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addBookSuccess: (state, action) => {
            state.isFetching = false;
            state.books.push(action.payload);
        },
        addBookFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    getBookStart,
    getBookSuccess,
    getBookFailure,
    deleteBookStart,
    deleteBookSuccess,
    deleteBookFailure,
    updateBookStart,
    updateBookSuccess,
    updateBookFailure,
    addBookStart,
    addBookSuccess,
    addBookFailure,
} = bookSlice.actions;

export default bookSlice.reducer;
