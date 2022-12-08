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

export const createCard = createAsyncThunk(
  "card/createCard",
  async (newCard) => {
    try {
      const { data } = await axios.post(`/api/cards`, newCard, sendToken());
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const updateCardIndex = createAsyncThunk(
  "card/updateCardIndex",
  async (cardIndex) => {
    try {
      const { data } = await axios.put(
        `/api/cards/cardIndex`,
        cardIndex,
        sendToken()
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const updateCard = createAsyncThunk("card/updateCard", async (value) => {
  try {
    const { data } = await axios.put(`/api/cards`, value, sendToken());

    return data;
  } catch (err) {
    console.error(err);
  }
});

export const movingCardLists = createAsyncThunk(
  "card/movingCardLists",
  async (movingInfo) => {
    try {
      const { data } = await axios.put(
        "/api/cards/cardIndex/lists",
        movingInfo,
        sendToken()
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState = [];

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    updateCards: (state, action) => action.payload,
  },
  extraReducers: {
    [createCard.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [fetchCards.fulfilled]: (state, action) => action.payload,
    [updateCardIndex.fulfilled]: (state, action) => action.payload,
    [movingCardLists.fulfilled]: (state, action) => action.payload,
  },
});

export default cardSlice.reducer;
export const { updateCards } = cardSlice.actions;
