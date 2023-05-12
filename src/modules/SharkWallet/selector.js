import { createSelector } from '@reduxjs/toolkit';

export const sharkListSelector = (state) => state.sharkWallet.sharkList;
export const newSharkListSelector = (state) => state.sharkWallet.newSharkList;
export const sharkCryptoSelector = (state) => state.sharkWallet.sharkCrypto;
export const searchSharkCryptoSelector = (state) => state.sharkWallet.searchTextCrypto;
export const sharkCryptoStatusSelector = (state) => state.sharkWallet.status;
export const sharkTransactionHistorySelector = (state) => state.sharkWallet.sharkTransactionHistory;
export const sharkWalletIdSelector = (state) => state.sharkWallet.sharkWalletId;
export const sharkWalletAddressSelector = (state) => state.sharkWallet.sharkWalletAddress;
export const sharkWalletTotalAssetsSelector = (state) => state.sharkWallet.sharkWalletTotalAssets;
export const sharkInfoSelector = (state) => state.sharkWallet.sharkInfo;
export const filterSharkTotalAssetsSelector = (state) => state.sharkWallet.filterSharkTotalAssets;
export const searchFilterChangeSelector = (state) => state.sharkWallet.searchFilterChange;
export const sharkDetailSelector = (state) => state.sharkWallet.sharkDetail;
export const tradeTransactionHistorySelector = (state) => state.sharkWallet.tradeTransactionHistory;
export const newSharkSelector = (state) => state.sharkWallet.addNewShark;
export const newSharkQuantitySelector = (state) => state.sharkWallet.newSharkQuantity;
export const loadingSelector = (state) => state.sharkWallet.status;

export const sharkRemainingSelector = createSelector(
    sharkListSelector,
    newSharkListSelector,
    filterSharkTotalAssetsSelector,
    searchFilterChangeSelector,
    (sharkList, newSharkList, filterSharkTotalAssets, searchFilterChange) => {
        console.log(sharkList);
        return sharkList.filter((shark) => {
            if (searchFilterChange) {
                return (
                    shark.sharkId.toString().includes(searchFilterChange) &&
                    shark.totalAssets >= filterSharkTotalAssets.startTotalAssets &&
                    shark.totalAssets <= filterSharkTotalAssets.endTotalAssets
                );
            } else
                return (
                    shark.totalAssets >= filterSharkTotalAssets.startTotalAssets &&
                    shark.totalAssets <= filterSharkTotalAssets.endTotalAssets
                );
        });
    },
);

export const cryptoRemainingSelector = createSelector(
    sharkCryptoSelector,
    searchSharkCryptoSelector,
    (sharkCryptos, searchFilterChange) => {
        return sharkCryptos.filter(
            (sharkCrypto) =>
                sharkCrypto.name.toLowerCase().includes(searchFilterChange.toLowerCase()) ||
                sharkCrypto.symbol.toLowerCase().includes(searchFilterChange.toLowerCase()),
        );
    },
);

export const newSharkListRemainingSelector = createSelector(
    newSharkListSelector,
    searchFilterChangeSelector,
    (newSharkList, searchFilterChange) => {
        return newSharkList.filter((newShark) => {
            return newShark._id.includes(searchFilterChange);
        });
    },
);
