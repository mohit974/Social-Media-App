import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api/index.js";

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ formData, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.signIn(formData);
      navigate("/");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ formData, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await api.signUp(formData);
      navigate("/");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { authData: null },
  reducers: {
    logout: (state) => {
      state.authData = null;
      localStorage.clear();
    },
    googlesignup: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.authData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.authData = action.payload;
      })
      .addCase(signup.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.authData = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        console.log(action.error.message);
      })
      .addCase(signup.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export const { logout, googlesignup } = authSlice.actions;

export default authSlice.reducer;
