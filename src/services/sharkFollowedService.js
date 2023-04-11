import * as httpRequest from '~/utils/httpRequest';

export const getSharkFollowed = async (walletAddress) => {
    try {
        const response = await httpRequest.get(`/user/list-followed-shark?walletAddress=${walletAddress}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};