import { configureStore } from '@reduxjs/toolkit';
import authSlice from './user/auth/authSlice';
import  homeDashboardSlice  from './HomeDashboard/homeDashboardSlice';
import discoverSlice from './Discover/discoverSlice';
import coinDetailSlice from './CoinDetail/coinDetailSlice';
import sharkWalletSlice from './SharkWallet/sharkWalletSlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        homeDashboard: homeDashboardSlice.reducer,
        discoverCoins: discoverSlice.reducer,
        coinDetail: coinDetailSlice.reducer,
        sharkWallet: sharkWalletSlice.reducer,
    },
});
export default store;
