import axios from 'axios';

const httpRequest = axios.create({
    baseURL: "https://trackscan-be.azurewebsites.net",
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response;
};

export const post = async (path, body, options) => {
    const response = await httpRequest.post(path, body, options);
    return response;
};

export default httpRequest;
