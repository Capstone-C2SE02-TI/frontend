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
            .addCase(fetchFindCodeOTP.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchFindCodeOTP.fulfilled, (state, action) => {
                if (action.payload === 'successfully') {
                    state.statusFindCodeOTP.successfully = action.payload;
                    state.statusFindCodeOTP.failed = '';
                } else {
                    state.statusFindCodeOTP.failed = action.payload;
                    state.statusFindCodeOTP.successfully = '';
                }
                state.status = 'idle';
            })
            .addCase(fetchSubmitCodeOTP.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchSubmitCodeOTP.fulfilled, (state, action) => {
                if (action.payload === 'successfully') {
                    state.statusSubmitCodeOTP.successfully = action.payload;
                    state.statusSubmitCodeOTP.failed = '';
                } else {
                    state.statusSubmitCodeOTP.failed = action.payload;
                    state.statusSubmitCodeOTP.successfully = '';
                }
                state.status = 'idle';
            })

            .addCase(fetchCreateNewPassword.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchCreateNewPassword.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload === 'successfully') {
                    state.statusRestPassword.successfully = action.payload;
                } else state.statusRestPassword.failed = action.payload;
            });
    },
});

export const fetchGetUserInfo = createAsyncThunk('auth/fetchGetUserInfo', async (userId) => {
    const response = await authService.getUserInfo(userId);

    return response.data;
});

export const fetchFindCodeOTP = createAsyncThunk('auth/fetchFindCodeOTP', async (email) => {
    const response = await authService.findCodeOTP({ email });

    return response.message;
});

export const fetchSubmitCodeOTP = createAsyncThunk('auth/fetchSubmitCodeOTP', async (data) => {
    const response = await authService.submitCodeOTP(data);

    return response.message;
});

export const fetchCreateNewPassword = createAsyncThunk('auth/fetchCreateNewPassword', async (data) => {
    const response = await authService.createNewPassword(data);
    return response.message;
});
export default authSlice;

export const { saveExpiredTime, saveUserPremium, saveContractPremium, saveSmartContractInfo, resetAllPassword } =
    authSlice.actions;
