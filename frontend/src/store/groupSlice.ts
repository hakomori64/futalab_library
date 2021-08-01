import { createSlice } from '@reduxjs/toolkit';
import { Group } from '../types';
import { getGroups } from '../repositories/groupRepository';

import { AppDispatch, RootState } from './';

export const groupSlice = createSlice({
    name: 'group',
    initialState: {
        loading: false,
        error: null,
        groups: [] as Group[]
    },
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
            state.groups = action.payload
        }
    }
});

export const { fetchStart, fetchFailure, fetchSuccess } = groupSlice.actions;

export const fetchGroups = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchStart());
        //TODO(hakomori64): fetch groups
        dispatch(fetchSuccess(await getGroups()));
    } catch (error) {
        dispatch(fetchFailure(error));
    }
}

export const selectGroup = (state: RootState) => state.group;

export default groupSlice.reducer;