import { createLogger } from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

import auth from "./authSlice";
import lists from "./listSlice";
import project from "./projectSlice";
import cards from "./cardSlice";
import ui from "./uiSlice";
import link from "./copyLinkSlice";
import chat from "./chatSlice";
import userCard from "./userCardSlice";

const store = configureStore({
  reducer: { auth, project, lists, cards, ui, link, chat, userCard },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger({ collapsed: true })),
});

export default store;
export * from "./authSlice";
