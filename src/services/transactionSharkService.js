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
        const response = await httpRequest.post('/display/sharks/transaction-history/length', body, options);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
