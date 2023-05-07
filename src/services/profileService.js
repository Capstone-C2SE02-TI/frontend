import * as httpRequest from '~/utils/httpRequest';

export const getPortfolio = async (userId) => {
    try {
        const response = await httpRequest.get(`/portfolio/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};