import { configureStore } from "@reduxjs/toolkit";
import userDetailSlice from "./modules/userSlice/userDetailSlice";

export const store = configureStore({
    reducer:{
        users:userDetailSlice,
    }
})
