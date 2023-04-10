import * as httpRequest from '~/utils/httpRequest';

export const getAllBlogs = async () => {
  try {
    const response = await httpRequest.get('/blog/all');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogsByType = async (type) => {
  try {
    const response = await httpRequest.get(`/blog/all?type=${type}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDetailBlog = async (blogId) => {
  try {
    const response = await httpRequest.get(`/blog/detail/${blogId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
