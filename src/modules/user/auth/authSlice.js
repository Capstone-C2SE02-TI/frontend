import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '~/services';
import _ from 'lodash';
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'idle',
        user: {},
        smartContractInfo: { walletAddress: '', balance: '', ratio: '', premiumPrices: ['', '', ''] },
        isPremiumUser: '',
        expiredTime: '',
        userBuyingMetadataTransfer: '',
        listUser: []
    },

    reducers: {
        authSignIn: (state, action) => {
            state.isLoggedIn = !state.isLoggedIn;
            state.user = action.payload;
        },
        saveSmartContractInfo: (state, action) => {
            if(!_.isEmpty(action.payload)) {
                const { walletAddress, balance, ratio, premiumPrices } = action.payload;
                state.smartContractInfo.walletAddress = walletAddress;
                state.smartContractInfo.balance = balance;
                state.smartContractInfo.ratio = ratio;
                state.smartContractInfo.premiumPrices = premiumPrices;
            }
            else state.smartContractInfo =  { walletAddress: '', balance: '', ratio: '', premiumPrices: ['', '', ''] }
            
        },
        saveUserPremium: (state, action) => {
            state.isPremiumUser = action.payload;
        },
        saveExpiredTime: (state, action) => {
            state.expiredTime = action.payload;
        },
        
        saveUserBuyingMetadata: (state, action) => {
            state.userBuyingMetadataTransfer = action.payload;
        },

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchGetUserInfo.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchGetUserInfo.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = 'idle';
            })
            .addCase(fetchGetUserSignup.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchGetUserSignup.fulfilled, (state, action) => {

            })
            .addCase(fetchGetAllUser.fulfilled, (state, action) => {
                state.listUser = action.payload;
            })
    },
});

export const fetchGetUserInfo = createAsyncThunk('auth/fetchGetUserInfo', async (walletAddress) => {
    const response = await authService.getUserInfo(walletAddress);
    return response.data;
});

export const fetchGetUserSignup= createAsyncThunk('auth/fetchGetUserSignup', async (walletData) => {
  try {
    const response = await authService.signUp(walletData);
    return response.data;
  }
  catch (err) {
    console.log(err);
  }
});

export const fetchGetAllUser = createAsyncThunk('auth/fetchGetAllUser', async (walletData) => {
    try {
      const response = await authService.getAllUser();
      return response.data;
    }
    catch (err) {
      console.log(err);
    }
  });

export default authSlice;

export const {saveUserBuyingMetadata, saveExpiredTime, saveUserPremium, saveContractPremium, saveSmartContractInfo } =
    authSlice.actions;
