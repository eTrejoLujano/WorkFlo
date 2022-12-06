import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../history";
import { sendToken } from "./helperFunctions";

const initialState = {
  online: [],
};

const chatSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    userJoined: (state, action) => {
      state.online.push(action.payload);
    },
  },
});

export const { userJoined } = chatSlice.actions;
export default chatSlice.reducer;
