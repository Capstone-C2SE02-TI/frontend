import * as httpRequest from '~/utils/httpRequest';

export const getDetailBlog = async (blogId) => {
  try {
    const response = await httpRequest.get(`/blog/detail/${blogId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogCommentList = async (blogId) => {
  try {
    const response = await httpRequest.get(`/comment/list?blogId=${blogId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createBlogComment = async (comment) => {
  try {
    const response = await httpRequest.post('/comment/create', comment);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const replyBlogComment = async (comment) => {
  try {
    const response = await httpRequest.post('/comment/reply', comment);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
