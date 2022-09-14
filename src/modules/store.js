import { configureStore } from '@reduxjs/toolkit';
import authSlice from './user/auth/authSlice';


const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
});
export default store;
