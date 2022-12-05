import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sendToken } from "./helperFunctions";

export const fetchUserCards = createAsyncThunk("userCard/fetchUserCards", async (id) => {
  try {
    const { data } = await axios.get(`/api/userCards/${id}`, sendToken());
    return data;
  } catch (error) {
    console.log(error);
  }
});

// api/userCards
export const assignToCard = createAsyncThunk("userCard/assignToCard", async (value) => {
  try {
    const { data } = await axios.post(`/api/userCards`, value, sendToken());
    return data;
  } catch (err) {
    console.error(err);
  }
});

// api/userCards/
export const removeFromCard = createAsyncThunk("userCard/removeFromCard", async (value) => {
  try {
    const { data } = await axios.put(`/api/userCards`, value, sendToken());
    return data;
  } catch (err) {
    console.error(err);
  }
});

// export const updateUserCard = createAsyncThunk("userCard/updateUserCard", async (value) => {
//   try {
//     console.log('value', value)
//     const { data } = await axios.put(`/api/userCards`, value, sendToken());
//     return data;
//   } catch (err) {
//     console.error(err);
//   }
// });

const initialState = [];

const cardSlice = createSlice({
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
    [fetchUserCards.fulfilled]: (state, action) => action.payload,
  },
});

export default cardSlice.reducer;
