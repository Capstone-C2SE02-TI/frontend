import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { coinDetailService } from '~/services';

const coinDetailSlice = createSlice({
    name: 'discoverCoins',
    initialState: {
        status: 'idle',
        coinDetail: '',
        trendingTokens: [],
        trendingCoins: [],
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchCoinsDetail.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchCoinsDetail.fulfilled, (state, action) => {
                state.coinDetail = action.payload;
                state.status = 'idle';
            })
            .addCase(fetchTrendingTokens.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTrendingTokens.fulfilled, (state, action) => {
                state.trendingTokens = action.payload;
                state.status = 'idle';
            })

            .addCase(fetchTrendingCoins.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTrendingCoins.fulfilled, (state, action) => {
                state.trendingCoins = action.payload;
                state.status = 'idle';
            });
    },
});
export const fetchCoinsDetail = createAsyncThunk('coinDetail/fetchCoinsDetail', async (symbol) => {
    const response = await coinDetailService.getCoinDetail(symbol);
    return response.data;
});

export const fetchTrendingTokens = createAsyncThunk('coinDetail/fetchTrendingTokens', async () => {
    const response = await coinDetailService.getTokensTrending();
    return response.datas;
});

export const fetchTrendingCoins = createAsyncThunk('coinDetail/fetchTrendingCoins', async () => {
    const response = await coinDetailService.getCoinsTrending();
    return response.datas;
});

export default coinDetailSlice;
