import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api/index.js";

export const fetchPost = createAsyncThunk("posts/fetchPost", async (id) => {
  const response = await api.fetchPost(id);
  return response.data;
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (page) => {
  const response = await api.fetchPosts(page);
  return response.data;
});

export const fetchPostsBySearch = createAsyncThunk(
  "posts/fetchPostsBySearch",
  async (searchQuery) => {
    const response = await api.fetchPostsBySearch(searchQuery);
    return response.data.data;
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ post, navigate }) => {
    const response = await api.createPost(post);
    navigate(`/posts/${response.data._id}`);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, post }) => {
    const response = await api.updatePost(id, post);
    return response.data;
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await api.deletePost(id);
  return id;
});

export const likePost = createAsyncThunk("posts/likePost", async (id) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const response = await api.likePost(id, user?.token);
  return response.data;
});

export const commentPost = createAsyncThunk(
  "posts/commentPost",
  async ({ value, id }) => {
    // console.log("before", value);
    const response = await api.comment(value, id);
    // console.log("after", response.data);
    return response.data;
  }
);

const initialState = {
  isLoading: true,
  posts: [],
  post: null,
  currentPage: 1,
  numberOfPages: 1,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(fetchPost.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchPostsBySearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostsBySearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsBySearch.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(likePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(likePost.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(commentPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(commentPost.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default postsSlice.reducer;
