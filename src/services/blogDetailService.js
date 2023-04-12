import * as httpRequest from '~/utils/httpRequest';

export const getDetailBlog = async (blogId) => {
  try {
    const response = await httpRequest.get(`/blog/detail/${blogId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
