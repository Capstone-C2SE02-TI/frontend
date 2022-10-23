import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '~/services';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'idle',
        user: {},
    },

    reducers: {
        authSignIn: (state, action) => {
            state.isLoggedIn = !state.isLoggedIn;
            state.user = action.payload;
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
            });
    },
});



export const fetchGetUserInfo = createAsyncThunk('auth/fetchGetUserInfo', async (userId) => {
    const response = await authService.getUserInfo(userId);

    return response.data;
});

export default authSlice;
