import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { blogService } from '~/services';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    status: 'idle',
    all: [],
    byType: [],
  },
  reducers: {
    actionSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.all = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchBlogsByType.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogsByType.fulfilled, (state, action) => {
        state.byType = action.payload;
        state.status = 'idle';
      });
  },
});

export const fetchAllBlogs = createAsyncThunk('blog/fetchAllBlogs', async () => {
  const response = await blogService.getAllBlogs();
  return response.data;
});

export const fetchBlogsByType = createAsyncThunk('blog/fetchBlogsByType', async (type) => {
  const response = await blogService.getBlogsByType(type);
  return response.data;
});

export default blogSlice;
