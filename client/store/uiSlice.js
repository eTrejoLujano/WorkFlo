import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../history";
import { sendToken } from "./helperFunctions";

const initialState = {
  modalIsOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.modalIsOpen = !state.modalIsOpen;
    },
  },
});

export const { toggleModal } = uiSlice.actions;
export default uiSlice.reducer;
