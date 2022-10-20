import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { marketOverviewService } from '~/services';

const homeDashboardSlice = createSlice({
    name: 'homeDashboard',
    initialState: {
        status: 'idle', coinsList: [], showSidebar: true, coinsAndTokensLoss:[],
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
            .addCase(fetchCoinsAndTokensLoss.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchCoinsAndTokensLoss.fulfilled, (state, action) => {
                state.coinsAndTokensLoss = action.payload;
                state.status = 'idle';
            });
    },
});

export const fetchCoinsHomeDashboard = createAsyncThunk('homeDashboard/fetchCoinsHomeDashboard', async (pageSize) => {
    const response = await marketOverviewService.getCoins(pageSize);
    return response.datas;
});

export const fetchCoinsAndTokensLoss = createAsyncThunk('homeDashboard/fetchCoinsAndTokensLoss', async () => {
    const response = await marketOverviewService.getCoinsAndTokensLoss();
    return response.datas;
});

export default homeDashboardSlice;
