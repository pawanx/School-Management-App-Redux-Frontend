import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://school-management-redux-backend.vercel.app/teachers";

//switch like action

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  },
);

export const addTeacher = createAsyncThunk(
  "teachers/addTeacher",
  async (newTeacher) => {
    const response = await axios.post(BASE_URL, newTeacher);
    console.log("teacher create response data is :", response.data);
    return response.data;
  },
);

export const updateTeacher = createAsyncThunk(
  "teachers/updateTeacher",
  async ({ id, updateTeacher }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, updateTeacher);
    return response.data;
  },
);

export const deleteTeacher = createAsyncThunk(
  "teachers/deleteTeacher",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return id;
  },
);

export const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    status: "idle",
    error: null,
    filter: "All",
    sortBy: "name",
  },

  //normal sync reducers
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

  //async reducers
  extraReducers: (builder) => {
    //fetch teachers
    builder.addCase(fetchTeachers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      state.status = "success";
      state.teachers = action.payload;
    });
    builder.addCase(fetchTeachers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    //add reducers
    builder.addCase(addTeacher.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addTeacher.fulfilled, (state, action) => {
      state.status = "success";
      state.teachers.push(action.payload);
    });
    builder.addCase(addTeacher.rejected, (state, action) => {
      ((state.status = "failed"), (state.error = action.error.message));
    });

    //update reducers
    builder.addCase(updateTeacher.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateTeacher.fulfilled, (state, action) => {
      state.status = "success";
      const index = state.teachers.findIndex(
        (teacher) => teacher._id === action.payload.id,
      );
      if (index !== -1) {
        state.teachers[index] = action.payload;
      }
    });
    builder.addCase(updateTeacher.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    //delete reducer
    builder.addCase(deleteTeacher.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteTeacher.fulfilled, (state, action) => {
      state.status = "success";
      state.teachers = state.teachers.filter(
        (teacher) => teacher._id !== action.payload,
      );
    });
    builder.addCase(deleteTeacher.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { setFilter, setSortBy, resetStatus } = teachersSlice.actions;
export default teachersSlice.reducer;
