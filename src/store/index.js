import { configureStore } from "@reduxjs/toolkit";

import mixesReducer from "./mixes/slice"
import usersReducer from "./users/slice"
import entriesReducer from "./entries/slice"
import flavourReducer from "./flavours/slice"

export const store = configureStore({
    reducer: {
        mixes: mixesReducer,
        users: usersReducer,
        entries: entriesReducer,
        flavours: flavourReducer,
    },
    
});

