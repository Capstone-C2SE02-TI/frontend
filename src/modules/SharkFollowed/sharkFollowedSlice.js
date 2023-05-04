import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { sharkFollowedService, sharkWalletService } from '~/services';

const sharkFollowedSlice = createSlice({
    name: 'sharkFollowed',
    initialState: {
        status: 'idle', sharkFollowedList: [], transactionHistory: [], profileList: [], loadingTransaction: 'idle',
    },

    reducers: {
        removeSharkFollowed: (state, action) => {
            state.sharkFollowedList = state.sharkFollowedList.filter(shark => shark.sharkId !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSharkFollowed.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchSharkFollowed.fulfilled, (state, action) => {
                const dataSharkFollowed = action.payload;
                state.sharkFollowedList = dataSharkFollowed.slice().sort((prev, next) => prev.sharkId - next.sharkId)
                state.status = 'idle';
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                const dataProfile = action.payload;
                state.profileList = dataProfile.slice().sort((prev, next) => prev.sharkId - next.sharkId)
                state.status = 'idle';
            })
            .addCase(fetchUnFollowPortfolio.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchUnFollowPortfolio.fulfilled, (state, action) => {
                // const { data } = action.payload;

                // state.sharkDetail = data;
                // state.status = 'idle';
                // const newShark = state.sharkList.map((shark) => {
                //     if (shark.sharkId === data._doc.sharkId) {
                //         return { ...shark, isFollowed: false };
                //     } else return shark;
                // });
                // state.sharkList = newShark;
            })

            .addCase(fetchTransactionHistoryPortfolio.pending, (state, action) => {
                state.loadingTransaction = 'loading';
            })
            .addCase(fetchTransactionHistoryPortfolio.fulfilled, (state, action) => {
                state.transactionHistory = action.payload;
                state.loadingTransaction = 'idle';
            })
    },
});

export const fetchSharkFollowed = createAsyncThunk('sharkFollowed/fetchSharkFollowed', async (sharkId) => {
    const response = await sharkFollowedService.getSharkFollowed(sharkId);
    return response.datas;
});

export const fetchProfile = createAsyncThunk('sharkFollowed/fetchProfile', async (sharkId) => {
    const response = await sharkFollowedService.getProfile(sharkId);
    return response.datas;
});

export const fetchUnFollowPortfolio = createAsyncThunk('sharkFollowed/fetchUnFollowPortfolio', async (data) => {
    const response = await sharkWalletService.followUnSharkWallet(data);
    return response;
});



export const fetchTransactionHistoryPortfolio = createAsyncThunk(
    'sharkFollowed/fetchTransactionHistoryPortfolio',
    async (id) => {

        const response = await sharkWalletService.getTransactionHistorySharkWallet(id);

        return response.datas;
    },
);


export default sharkFollowedSlice;

export const {
    removeSharkFollowed
} = sharkFollowedSlice.actions
