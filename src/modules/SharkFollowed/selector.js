export const sharkFollowedSelector = (state) => state.sharkFollowed.sharkFollowedList;
export const transactionHistorySelector = (state) => state.sharkFollowed.transactionHistory;
export const newTransactionsSelector = (state) => state.sharkFollowed.notifyTransactions;
export const sharkLoadingSelector = (state) => state.sharkFollowed.status;
export const loadingTransactionSelector = (state) => state.sharkFollowed.loadingTransaction;