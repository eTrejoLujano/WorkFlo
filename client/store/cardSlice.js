import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sendToken } from "./helperFunctions";

export const fetchCards = createAsyncThunk("card/fetchCards", async (id) => {
  try {
    const { data } = await axios.get(`/api/cards/${id}`, sendToken());
    return data;
  } catch (error) {
    console.log(error);
  }
});

// export const fetchSingleCards = createAsyncThunk(
//   "card/fetchCards",
//   async (id) => {
//     try {
//       const { data } = await axios.get(`/api/lists/${id}/cards`, sendToken());
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export const createCard = createAsyncThunk("card/createCard", async (value) => {
  try {
    const { data } = await axios.post(`/api/cards`, value, sendToken());
    return data;
  } catch (err) {
    console.error(err);
  }
});

const initialState = [];

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {},
  extraReducers: {
    [createCard.fulfilled]: (state, action) => {
      console.log("action", action);
      state.push(action.payload);
    },
    [fetchCards.fulfilled]: (state, action) => action.payload,
    // [fetchSingleCards.fulfilled]: (state, action) => action.payload,
  },
});

export default cardSlice.reducer;
