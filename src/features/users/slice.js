import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { statusActions } from '../../hooks/statusActions';
import api from "../../services/api";

const {INITIAL_STATUS, PENDING_STATUS, FULLFILLED_STATUS, REJECTED_STATUS } = statusActions();

// Acciones asincrónicas utilizando createAsyncThunk
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await api.getUsers();
});

export const getUserById = createAsyncThunk("users/getUserById", async (userId) => {
  return await api.getUserById(userId);
});

export const addUser = createAsyncThunk("users/addUser", async (newData) => {
  return await api.addUser(newData);
  });

export const updateUser = createAsyncThunk("users/updateUser", async (userId, newData) => {
  return await api.updateUser(userId, newData);
});

export const partiallyUpdateUser = createAsyncThunk("users/partiallyUpdateUser", async (userId, partialData) => {
  return await api.partiallyUpdateUser(userId, partialData);
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (userId) => {
  return await api.deleteUser(userId);
});

// Slice para el almacenamiento de datos y manejo de acciones
const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    status: INITIAL_STATUS,
    error: undefined,
    selectedUser: undefined,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error)
            state.data = action.payload.data
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = REJECTED_STATUS;
        state.error = 'Failed to fetch';
      })
      .addCase(getUserById.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) state.selectedUser = action.payload.data;
      })
      .addCase(getUserById.rejected, (state) => {
        state.status = REJECTED_STATUS;
        state.error = 'Failed to fetch';
      })
      .addCase(addUser.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) state.data.push(action.payload.data);
      })
      .addCase(addUser.rejected, (state) => {
        state.status = REJECTED_STATUS;
        state.error = 'Failed to fetch';
      })
      .addCase(updateUser.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) {
          const updatedUser = action.payload.data;
          state.data = state.data.map(user =>
            user.id === updatedUser.id ? updatedUser : user
          );
        }
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = REJECTED_STATUS;
        state.error = 'Failed to fetch';
      })
      .addCase(partiallyUpdateUser.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(partiallyUpdateUser.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) {
          const updatedUser = action.payload.data;
          state.data = state.data.map(user =>
            user.id === updatedUser.id ? updatedUser : user
          );
        }
      })
      .addCase(partiallyUpdateUser.rejected, (state) => {
        state.status = REJECTED_STATUS;
        state.error = 'Failed to fetch';
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) {
          const { userId } = action.meta.arg;
          state.data = state.data.filter(user => user.id !== userId);
        }
      })
      .addCase(deleteUser.rejected, (state) => {
        state.status = REJECTED_STATUS;
        state.error = 'Failed to fetch';
      });
  },
});

export default usersSlice.reducer;
