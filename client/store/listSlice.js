import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../history";
import { sendToken } from "./helperFunctions";


export const fetchLists = createAsyncThunk(
  "project/fetchProjects",
  async () => {
    try {
      const { data } = await axios.get(
        "/api/lists/",
        sendToken()
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const dummyData = [
  {
    title: "Title 1",
    id: 0,
    cards: [
      {
        id: 0,
        text: "This is card 1A"
      },
      {
        id: 1,
        text: "This is card 2A"
      },
      {
        id: 2,
        text: "This is card 3A"
      },
    ]
  },
  {
    title: "Title 2",
    id: 1,
    cards: [
      {
        id: 0,
        text: "This is card 1B"
      },
      {
        id: 1,
        text: "This is card 2B"
      },
      {
        id: 2,
        text: "This is card 3B"
      },
    ]
  },
];

const listSlice = createSlice({
  name: "list",
  initialState: dummyData,
  reducers: {},
  // extraReducers: {
  //   [fetchLists.fulfilled]: (state, action) => {
  //     state.lists = action.payload;
  //   },
  // },
});

export default listSlice.reducer;