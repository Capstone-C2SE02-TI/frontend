
import * as httpRequest from '~/utils/httpRequest';


export const getCoin = async (page) => {
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
