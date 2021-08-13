import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types';
import { getProfile, updateProfile } from '../repositories/userRepository';

import { AppDispatch, RootState } from './';

type ProfileState = {
    loading: boolean,
    error: Error | null,
    profile: User | null,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        loading: false,
        error: null,
        profile: null,
    } as ProfileState,
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
            state.profile = action.payload;
        },

        setProfileStart(state) {
            state.loading = true;
            state.error = null;
        },
        setProfileSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.profile = {
                ...state.profile,
                ...action.payload,
            };
        },
        setProfileFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    fetchStart, fetchFailure, fetchSuccess,
    setProfileStart, setProfileSuccess, setProfileFailure,
} = profileSlice.actions;


// functions called within other files
export const fetchProfile = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchStart());
        dispatch(fetchSuccess(await getProfile()));
    } catch (error) {
        dispatch(fetchFailure(error));
    }
}

export const setProfile = (data: {}) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setProfileStart());
        dispatch(setProfileSuccess(await updateProfile(data)))
    } catch (error) {
        dispatch(fetchFailure(error));
    }
}


// selectors

export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;