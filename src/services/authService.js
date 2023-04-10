import * as httpRequest from '~/utils/httpRequest';

export const signUp = async (body, options = {}) => {
    try {
        const response = await httpRequest.post('/auth/signup', body, options);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const signIn = async (body, options = {}) => {
    try {
        const response = await httpRequest.post('/auth/signin', body, options);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const signOut = async () => {
    try {
        const response = await httpRequest.post('/auth/signout');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getUserInfo = async (walletAddress) => {
    try {
        const response = await httpRequest.get('/user/profile', {
            params: {
                walletAddress,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateUserInfo = async (body, ethAddress, options = {}) => {
    try {
        const response = await httpRequest.post(`/user/profile/update?walletAddress=${ethAddress}`, body, options);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getAllUser = async () => {
    try {
        const response = await httpRequest.get('/display/users');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};