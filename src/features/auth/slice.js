import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

import { statusActions } from "../../hooks/statusActions";
import api from "../../api/api";

const { INITIAL_STATUS, PENDING_STATUS, FULLFILLED_STATUS, REJECTED_STATUS } =
  statusActions();

// Acciones asincrónicas utilizando createAsyncThunk
export const login = createAsyncThunk("auth/login", async (credentials) => {
  return await api.login(credentials);
});

export const register = createAsyncThunk("auth/register", async (userData) => {
  return await api.register(userData);
});

const initialState = {
  userInfo: {},
  userToken: null,
  status: INITIAL_STATUS,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state) => {
      if (state.userToken) {
        try {
          const decodedUserInfo = jwtDecode(state.userToken);
          state.userInfo = decodedUserInfo;
        } catch (error) {
          state.userInfo = {};
          state.error = error;
        }
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
          setUser();
        } else state.error = action.payload.error;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = REJECTED_STATUS;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) {
          state.userToken = action.payload.data;
          setUser();
        } else state.error = action.payload.error;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = REJECTED_STATUS;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;

export const { setUser } = authSlice.actions;
