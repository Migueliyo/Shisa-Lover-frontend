import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

const INITIAL_STATUS = "idle";
const PENDING_STATUS = "loading";
const FULLFILLED_STATUS = "succeeded";
const REJECTED_STATUS = "failed";

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

export const deleteUser = createAsyncThunk("users/addUser", async (userId) => {
    return await api.deleteUser(userId);
});

// Slice para el almacenamiento de datos y manejo de acciones
const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    status: INITIAL_STATUS,
    error: null,
  },
  reducers: {},
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
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = REJECTED_STATUS;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
