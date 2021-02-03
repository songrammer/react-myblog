import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: 'idle',
  error: null,
  done: null,
  posts: [],
};

export const fetchLoadPosts = createAsyncThunk(
  'loadPostsfetch',
  async (postData, { getState, rejectWithValue }) => {
    const { loading } = getState().user;
    console.log(loading);
    try {
      const response = await axios.get('/post/loadposts');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchAddPost = createAsyncThunk(
  'addPostfetch',
  async (postData, { getState, rejectWithValue }) => {
    const { loading } = getState().user;
    console.log(loading);
    try {
      const response = await axios.post('/post/addpost', postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const fetchEditPost = createAsyncThunk(
  'editPostfetch',
  async (postData, { getState, rejectWithValue }) => {
    const { loading } = getState().user;
    console.log(loading);
    try {
      const response = await axios.post(
        `/post/editPost/${postData.id}`,
        postData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchDeletePost = createAsyncThunk(
  'deletePost',
  async (postData, { getState, rejectWithValue }) => {
    const { loading } = getState().user;
    console.log('goDeletePost111', loading);
    // if (loading !== 'pending') {
    //   return;
    // }
    console.log('goDeletePost2', loading);
    try {
      const response = await axios.delete(`/post/deletePost/${postData}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const freeBoardSlice = createSlice({
  name: 'freeboard',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoadPosts.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.done = null;
        }
      })
      .addCase(fetchLoadPosts.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.done = 'LoadPostsfulfilled';
        console.log(action);
        state.posts = action.payload;
      })
      .addCase(fetchLoadPosts.rejected, (state, action) => {
        state.loading = 'idle';
        console.log('rejected');
        console.log(action.error.message);
        state.error = action.payload.error;
      })
      .addCase(fetchAddPost.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.done = null;
        }
      })
      .addCase(fetchAddPost.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.done = 'AddPostfulfilled';
        console.log(action);
        state.posts.unshift(action.payload);
      })
      .addCase(fetchAddPost.rejected, (state, action) => {
        state.loading = 'idle';
        console.log('rejected');
        console.log(action.error.message);
        state.error = action.payload.error;
      })
      .addCase(fetchEditPost.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.done = null;
        }
      })
      .addCase(fetchEditPost.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.done = 'EditPostfulfilled';
        console.log(action.payload);

        const index = state.posts.findIndex((v) => v.id === action.payload.id);
        console.log(index);
        state.posts[index] = action.payload;
        // state.posts.unshift(action.payload);
      })
      .addCase(fetchEditPost.rejected, (state, action) => {
        state.loading = 'idle';
        console.log('rejected');
        console.log(action.error.message);
        if (action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(fetchDeletePost.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.done = null;
        }
      })
      .addCase(fetchDeletePost.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.done = 'DeletePostfulfilled';
        console.log(action);
        state.posts = state.posts.filter(
          (v) => v.id !== parseInt(action.payload.postId, 10),
        );
      })
      .addCase(fetchDeletePost.rejected, (state, action) => {
        state.loading = 'idle';
        console.log('rejected');
        console.log(action.error.message);
        state.error = action.payload.error;
      });
  },
});

export default freeBoardSlice;