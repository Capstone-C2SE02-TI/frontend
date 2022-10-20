import * as httpRequest from '~/utils/httpRequest';

export const getSharkWallet = async () => {
    try {
        const response = await httpRequest.get('/display/sharks');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
