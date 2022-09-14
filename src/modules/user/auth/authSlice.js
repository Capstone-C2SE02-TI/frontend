import { createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';


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
        }
    }
});

export default authSlice
