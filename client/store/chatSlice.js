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
      console.error(error);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/chat", sendToken());
      thunkAPI.dispatch(allMessages(data));
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  online: [],
  messageList: [],
  dbMessages: [],
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
    allMessages: (state, action) => {
      state.messageList = action.payload;
    },
  },
});

export const { userJoined, sentMessage, receiveMessage, allMessages } =
  chatSlice.actions;
export default chatSlice.reducer;
