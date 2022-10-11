import * as httpRequest from '~/utils/httpRequest';


export const getCoins = async (page) => {
    try {
        const response = await httpRequest.get('/display/coins', {
            params: {
                page,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


export const getTokens = async (page) => {
    try {
        const response = await httpRequest.get('/display/tokens', {
            params: {
                page,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};