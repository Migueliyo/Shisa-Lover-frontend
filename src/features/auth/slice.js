import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

import { statusActions } from "../../hooks/statusActions";
import api from "../../services/api";

const { INITIAL_STATUS, PENDING_STATUS, FULLFILLED_STATUS, REJECTED_STATUS } =
  statusActions();

// Acciones asincrónicas utilizando createAsyncThunk
export const login = createAsyncThunk("auth/login", async (credentials) => {
  return await api.login(credentials);
});

export const register = createAsyncThunk("auth/register", async (userData) => {
  return await api.register(userData);
});

export const uploadAvatar = createAsyncThunk("users/uploadUserAvatar", async (file) => {
  return await api.uploadUserAvatar(file);
});

const initialState = {
  userInfo: undefined,
  userToken: undefined,
  status: INITIAL_STATUS,
  error: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    decodedUser: (state, action) => {
      try {
        const decodedUserInfo = jwtDecode(action.payload);
        state.userInfo = decodedUserInfo;
        state.userToken = action.payload;
      } catch (error) {
        state.userInfo = {};
        state.error = error;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) {
          state.userToken = action.payload.data;
        } else {
          state.error = action.payload.message;
          state.status = REJECTED_STATUS;
        }
      })
      .addCase(login.rejected, (state) => {
        state.status = REJECTED_STATUS;
        state.error = 'Failed to fetch';
      })
      .addCase(register.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) {
          state.userToken = action.payload.data;
          try {
            const decodedUserInfo = jwtDecode(state.userToken);
            state.userInfo = decodedUserInfo;
          } catch (error) {
            state.userInfo = {};
            state.error = error;
          }
        } else {
          state.error = action.payload.message;
          state.status = REJECTED_STATUS;
        }
      })
      .addCase(register.rejected, (state) => {
        state.status = REJECTED_STATUS;
        state.error = 'Failed to fetch';
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) {
          state.userInfo = action.payload.data;
        }
      })
      .addCase(uploadAvatar.rejected, (state) => {
        state.status = REJECTED_STATUS;
        state.error = 'Failed to fetch';
      });
  },
});

export const { decodedUser } = authSlice.actions;
export default authSlice.reducer;
