import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { statusActions } from '../../hooks/statusActions';
import api from "../../services/api";

const {INITIAL_STATUS, PENDING_STATUS, FULLFILLED_STATUS, REJECTED_STATUS } = statusActions();

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
  return await api.partiallyUpdateMix(mixId, partialData);
});

export const deleteMix = createAsyncThunk("mixes/deleteMix", async (mixId) => {
  return await api.deleteMix(mixId);
});

// Slice para el almacenamiento de datos y manejo de acciones
const mixesSlice = createSlice({
  name: "mixes",
  initialState: {
    data: [],
    status: INITIAL_STATUS,
    error: undefined,
    selectedMix: undefined,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMixes.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(fetchMixes.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) state.data = action.payload.data;
      })
      .addCase(fetchMixes.rejected, (state) => {
        state.status = REJECTED_STATUS;
        state.error = 'Failed to fetch';
      })
      .addCase(getMixById.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(getMixById.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) state.selectedMix = action.payload.data;
      })
      .addCase(getMixById.rejected, (state) => {
        state.status = REJECTED_STATUS;
        state.error = 'Failed to fetch';
      })
      .addCase(addMix.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(addMix.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) state.data.push(action.payload.data);
      })
      .addCase(addMix.rejected, (state) => {
        state.status = REJECTED_STATUS;
        state.error = 'Failed to fetch';
      })
      .addCase(updateMix.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(updateMix.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) {
          const updatedMix = action.payload.data;
          state.data = state.data.map(mix =>
            mix.id === updatedMix.id ? updatedMix : mix
          );
        }
      })
      .addCase(updateMix.rejected, (state) => {
        state.status = REJECTED_STATUS;
        state.error = 'Failed to fetch';
      })
      .addCase(partiallyUpdateMix.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(partiallyUpdateMix.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) {
          const updatedMix = action.payload.data;
          state.data = state.data.map(mix =>
            mix.id === updatedMix.id ? updatedMix : mix
          );
        }
      })
      .addCase(partiallyUpdateMix.rejected, (state) => {
        state.status = REJECTED_STATUS;
        state.error = 'Failed to fetch';
      })
      .addCase(deleteMix.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(deleteMix.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) {
          const { mixId } = action.meta.arg;
          state.data = state.data.filter(mix => mix.id !== mixId);
        }
      })
      .addCase(deleteMix.rejected, (state) => {
        state.status = REJECTED_STATUS;
        state.error = 'Failed to fetch';
      });
  },
});

export default mixesSlice.reducer;
