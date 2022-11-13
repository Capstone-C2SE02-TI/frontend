import * as httpRequest from '~/utils/httpRequest';

export const getStatusSwapToken = async (hashTransaction) => {
    try {
        const response = await httpRequest.get('/user/profile');
        return response;
    } catch (error) {
        console.log(error);
    }
};
