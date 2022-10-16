import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { marketOverviewService } from '~/services';

const discoverSlice = createSlice({
    name: 'discoverCoins',
    initialState: {
        status: 'idle',
        listTagsName: [],
        coinsList: [],
        trendingCoins: [],
        searchText: '',
        filters: {
            category: '',
        },
    },
    reducers: {
        searchFilterChange: (state, action) => {
            state.searchText = action.payload;
        },
        categoryFilterChange: (state, action) => {
            state.filters.category = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCoinsDiscover.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchCoinsDiscover.fulfilled, (state, action) => {
                state.coinsList = action.payload;
                state.status = 'idle';
            })
            .addCase(fetchListTagsName.fulfilled, (state, action) => {
                state.listTagsName = action.payload;
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

export const fetchCoinsDiscover = createAsyncThunk('discover/fetchCoinsDiscover', async () => {
    const response = await marketOverviewService.getCoins();
    return response.datas;
});
export const fetchListTagsName = createAsyncThunk('discover/fetchListTagsName', async () => {
    const response = await marketOverviewService.getListOfTagsName();
    return response.datas;
});

export const fetchTrendingCoins = createAsyncThunk('coinDetail/fetchTrendingCoins', async () => {
    const response = await marketOverviewService.getCoinsTrending();
    return response.datas;
});
// => coins/fetchCoins/pending
// => coins/fetchCoins/fulfilled
// => coins/fetchCoins/rejected

export default discoverSlice;
