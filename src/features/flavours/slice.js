import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { statusActions } from '../../hooks/statusActions';
import api from "../../services/api";

const {INITIAL_STATUS, PENDING_STATUS, FULLFILLED_STATUS, REJECTED_STATUS } = statusActions();

// Acciones asincrónicas utilizando createAsyncThunk
export const fetchFlavours = createAsyncThunk("flavours/fetchFlavours", async () => {
  return await api.getFlavours();
});

export const getFlavourById = createAsyncThunk("flavours/getFlavourById", async (flavourId) => {
  return await api.getFlavourById(flavourId);
});

export const addFlavour = createAsyncThunk("flavours/addFlavour", async (newData) => {
  return await api.addFlavour(newData);
});

export const updateFlavour = createAsyncThunk("flavours/updateFlavour", async (flavourId, newData) => {
  return await api.updateFlavour(flavourId, newData);
});

export const partiallyUpdateFlavour = createAsyncThunk("flavours/partiallyUpdateFlavour", async (flavourId, partialData) => {
  return await api.partiallyUpdateFlavour(flavourId, partialData);
});

export const deleteFlavour = createAsyncThunk("flavours/deleteFlavour", async (flavourId) => {
  return await api.deleteFlavour(flavourId);
});

// Slice para el almacenamiento de datos y manejo de acciones
const flavoursSlice = createSlice({
  name: "flavours",
  initialState: {
    data: [],
    status: INITIAL_STATUS,
    error: undefined,
    selectedFlavour: undefined,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlavours.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(fetchFlavours.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) state.data = action.payload.data;
      })
      .addCase(fetchFlavours.rejected, (state, action) => {
        state.status = REJECTED_STATUS;
        state.error = action.data.message;
      })
      .addCase(getFlavourById.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(getFlavourById.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) state.selectedFlavour = action.payload.data;
      })
      .addCase(getFlavourById.rejected, (state, action) => {
        state.status = REJECTED_STATUS;
        state.error = action.data.message;
      })
      .addCase(addFlavour.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(addFlavour.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) state.data.push(action.payload.data);
      })
      .addCase(addFlavour.rejected, (state, action) => {
        state.status = REJECTED_STATUS;
        state.error = action.data.message;
      })
      .addCase(updateFlavour.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(updateFlavour.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) {
          const updatedFlavour = action.payload.data;
          state.data = state.data.map(flavour =>
            flavour.id === updatedFlavour.id ? updatedFlavour : flavour
          );
        }
      })
      .addCase(updateFlavour.rejected, (state, action) => {
        state.status = REJECTED_STATUS;
        state.error = action.data.message;
      })
      .addCase(partiallyUpdateFlavour.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(partiallyUpdateFlavour.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) {
          const updatedFlavour = action.payload.data;
          state.data = state.data.map(flavour =>
            flavour.id === updatedFlavour.id ? updatedFlavour : flavour
          );
        }
      })
      .addCase(partiallyUpdateFlavour.rejected, (state, action) => {
        state.status = REJECTED_STATUS;
        state.error = action.data.message;
      })
      .addCase(deleteFlavour.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(deleteFlavour.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) {
          const { flavourId } = action.meta.arg;
          state.data = state.data.filter(flavour => flavour.id !== flavourId);
        }
      })
      .addCase(deleteFlavour.rejected, (state, action) => {
        state.status = REJECTED_STATUS;
        state.error = action.data.message;
      });
  },
});

export default flavoursSlice.reducer;
