import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '~/services';
import _ from 'lodash';
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'idle',
        user: {},
        statusFindCodeOTP: {},
        statusSubmitCodeOTP: {},
        statusRestPassword: {},
        smartContractInfo: { walletAddress: '', balance: '', ratio: '', premiumPrices: ['', '', ''] },
        emailForgotPassword: '',
        isPremiumUser: '',
        expiredTime: '',
    },

    reducers: {


        authSignIn: (state, action) => {
            state.isLoggedIn = !state.isLoggedIn;
            state.user = action.payload;
        },
        authEmailForgotPassword: (state, action) => {
            state.emailForgotPassword = action.payload;
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
        // saveContractPremium: (state, action) => {
        //     state.contractPremium = action.payload;
        // },
        resetAllPassword: (state, action) => {
            state.statusRestPassword = {};
            state.statusSubmitCodeOTP = {};
            state.statusFindCodeOTP = {};
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
                console.log(action);
            })
    },
});

export const fetchGetUserInfo = createAsyncThunk('auth/fetchGetUserInfo', async (userId) => {
    const response = await authService.getUserInfo(userId);
    return response.data;
});

export const fetchGetUserSignup= createAsyncThunk('auth/fetchGetUserSignup', async (walletData) => {
  try {
    const response = await authService.signUp(walletData);
    console.log({response});
    return response.data;
  }
  catch (err) {
    console.log(err);
  }
});

export default authSlice;

export const { saveExpiredTime, saveUserPremium, saveContractPremium, saveSmartContractInfo, resetAllPassword } =
    authSlice.actions;
