import { configureStore } from '@reduxjs/toolkit';
import authSlice from './user/auth/authSlice';
import homeDashboardSlice from './HomeDashboard/homeDashboardSlice';
import discoverSlice from './Discover/discoverSlice';
import coinDetailSlice from './CoinDetail/coinDetailSlice';
import sharkWalletSlice from './SharkWallet/sharkWalletSlice';
import transactionSharkSlice from './TransactionShark/transactionSharkSlice';
import gainLossSlice from './GainLoss/gainLossSlice';
import sharkFollowedSlice from './SharkFollowed/sharkFollowedSlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        homeDashboard: homeDashboardSlice.reducer,
        discoverCoins: discoverSlice.reducer,
        coinDetail: coinDetailSlice.reducer,
        sharkWallet: sharkWalletSlice.reducer,
        transactionShark: transactionSharkSlice.reducer,
        gainLoss: gainLossSlice.reducer,
        sharkFollowed: sharkFollowedSlice.reducer,
    },
});
export default store;
