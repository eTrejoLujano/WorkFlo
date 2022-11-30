import { createLogger } from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import project from "./projectSlice";

const store = configureStore({
  reducer: { auth, project },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger({ collapsed: true })),
});

export default store;
export * from "./authSlice";
