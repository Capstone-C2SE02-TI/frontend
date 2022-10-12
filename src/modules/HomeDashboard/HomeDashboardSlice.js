import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { marketOverviewService } from '~/services';

const homeDashboardSlice = createSlice({
    name: 'homeDashboard',
    initialState: {
        status: 'idle', coinsList: [], showSidebar: true,
    },

    reducers: {
        actionSidebar: (state) => {
            state.showSidebar = !state.showSidebar;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoinsHomeDashboard.pending, (state, action) => {
            
                state.status = 'loading';
            })
            .addCase(fetchCoinsHomeDashboard.fulfilled, (state, action) => {
              
                state.coinsList = action.payload;
                state.status = 'idle';
            })
    },
});

export const fetchCoinsHomeDashboard = createAsyncThunk('homeDashboard/fetchCoinsHomeDashboard', async (pageSize) => {
    const response = await marketOverviewService.getCoins(pageSize);
    return response.datas;
});

export default homeDashboardSlice;
