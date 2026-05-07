import { createSlice } from "@reduxjs/toolkit";

export const schoolSlice = createSlice({
  name: "school",

  initialState: {
    totalStudents: 0,
    averageAttendance: 0,
    averageMarks: 0,
    topStudent: null,

    totalTeachers: 0,
    averageExperience: 0,
    topTeacher: null,
  },

  reducers: {
    schoolStats: (state, action) => {
      state.totalStudents = action.payload.totalStudents;
      state.averageAttendance = action.payload.averageAttendance;
      state.averageMarks = action.payload.averageMarks;
      state.totalTeachers = action.payload.totalTeachers;
      state.averageExperience = action.payload.averageExperience;
    },
    setTopStudent: (state, action) => {
      state.topStudent = action.payload;
    },
    setTopTeacher: (state, action) => {
      state.topTeacher = action.payload;
    },
  },
});

export const { schoolStats, setTopStudent, setTopTeacher } =
  schoolSlice.actions;

export default schoolSlice.reducer;
