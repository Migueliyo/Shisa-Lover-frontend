import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

const INITIAL_STATUS = "idle";
const PENDING_STATUS = "loading";
const FULLFILLED_STATUS = "succeeded";
const REJECTED_STATUS = "failed";

// Acciones asincrónicas utilizando createAsyncThunk
export const fetchMixes = createAsyncThunk("mixes/fetchMixes", async () => {
  return await api.getMixes();
});

export const getMixById = createAsyncThunk("mixes/getMixById", async (mixId) => {
    return await api.getMixById(mixId);
});

export const addMix = createAsyncThunk("mixes/addMix", async (newData) => {
    return await api.addMix(newData);
  });

export const updateMix = createAsyncThunk("mixes/updateMix", async (mixId, newData) => {
  return await api.updateMix(mixId, newData);
});

export const partiallyUpdateMix = createAsyncThunk("mixes/partiallyUpdateMix", async (mixId, partialData) => {
    return await api.partiallyUpdateUser(mixId, partialData);
});

export const deleteMix = createAsyncThunk("mixes/deleteMix", async (mixId) => {
    return await api.deleteUser(mixId);
});

// Slice para el almacenamiento de datos y manejo de acciones
const userSlice = createSlice({
  name: "mixes",
  initialState: {
    data: [],
    status: INITIAL_STATUS,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMixes.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(fetchMixes.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error)
            state.data = action.payload.data
      })
      .addCase(fetchMixes.rejected, (state, action) => {
        state.status = REJECTED_STATUS;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;


