import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../history";
import { sendToken } from "./helperFunctions";

const initialState = {
  modalIsOpen: {
    card: false,
    footer: false,
  },
  selectedCard: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalIsOpen[action.payload] = !state.modalIsOpen[action.payload];
    },
    selectedCard: (state, action) => {
      state.selectedCard = action.payload;
    },
  },
});

export const { toggleModal, selectedCard } = uiSlice.actions;
export default uiSlice.reducer;
