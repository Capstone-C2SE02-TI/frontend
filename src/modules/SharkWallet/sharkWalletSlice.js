import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { sharkWalletService } from '~/services';

const sharkWalletSlice = createSlice({
    name: 'sharkWallet',
    initialState: {
        status: 'idle',
        sharkList: [],
        newSharkList: [],
        sharkCrypto: [],
        searchTextCrypto: '',
        sharkTransactionHistory: [],
        sharkWalletId: 1,
        sharkWalletAddress: '',
        sharkWalletTotalAssets: 0,
        sharkInfo: '',
        filterSharkTotalAssets: '',
        searchFilterChange: '',
        sharkDetail: '',
        tradeTransactionHistory: '',
        addNewShark: '',
        newSharkQuantity: 0,
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
        actionFilterSharkTotalAssets: (state, action) => {
            state.filterSharkTotalAssets = action.payload;
        },
        actionSharkNoData: (state, action) => {
            state.sharkCrypto = action.payload;
            state.sharkInfo = action.payload;
            state.sharkTransactionHistory = action.payload;
        },
        searchFilterChange: (state, action) => {
            state.searchFilterChange = action.payload;
        },
        searchTextCryptoWallet: (state, action) => {
            state.searchTextCrypto = action.payload;
        },
        resetSharkDetail: (state, action) => {
            state.sharkDetail = action.payload;
            state.addNewShark = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSharkWallet.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchSharkWallet.fulfilled, (state, action) => {
                const data = action.payload;
                state.sharkList = data.filter((shark) => +shark.totalAssets > 0);
                state.newSharkList = data.filter((shark) => +shark.totalAssets === 0);
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
            })

            .addCase(fetchFollowSharkWallet.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.sharkDetail = data;

                state.status = 'idle';
                const newListShark = state.sharkList.map((shark) => {
                    if (shark.sharkId === data.sharkId) {
                        return { ...shark, isFollowed: true };
                    } else return shark;
                });
                state.sharkList = newListShark;
            })

            .addCase(fetchUnFollowSharkWallet.fulfilled, (state, action) => {
                const { data } = action.payload;

                state.sharkDetail = data;
                state.status = 'idle';
                const newShark = state.sharkList.map((shark) => {
                    if (shark.sharkId === data.sharkId) {
                        return { ...shark, isFollowed: false };
                    } else return shark;
                });
                state.sharkList = newShark;
            })

            .addCase(fetchTradeTransactionHistory.fulfilled, (state, action) => {
                state.tradeTransactionHistory = action.payload;
            })

            .addCase(fetchAddNewShark.fulfilled, (state, action) => {
                const { data, error } = action.payload;

                if (error) {
                    state.addNewShark = action.payload;
                } else {
                    state.addNewShark = data;
                    state.addNewShark.newShark = true;
                    state.newSharkList = [state.addNewShark, ...state.newSharkList];
                    state.newSharkQuantity = state.newSharkQuantity + 1;
                }
            });
    },
});

export const fetchSharkWallet = createAsyncThunk('sharkWallet/fetchSharkWallet', async (walletAddress) => {
    const response = await sharkWalletService.getSharkWallet(walletAddress);
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

export const fetchFollowSharkWallet = createAsyncThunk('sharkWallet/fetchFollowSharkWallet', async (data) => {
    const response = await sharkWalletService.followSharkWallet(data);
    return response;
});

export const fetchUnFollowSharkWallet = createAsyncThunk('sharkWallet/fetchUnFollowSharkWallet', async (data) => {
    const response = await sharkWalletService.followUnSharkWallet(data);
    return response;
});

export const fetchTradeTransactionHistory = createAsyncThunk(
    'sharkWallet/fetchTradeTransactionHistory',
    async (body) => {
        const response = await sharkWalletService.tradeTransactionHistory(body);
        return response;
    },
);

export const fetchAddNewShark = createAsyncThunk('sharkWallet/fetchAddNewShark', async (body) => {
    const response = await sharkWalletService.addNewSharkWallet(body);
    return response;
});

export default sharkWalletSlice;

export const { searchTextCryptoWallet, resetSharkDetail } = sharkWalletSlice.actions;
