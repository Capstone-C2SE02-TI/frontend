import * as httpRequest from '~/utils/httpRequest';

export const getGainLossShark = async (isGane) => {
    try {
        const response = await httpRequest.get(`/display/sharks/gain-loss?isLoss=${isGane}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getGainLossCrypto = async (isGane) => {
    try {
        const response = await httpRequest.get(`/display/coins/gain-loss?isLoss=${isGane}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
