import * as httpRequest from '~/utils/httpRequest';

export const signUp = async (body, options={}) => {
    try {
        const response = await httpRequest.post('/auth/signup', body, options);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const signIn = async (body, options = {}) => {
    try {
        const response = await httpRequest.post('/auth/signin', body, options);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getUsers = async () => {
    try {
        const response = await httpRequest.get('/users/suggested');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

