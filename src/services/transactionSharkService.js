import * as httpRequest from '~/utils/httpRequest';

export const getTransactionShark = async (pageNum) => {
    try {
        const response = await httpRequest.get(`/display/sharks/transaction-history?page=${pageNum}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
