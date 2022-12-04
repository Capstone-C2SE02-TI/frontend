import { createSlice } from '@reduxjs/toolkit';

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState: {
        status: 'idle',
        sharkFollowedSelected: {},
    },

    reducers: {
        saveSharkFollowedSelected: (state, action) => {
            state.sharkFollowedSelected = action.payload;
        },
    },
    extraReducers: (builder) => {},
});



export default portfolioSlice;

export const { saveSharkFollowedSelected } = portfolioSlice.actions;
