import { createLogger } from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import classroom from "./classroomSlice";
import course from "./courseSlice";

const store = configureStore({
  reducer: { auth, classroom, course },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger({ collapsed: true })),
});

export default store;
export * from "./authSlice";
