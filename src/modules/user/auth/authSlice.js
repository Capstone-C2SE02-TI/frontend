import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '~/services';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: {},
    },

    reducers: {
        authSignIn: (state, action) => {
            state.isLoggedIn = !state.isLoggedIn;
            state.user = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            console.log(action.payload);
        });
    },
});

const fetchAuth = createAsyncThunk('/auth/signin', async (body, options) => {
    const response = await authService.signIn(body, options);
    console.log({ response });

    return response;
});

export default authSlice;
