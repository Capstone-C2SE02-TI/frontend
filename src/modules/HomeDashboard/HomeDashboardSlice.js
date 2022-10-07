import { createSlice } from '@reduxjs/toolkit';

const homeDashboardSlice = createSlice({
    name: 'homeDashboard',
    initialState: {
        showSidebar: true,
    },

    reducers: {
        actionSidebar: (state) => {
            state.showSidebar = !state.showSidebar;
        },
    },
});



export default homeDashboardSlice;
