import * as httpRequest from '~/utils/httpRequest';

export const getTransactionShark = async (body, options = {}) => {
    try {
        const response = await httpRequest.post('/display/sharks/transaction-history', body, options);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getTransactionSharkLength = async (body, options = {}) => {
    try {
        const response = await httpRequest.post('/display/sharks/transaction-history/page-length', body, options);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getTotalTransaction = async () => {
    try {
        const response = await httpRequest.get('/display/sharks/transaction-history/length');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getTotalUser = async () => {
    try {
        const response = await httpRequest.get('/display/users/length');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getTotalShark = async () => {
    try {
        const response = await httpRequest.get('/display/sharks/length');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

