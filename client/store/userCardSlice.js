import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sendToken } from "./helperFunctions";
import { selectedCard } from "./uiSlice";
import socket from "../socket";
// api/userCards
// Assign user to card
export const assignToCard = createAsyncThunk(
  "userCard/assignToCard",
  async (value, thunkAPI) => {
    try {
      const { data } = await axios.post(`/api/userCards`, value, sendToken());
      data.cardId = data.id;
      thunkAPI.dispatch(selectedCard(data));

      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

// api/userCards/
// Remove user from card
export const removeFromCard = createAsyncThunk(
  "userCard/removeFromCard",
  async (value, thunkAPI) => {
    try {
      const { data } = await axios.put(`/api/userCards`, value, sendToken());
      data.cardId = data.id;
      thunkAPI.dispatch(selectedCard(data));
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState = [];

const userCardSlice = createSlice({
  name: "userCard",
  initialState,
  reducers: {},
  extraReducers: {
    [assignToCard.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [removeFromCard.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
  },
});

export default userCardSlice.reducer;
