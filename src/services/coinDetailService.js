import * as httpRequest from '~/utils/httpRequest';

export const getCoinDetail = async (symbol) => {
    try {
        const response = await httpRequest.get('/display/coin/details', {
            params: {
                symbol,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getTokensTrending = async () => {
    try {
        const response = await httpRequest.get('/display/tokens/trending');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


export const getCoinsTrending = async () => {
    try {
        const response = await httpRequest.get('/display/coins/trending');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
