import { createSlice } from '@reduxjs/toolkit';

const HomeDashboardSlice = createSlice({
    name: 'auth',
    initialState: {
        showSidebar: true,
    },

    reducers: {
        actionSidebar: (state) => {
            state.showSidebar = !state.showSidebar;
        },
    },
    
});



export default HomeDashboardSlice;
