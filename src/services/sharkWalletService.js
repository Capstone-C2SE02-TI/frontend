import * as httpRequest from '~/utils/httpRequest';

export const getSharkWallet = async (id) => {
    try {
  
        const response = await httpRequest.get('/display/sharks', {
            params: {
                userId: id,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getCryptoSharkWallet = async (sharkId) => {
    try {
        const response = await httpRequest.get('/display/shark/crypto', {
            params: {
                sharkId,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getTransactionHistorySharkWallet = async (id) => {
    try {
        const response = await httpRequest.get('/display/shark/transaction-history', {
            params: {
                id,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


export const followSharkWallet = async (data) => {
    try {
        const response = await httpRequest.post('/user/follow-shark-wallet', data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const followUnSharkWallet = async (data) => {
    try {
        const response = await httpRequest.post('/user/unfollow-shark-wallet', data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

