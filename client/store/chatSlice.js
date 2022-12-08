import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../history";
import { sendToken } from "./helperFunctions";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/chat", message, sendToken());
      thunkAPI.dispatch(sentMessage(data));
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  online: [],
  messageList: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    userJoined: (state, action) => {
      state.online.push(action.payload);
    },
    sentMessage: (state, action) => {
      state.messageList.push(action.payload);
    },
    receiveMessage: (state, action) => {
      state.messageList.push(action.payload);
    },
  },
});

export const { userJoined, sentMessage, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
