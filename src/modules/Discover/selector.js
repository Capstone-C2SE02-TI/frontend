import { createSelector } from '@reduxjs/toolkit';

export const statusCoinsSelector = (state) => state.discoverCoins.status;
export const coinsListSelector = (state) => state.discoverCoins.coinsList;
export const listTagsNameSelector = (state) => state.discoverCoins.listTagsName;
export const searchTextSelector = (state) => state.discoverCoins.searchText;
export const tagnameTextSelector = (state) => state.discoverCoins.filters.category;
export const trendingCoinsSelector = (state) => state.discoverCoins.trendingCoins;

export const coinsRemainingSelector = createSelector(
    coinsListSelector,
    searchTextSelector,
    tagnameTextSelector,
    (coinsList, searchText, tagname) => {
        
        return coinsList.filter((coin) => {
       
            if (tagname) {
                return (
                    (coin.tagNames?.includes(tagname) && coin.name.toLowerCase().includes(searchText.toLowerCase())) 
                );
            } else
                return (
                    coin.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    coin.symbol.toLowerCase().includes(searchText.toLowerCase())
                );
        });
    },
);
