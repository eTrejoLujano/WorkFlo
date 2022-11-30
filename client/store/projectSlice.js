import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../history";
import { sendToken } from "./helperFunctions";

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async () => {
    try {
      const { data } = await axios.get(
        "/api/projects/user-projects",
        sendToken()
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchSelectedProject = createAsyncThunk(
  "project/fetchSelectedProject",
  async (id) => {
    const { data } = await axios.get(`/api/projects/${id}`, sendToken());
    return data;
  }
);

const initialState = {
  userProjects: [],
  selectedProject: {},
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProjects.fulfilled]: (state, action) => {
      state.userProjects = action.payload;
    },
    [fetchSelectedProject.fulfilled]: (state, action) => {
      state.selectedProject = action.payload;
    },
  },
});

// export const {  } = courseSlice.actions;
export default projectSlice.reducer;
