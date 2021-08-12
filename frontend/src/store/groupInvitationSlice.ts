import { createSlice } from '@reduxjs/toolkit';
import { Invitation } from '../types';
import { getInvitations } from '../repositories/groupInvitationRepository';

import { AppDispatch, RootState } from '.';

type GroupInvitationState = {
    loading: boolean,
    error: Error | null,
    invitations: Invitation[],
}

export const groupInvitationSlice = createSlice({
    name: 'groupInvitation',
    initialState: {
        loading: false,
        error: null,
        invitations: [] as Invitation[]
    } as GroupInvitationState,
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
            state.invitations = action.payload;
        }
    }
});

export const {
    fetchStart, fetchFailure, fetchSuccess,
} = groupInvitationSlice.actions;

export const fetchInvitations = (group_id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchStart());
        dispatch(fetchSuccess(await getInvitations(group_id)));
    } catch (error) {
        dispatch(fetchFailure(error));
    }
}

// selectors

export const selectGroupInvitation = (state: RootState) => state.groupInvitation;

export default groupInvitationSlice.reducer;