// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import history from "../history";
// import { sendToken } from "./helperFunctions";

export const addCourse = createAsyncThunk(
  "course/addCourse",
  async (formVals) => {
    try {
      const { data } = await axios.post("/api/courses", formVals, sendToken());
      history.push("/");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loadCourses = createAsyncThunk("course/loadCourses", async () => {
  try {
    const { data } = await axios.get("/api/courses");
    return data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  allCourses: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: {
    [addCourse.fulfilled]: (state, action) => {
      state.allCourses.push(action.payload);
    },
    [loadCourses.fulfilled]: (state, action) => {
      state.allCourses = action.payload;
    },
  },
});

// export const {  } = courseSlice.actions;
export default courseSlice.reducer;
