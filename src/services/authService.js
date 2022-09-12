import * as httpRequest from '~/utils/httpRequest';

export const signUp = async (body) => {
    try {
        console.log(body);
        const response = await httpRequest.post('/auth/signup', body);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
    //  console.log(body);
    //  const response = await httpRequest.post('/auth/signup', body);
    //  return response.data;
};

export const getUsers = async () => {
    try {
        const response = await httpRequest.get('/users/suggested');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// export const signIn = async (data) => {
//     try {
//         console.log(data);
//         const response = await httpRequest.post('/auth/signin', {
//             method: 'POST',
//             body: JSON.stringify(data)  ,
//             headers: {
//                 X_Authorization: 'Bearer'
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.log(error);
//     }
// };