import { createLogger } from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import lists from "./listSlice";
import project from "./projectSlice";
import ui from "./uiSlice";

const store = configureStore({
  reducer: { auth, project, lists, ui },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger({ collapsed: true })),
});

export default store;
export * from "./authSlice";
