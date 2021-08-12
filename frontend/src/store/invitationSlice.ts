import { createSlice } from '@reduxjs/toolkit';
import { Invitation } from '../types';
import { getInvitations } from '../repositories/invitationRepository';

import { AppDispatch, RootState } from '.';

type InvitationState = {
    loading: boolean,
    error: Error | null,
    invitations: Invitation[],
};

export const invitationSlice = createSlice({
    name: 'invitation',
    initialState: {
        loading: false,
        error: null,
        invitations: [] as Invitation[],
    } as InvitationState,
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
} = invitationSlice.actions;

export const fetchInvitations = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchStart());
        dispatch(fetchSuccess(await getInvitations()));
    } catch (error) {
        dispatch(fetchFailure(error));
    }
}

// selectors

export const selectInvitation = (state: RootState) => state.invitation;

export default invitationSlice.reducer;