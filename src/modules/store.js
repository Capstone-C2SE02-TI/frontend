import { configureStore } from '@reduxjs/toolkit';
import authSlice from './user/auth/authSlice';
import homeDashboardSlice from './HomeDashboard/homeDashboardSlice';
import discoverSlice from './Discover/discoverSlice';
import coinDetailSlice from './CoinDetail/coinDetailSlice';
import sharkWalletSlice from './SharkWallet/sharkWalletSlice';
import transactionSharkSlice from './TransactionShark/transactionSharkSlice';
import gainLossSlice from './GainLoss/gainLossSlice';
import sharkFollowedSlice from './SharkFollowed/sharkFollowedSlice';
import portfolioSlice from './Portfolio/portfolioSlice';
import MetaMaskSlice from './MetaMask/metaMaskSlice';
import blogSlice from './Blog/blogSlice';
import blogDetailSlice from './BlogDetail/blogDetailSlice';

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
    portfolio: portfolioSlice.reducer,
    metaMask: MetaMaskSlice.reducer,
    blog: blogSlice.reducer,
    blogDetail: blogDetailSlice.reducer,
  },
});

export default store;
