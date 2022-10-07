import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { marketOverviewService } from '~/services';

const discoverSlice = createSlice({
    name: 'discoverCoins',
    initialState: { status: 'idle', coinsList: [], searchText: '' },
    reducers: {
        searchFilterChange: (state, action) => {
            state.searchText = action.payload
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCoinsDiscover.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchCoinsDiscover.fulfilled, (state, action) => {
                state.coinsList = action.payload;
                state.status = 'idle';
            });
    },
});

export const fetchCoinsDiscover = createAsyncThunk('coins/fetchCoinsDiscover', async () => {
    const response = await marketOverviewService.getCoins();
    return response.datas;
});

// => coins/fetchCoins/pending
// => coins/fetchCoins/fulfilled
// => coins/fetchCoins/rejected

export default discoverSlice;
