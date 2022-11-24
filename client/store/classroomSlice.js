import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
};

const classroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {
    studentJoined: (state, action) => {
      state.students.push(action.payload);
    },
    studentLeft: (state, action) => {
      state.students = state.students.filter((s) => s !== action.payload);
    },
  },
});

export const { studentJoined, studentLeft } = classroomSlice.actions;
export default classroomSlice.reducer;
