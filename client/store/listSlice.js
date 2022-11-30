import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../history";
import { sendToken } from "./helperFunctions";

export const fetchLists = createAsyncThunk(
  "project/fetchProjects",
  async () => {
    try {
      const { data } = await axios.get(
        "/api/lists",
        sendToken()
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createList = createAsyncThunk("list/createList", async (value) => {
  try {
    const { data } = await axios.post(`/api/lists`, value, sendToken());
    return data;
  } catch (err) {
    console.error(err);
  }
});

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

