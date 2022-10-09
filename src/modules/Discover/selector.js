
import { createSelector } from "@reduxjs/toolkit";

export const statusCoinsSelector = (state) => state.discoverCoins.status;
export const coinsListSelector = (state) => state.discoverCoins.coinsList;
export const searchTextSelector = (state) => state.discoverCoins.searchText;


export const coinsRemainingSelector = createSelector(coinsListSelector, searchTextSelector, (coinsList, searchText) => {
    return coinsList.filter((coin) => {
        return (
            coin.name.toLowerCase().includes(searchText.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchText.toLowerCase())
        );
    });
});