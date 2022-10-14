import { configureStore } from '@reduxjs/toolkit';
import authSlice from './user/auth/authSlice';
import  homeDashboardSlice  from './HomeDashboard/homeDashboardSlice';
import discoverSlice from './Discover/discoverSlice';
import coinDetailSlice from './CoinDetail/coinDetailSlice';


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        homeDashboard: homeDashboardSlice.reducer,
        discoverCoins: discoverSlice.reducer,
        coinDetail: coinDetailSlice.reducer,
    },
});
export default store;
