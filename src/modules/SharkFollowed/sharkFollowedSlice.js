import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { sharkFollowedService } from '~/services';

const sharkFollowedSlice = createSlice({
    name: 'sharkFollowed',
    initialState: {
        status: 'idle', sharkFollowedList: [],
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSharkFollowed.fulfilled, (state, action) => {
                state.sharkFollowedList = action.payload;
                state.status = 'idle';
            });
    },
});

export const fetchSharkFollowed = createAsyncThunk('sharkFollowed/fetchSharkFollowed', async (sharkId) => {
    const response = await sharkFollowedService.getSharkFollowed(sharkId);
    return response.datas;
});

export default sharkFollowedSlice;
