export const authSelector = (state) => state.auth;
export const userInfoSelector = (state) => state.auth.user;
export const statusFindCodeOTPSelector = (state) => state.auth.statusFindCodeOTP;
export const statusSubmitCodeOTPSelector = (state) => state.auth.statusSubmitCodeOTP;
export const emailForgotPasswordSelector = (state) => state.auth.emailForgotPassword;
export const resetPasswordStatusSelector = (state) => state.auth.statusRestPassword;
export const statusLoadingSelector = (state) => state.auth.status;
export const smartContractInfoSelector = (state) => state.auth.smartContractInfo;
