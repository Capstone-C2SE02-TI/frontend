import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { sharkWalletService } from '~/services';

const sharkWalletSlide = createSlice({
    name: 'sharkWallet',
    initialState: {
        status: 'idle', sharkList: [],
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSharkWallet.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchSharkWallet.fulfilled, (state, action) => {
                state.sharkList = action.payload;
                state.status = 'idle';
            })
    },
});

export const fetchSharkWallet = createAsyncThunk('sharkWallet/fetchSharkWallet', async () => {
    const response = await sharkWalletService.getSharkWallet();
    console.log(response)
    return response.datas;
});

export default sharkWalletSlide;
