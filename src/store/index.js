import { configureStore } from "@reduxjs/toolkit";
import mixesReducer from "./mixes/slice"

export const store = configureStore({
    reducer: {
        mixes: mixesReducer,
    },
    
});

