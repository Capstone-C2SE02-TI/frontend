import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { blogDetailService } from '~/services';

const blogDetailSlice = createSlice({
  name: 'blogDetail',
  initialState: {
    blogDetail: {},
    commentList: [],
    newComment: {},
    newReplyComment: {},
  },
  reducers: {
    actionSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogDetail.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogDetail.fulfilled, (state, action) => {
        state.blogDetail = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchBlogCommentList.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogCommentList.fulfilled, (state, action) => {
        state.commentList = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchCreateBlogComment.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCreateBlogComment.fulfilled, (state, action) => {
        state.newComment = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchReplyBlogComment.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchReplyBlogComment.fulfilled, (state, action) => {
        state.newReplyComment = action.payload;
        state.status = 'idle';
      });
  },
});

export const fetchBlogDetail = createAsyncThunk('blogDetail/fetchBlogDetail', async (blogId) => {
  const response = await blogDetailService.getDetailBlog(blogId);
  return response.data;
});

export const fetchBlogCommentList = createAsyncThunk('blogDetail/fetchBlogCommentList', async (blogId) => {
  const response = await blogDetailService.getBlogCommentList(blogId);
  return response.data;
});

export const fetchCreateBlogComment = createAsyncThunk('blogDetail/fetchCreateBlogComment', async (comment) => {
  const response = await blogDetailService.createBlogComment(comment);
  return response.data;
});

export const fetchReplyBlogComment = createAsyncThunk('blogDetail/fetchReplyBlogComment', async (comment) => {
  const response = await blogDetailService.replyBlogComment(comment);
  return response.data;
});

export default blogDetailSlice;
