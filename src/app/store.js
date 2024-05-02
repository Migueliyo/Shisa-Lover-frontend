import { configureStore } from "@reduxjs/toolkit";

import mixesReducer from "../features/mixes/slice"
import usersReducer from "../features/users/slice"
import entriesReducer from "../features/entries/slice"
import flavourReducer from "../features/flavours/slice"

export const store = configureStore({
    reducer: {
        mixes: mixesReducer,
        users: usersReducer,
        entries: entriesReducer,
        flavours: flavourReducer,
    },
    
});

