import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../history";
import { sendToken } from "./helperFunctions";

export const fetchLists = createAsyncThunk("list/fetchLists", async (id) => {
  try {
    const { data } = await axios.get(`/api/projects/${id}/lists`, sendToken());
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const createList = createAsyncThunk("list/createList", async (value) => {
  try {
    const { data } = await axios.post(`/api/lists`, value, sendToken());
    return data;
  } catch (err) {
    console.error(err);
  }
});

const initialState = [];

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    updateList: (state, action) => action.payload,
  },
  extraReducers: {
    [createList.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [fetchLists.fulfilled]: (state, action) => action.payload,
  },
});

export default listSlice.reducer;
export const { updateList } = listSlice.actions;
