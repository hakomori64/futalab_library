import { createSlice } from '@reduxjs/toolkit';
import { Book } from '../types';
import { getBooks } from '../repositories/bookRepository';

import { AppDispatch, RootState } from './';

type BookState = {
    loading: boolean,
    error: Error | null,
    books: Book[],
}

export const bookSlice = createSlice({
    name: 'book',
    initialState: {
        loading: false,
        error: null,
        books: [] as Book[],
    } as BookState,
    reducers: {
        fetchStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.books = action.payload;
        }
    }
});

export const {
    fetchStart, fetchFailure, fetchSuccess,
} = bookSlice.actions;

// functions called within other files

export const fetchBooks = (group_id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchStart());
        dispatch(fetchSuccess(await getBooks(group_id)));
    } catch (error) {
        dispatch(fetchFailure(error));
    }
}

// selectors

export const selectBook = (state: RootState) => state.book;

export default bookSlice.reducer;