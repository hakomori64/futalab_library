import { createSlice } from '@reduxjs/toolkit';
import { Group } from '../types';
import { getGroups } from '../repositories/groupRepository';

import { AppDispatch, RootState } from './';

type GroupState = {
    loading: boolean,
    error: Error | null,
    groups: Group[],
    selectedGroupId: number | null
}

export const groupSlice = createSlice({
    name: 'group',
    initialState: {
        loading: false,
        error: null,
        groups: [] as Group[],
        selectedGroupId: null
    } as GroupState,
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
            state.groups = action.payload.groups;
            state.selectedGroupId = action.payload.selectedGroupId;
        },

        setGroupIdStart(state) {
            state.loading = true;
            state.error = null;
        },
        setGroupIdSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.selectedGroupId = action.payload.selectedGroupId;
        },
        setGroupIdFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    fetchStart, fetchFailure, fetchSuccess, // get groups
    setGroupIdStart, setGroupIdFailure, setGroupIdSuccess,
} = groupSlice.actions;

const _setGroups = async () => {
    const groups = await getGroups();
    const ids = groups.map((group) => group.id);
    const selectedGroupId = localStorage.getItem('selectedGroupId');
    if (selectedGroupId != null && ids.includes(+selectedGroupId)) {
        return {
            groups: groups,
            selectedGroupId: +selectedGroupId
        }
    }

    if (groups.length > 0) {
        localStorage.setItem('selectedGroupId', groups[0].id.toString());
        return {
            groups: groups,
            selectedGroupId: groups[0].id
        }
    }

    return {
        groups: [],
        selectedGroupId: null
    };
};


// functions called within other files
export const fetchGroups = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(fetchStart());
        dispatch(fetchSuccess(await _setGroups()));
    } catch (error) {
        dispatch(fetchFailure(error));
    }
}

export const setSelectedGroupId = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setGroupIdStart());
        localStorage.setItem('selectedGroupId', id.toString());
        dispatch(setGroupIdSuccess({ selectedGroupId: id }));
    } catch (error) {
        dispatch(setGroupIdFailure(error));
    }
}


// selectors

export const selectGroup = (state: RootState) => state.group;

export default groupSlice.reducer;