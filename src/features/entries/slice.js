import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { statusActions } from '../../hooks/statusActions';
import api from "../../services/api";

const {INITIAL_STATUS, PENDING_STATUS, FULLFILLED_STATUS, REJECTED_STATUS } = statusActions();

// Acciones asincrónicas utilizando createAsyncThunk
export const fetchEntries = createAsyncThunk("entries/fetchEntries", async () => {
  return await api.getEntries();
});

export const getEntryById = createAsyncThunk("entries/getEntryById", async (entryId) => {
  return await api.getEntriesById(entryId);
});

export const addEntry = createAsyncThunk("entries/addEntry", async (newData) => {
  return await api.addEntry(newData);
});

export const updateEntry = createAsyncThunk("entries/updateEntry", async (entryId, newData) => {
  return await api.updateEntry(entryId, newData);
});

export const partiallyUpdateEntry = createAsyncThunk("entries/partiallyUpdateEntry", async (entryId, partialData) => {
  return await api.partiallyUpdateEntry(entryId, partialData);
});

export const deleteEntry = createAsyncThunk("entries/deleteEntry", async (entryId) => {
  return await api.deleteEntry(entryId);
});

// Slice para el almacenamiento de datos y manejo de acciones
const entriesSlice = createSlice({
  name: "entries",
  initialState: {
    data: [],
    status: INITIAL_STATUS,
    error: undefined,
    selectedEntry: undefined,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntries.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(fetchEntries.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) state.data = action.payload.data;
      })
      .addCase(fetchEntries.rejected, (state, action) => {
        state.status = REJECTED_STATUS;
        state.error = action.data.message;
      })
      .addCase(getEntryById.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(getEntryById.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) state.selectedEntry = action.payload.data;
      })
      .addCase(getEntryById.rejected, (state, action) => {
        state.status = REJECTED_STATUS;
        state.error = action.data.message;
      })
      .addCase(addEntry.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(addEntry.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) state.data.push(action.payload.data);
      })
      .addCase(addEntry.rejected, (state, action) => {
        state.status = REJECTED_STATUS;
        state.error = action.data.message;
      })
      .addCase(updateEntry.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(updateEntry.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) {
          const updatedEntry = action.payload.data;
          state.data = state.data.map(entry =>
            entry.id === updatedEntry.id ? updatedEntry : entry
          );
        }
      })
      .addCase(updateEntry.rejected, (state, action) => {
        state.status = REJECTED_STATUS;
        state.error = action.data.message;
      })
      .addCase(partiallyUpdateEntry.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(partiallyUpdateEntry.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) {
          const updatedEntry = action.payload.data;
          state.data = state.data.map(entry =>
            entry.id === updatedEntry.id ? updatedEntry : entry
          );
        }
      })
      .addCase(partiallyUpdateEntry.rejected, (state, action) => {
        state.status = REJECTED_STATUS;
        state.error = action.data.message;
      })
      .addCase(deleteEntry.pending, (state) => {
        state.status = PENDING_STATUS;
      })
      .addCase(deleteEntry.fulfilled, (state, action) => {
        state.status = FULLFILLED_STATUS;
        if (!action.payload.error) {
          const { entryId } = action.meta.arg;
          state.data = state.data.filter(entry => entry.id !== entryId);
        }
      })
      .addCase(deleteEntry.rejected, (state, action) => {
        state.status = REJECTED_STATUS;
        state.error = action.data.message;
      });
  },
});

export default entriesSlice.reducer;
