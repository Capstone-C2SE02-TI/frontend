import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { blogDetailService } from '~/services';

const blogDetailSlice = createSlice({
  name: 'blogDetail',
  initialState: {
    blogDetail: {},
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
      });
  },
});

export const fetchBlogDetail = createAsyncThunk('blogDetail/fetchBlogDetail', async (blogId) => {
  const response = await blogDetailService.getDetailBlog(blogId);
  return response.data;
});

export default blogDetailSlice;
