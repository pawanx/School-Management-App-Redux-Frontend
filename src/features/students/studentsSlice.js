import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://school-management-redux-backend.vercel.app/students";

//this is like switch action.type
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  },
);

export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (newStudent) => {
    const response = await axios.post(BASE_URL, newStudent);
    console.log("Retuned data is :", response.data);
    return response.data;
  },
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, updatedStudent }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedStudent);
    return response.data;
  },
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return id;
  },
);

export const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    status: "idle",
    error: null,
    filter: "All",
    sortBy: "name",
  },
  //these are syncronous reducers
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },

  //handling async actions
  extraReducers: (builder) => {
    //fetch
    builder.addCase(fetchStudents.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.status = "success";
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    //add
    builder.addCase(addStudent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addStudent.fulfilled, (state, action) => {
      state.status = "success";
      state.students.push(action.payload);
    });
    builder.addCase(addStudent.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    //update
    builder.addCase(updateStudent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateStudent.fulfilled, (state, action) => {
      state.status = "success";
      const index = state.students.findIndex(
        (student) => student.id === action.payload.id,
      );
      state.students[index] = action.payload;
    });
    builder.addCase(updateStudent.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    //delete
    builder.addCase(deleteStudent.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      state.status = "success";
      state.students = state.students.filter(
        (student) => student._id !== action.payload,
      );
    });
    builder.addCase(deleteStudent.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { setFilter, setSortBy, resetStatus } = studentsSlice.actions;

export default studentsSlice.reducer;
