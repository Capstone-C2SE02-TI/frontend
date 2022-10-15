import * as httpRequest from '~/utils/httpRequest';


export const getCoins = async () => {
    try {
        const response = await httpRequest.get('/display/coins-and-tokens/all');
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


export const getListOfTagsName = async () => {
    try {
        const response = await httpRequest.get('/display/tags');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
