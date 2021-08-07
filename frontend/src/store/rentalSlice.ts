import { createSlice } from '@reduxjs/toolkit';
import { Rental } from '../types';
import { getRentals } from '../repositories/rentalRepository';

import { AppDispatch, RootState } from './';

type RentalState = {
    loading: boolean,
    error: Error | null,
    rentals: Rental[],
}

export const rentalSlice = createSlice({
    name: 'rental',
    initialState: {
        loading: false,
        error: null,
        rentals: [] as Rental[]
    } as RentalState,
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
            state.rentals = action.payload;
        }
    }
});

export const {
    fetchStart, fetchFailure, fetchSuccess,
} = rentalSlice.actions;


// functions called within other files

export const fetchRentals = (group_id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchStart());
        dispatch(fetchSuccess(await getRentals(group_id)));
    } catch (error) {
        dispatch(fetchFailure(error));
    }
}

// selectors

export const selectRental = (state: RootState) => state.rental;

export default rentalSlice.reducer;