import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '~/services';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'idle',
        user: {},
        statusFindCodeOTP: {},
        statusSubmitCodeOTP: {},
        emailForgotPassword: '' ,
    },

    reducers: {
        authSignIn: (state, action) => {
            state.isLoggedIn = !state.isLoggedIn;
            state.user = action.payload;
        },
        authEmailForgotPassword: (state, action) => {
            state.emailForgotPassword = action.payload;       
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

export default authSlice;
