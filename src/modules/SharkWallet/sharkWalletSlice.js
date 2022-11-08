import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { sharkWalletService } from '~/services';

const sharkWalletSlice = createSlice({
    name: 'sharkWallet',
    initialState: {
        status: 'idle',
        sharkList: [],
        sharkCrypto: [],
        sharkTransactionHistory: [],
        sharkWalletId: 1,
        sharkWalletAddress: '',
        sharkWalletTotalAssets: 0,
        sharkInfo: '',
    },

    reducers: {
        actionSelectedSharkWalletId: (state, action) => {
            state.sharkWalletId = action.payload;
        },
        actionSelectedSharkWalletAddress: (state, action) => {
            state.sharkWalletAddress = action.payload;
        },
        actionSelectedSharkWalletTotalAssets: (state, action) => {
            state.sharkWalletTotalAssets = action.payload;
        },
        actionSharkInfo: (state, action) => {
            state.sharkInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSharkWallet.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchSharkWallet.fulfilled, (state, action) => {
                const data = action.payload;
                state.sharkList = data;
                state.sharkWalletAddress = data[0].walletAddress;
                state.sharkWalletId = data[0].id;
                state.status = 'idle';
            })
            .addCase(fetchCryptoSharkWallet.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchCryptoSharkWallet.fulfilled, (state, action) => {
                state.sharkCrypto = action.payload;
                state.status = 'idle';
            })

            .addCase(fetchTransactionHistorySharkWallet.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTransactionHistorySharkWallet.fulfilled, (state, action) => {
                state.sharkTransactionHistory = action.payload;
                state.status = 'idle';
            });
    },
});

export const fetchSharkWallet = createAsyncThunk('sharkWallet/fetchSharkWallet', async () => {
    const response = await sharkWalletService.getSharkWallet();
 
    return response.datas;
});

export const fetchCryptoSharkWallet = createAsyncThunk('sharkWallet/fetchCryptoSharkWallet', async (sharkId) => {
    const response = await sharkWalletService.getCryptoSharkWallet(sharkId);
    return response.datas;
});


export const fetchTransactionHistorySharkWallet = createAsyncThunk(
    'sharkWallet/fetchTransactionHistorySharkWallet',
    async (id) => {
        const response = await sharkWalletService.getTransactionHistorySharkWallet(id);
        return response.datas;
    },
);

export default sharkWalletSlice;
