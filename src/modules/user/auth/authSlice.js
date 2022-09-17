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
            .addCase(fetchAuth.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.status = 'idle';
            });
    },
});

export const fetchAuth = createAsyncThunk('/auth/signin', async (body) => {
    const response = await authService.signIn(body);
    console.log({response});
    return response;
});

export default authSlice;
