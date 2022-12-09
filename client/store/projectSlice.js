import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../history";
import { sendToken } from "./helperFunctions";

export const startWhiteboard = createAsyncThunk(
  "project/startWhiteboard",
  async (values, thunkAPI) => {
    try {
      const { data } = await axios.post("/api/whiteboard", values, sendToken());
      thunkAPI.dispatch(startedWhiteboard(data));
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchWhiteboards = createAsyncThunk(
  "project/fetchWhiteboards",
  async (projectId, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/api/whiteboard/${projectId}`,
        sendToken()
      );
      thunkAPI.dispatch(loadWhiteboards(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async (_, thunkAPI) => {
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
  async (id, thunkAPI) => {
    const { data } = await axios.get(`/api/projects/${id}`, sendToken());
    thunkAPI.dispatch(fetchWhiteboards(id));
    return data;
  }
);

export const createProject = createAsyncThunk(
  "project/createProject",
  async (title) => {
    console.log("slice project title", title);
    const { data } = await axios.post("/api/projects", title, sendToken());
    history.push(`/projects/${data.projectId}`);
    return data;
  }
);

const initialState = {
  userProjects: [],
  selectedProject: {},
  whiteboards: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    loadWhiteboards: (state, action) => {
      state.whiteboards = action.payload;
    },
    startedWhiteboard: (state, action) => {
      state.whiteboards.push(action.payload);
    },
  },
  extraReducers: {
    [fetchProjects.fulfilled]: (state, action) => {
      state.userProjects = action.payload;
    },
    [fetchSelectedProject.fulfilled]: (state, action) => {
      state.selectedProject = action.payload;
    },
    [createProject.fulfilled]: (state, action) => {
      state.userProjects.push(action.payload);
      state.selectedProject = action.payload;
    },
  },
});

export const { loadWhiteboards, startedWhiteboard } = projectSlice.actions;
export default projectSlice.reducer;
