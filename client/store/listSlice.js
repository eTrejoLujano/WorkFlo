import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../history";
import { sendToken } from "./helperFunctions";

export const createList = createAsyncThunk("list/createList", async (value) => {
  try {
    const { data } = await axios.post(`/api/lists`, value, sendToken());
    return data;
  } catch (err) {
    console.error(err);
  }
});

const initialState = {
  allLists: [],
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: {
    [createList.fulfilled]: (state, action) => {
      console.log("action", action);
      state.allLists.push(action.payload);
    },
  },
});

export default listSlice.reducer;
