import * as httpRequest from '~/utils/httpRequest';

export const getTransactionShark = async () => {
    try {
        const response = await httpRequest.get('/display/sharks/transaction-history');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
