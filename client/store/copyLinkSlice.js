import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sendToken } from "./helperFunctions";

export const copyLink = createAsyncThunk("link/copyLink", async (hash) => {
  try {
    const { data } = await axios.post(`/api/invite`, hash, sendToken());
    return data;
  } catch (error) {
    console.error(error);
  }
});

export const addInvitedUser = createAsyncThunk(
  "link/addInvitedUser",
  async (payload) => {
    try {
      const { data } = await axios.post(
        `/api/projects/${payload.projectId}/invite`,
        payload,
        sendToken()
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const compareHash = createAsyncThunk(
  "link/compareLink",
  async (projectId) => {
    try {
      const { data } = await axios.get(`/api/invite/${projectId}`, sendToken());
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {};

const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {},
  extraReducers: {
    [copyLink.fulfilled]: (state, action) => {
      action.payload;
    },
    [addInvitedUser.fulfilled]: (state, action) => {
      action.payload;
    },
    [compareHash.fulfilled]: (state, action) => {
      state = action.payload;
      state = state.filter((item) => item.hash === window.localStorage.invite);
      return state[0];
    },
  },
});

export default linkSlice.reducer;
