import * as httpRequest from '~/utils/httpRequest';

export const getSharkFollowed = async (sharkId) => {
    try {
        const response = await httpRequest.get(`/user/list-followed-shark?userId=${sharkId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};