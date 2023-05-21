export const authSelector = (state) => state.auth;
export const userInfoSelector = (state) => state.auth.user;
export const statusFindCodeOTPSelector = (state) => state.auth.statusFindCodeOTP;
export const statusSubmitCodeOTPSelector = (state) => state.auth.statusSubmitCodeOTP;
export const emailForgotPasswordSelector = (state) => state.auth.emailForgotPassword;
export const resetPasswordStatusSelector = (state) => state.auth.statusRestPassword;
export const statusLoadingSelector = (state) => state.auth.status;
export const smartContractInfoSelector = (state) => state.auth.smartContractInfo;
export const userIsPremiumSelector = (state) => state.auth.isPremiumUser;
export const expiredTimeSelector = (state) => state.auth.expiredTime;
export const userBuyingMetadataSelector = (state) => state.auth.userBuyingMetadataTransfer;
export const listUserSelector = (state) => state.auth.listUser;
