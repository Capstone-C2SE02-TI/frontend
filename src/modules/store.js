import { configureStore } from '@reduxjs/toolkit';
import authSlice from './user/auth/authSlice';
import  HomeDashboardSlice  from './HomeDashboard/HomeDashboardSlice';


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        homeDashboard:HomeDashboardSlice.reducer
    },
});
export default store;
