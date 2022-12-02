import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../history";
import { sendToken } from "./helperFunctions";

export const createCard = createAsyncThunk("card/createCard", async (value) => {
  try {
    const { data } = await axios.post(`/api/cards`, value, sendToken());
    return data;
  } catch (err) {
    console.error(err);
  }
});

const initialState = [];

const listSlice = createSlice({
  name: "card",
  initialState,
  reducers: {},
  extraReducers: {
    [createCard.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
  },
});

export default listSlice.reducer;
