import { configureStore } from '@reduxjs/toolkit';
import authSlice from './user/auth/authSlice';
import  homeDashboardSlice  from './HomeDashboard/homeDashboardSlice';
import discoverSlice from './Discover/discoverSlice';


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        homeDashboard: homeDashboardSlice.reducer,
        discoverCoins: discoverSlice.reducer,
    },
});
export default store;
