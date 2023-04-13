import * as httpRequest from '~/utils/httpRequest';

export const getDetailBlog = async (blogId) => {
  try {
    const response = await httpRequest.get(`/blog/detail/${blogId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogCommentList = async () => {
  try {
    console.log('hiiiiiiiiiiiiiiiiiiii');
    const response = await httpRequest.get('/comment/list');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
