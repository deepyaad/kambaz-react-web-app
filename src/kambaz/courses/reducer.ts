import { createSlice } from "@reduxjs/toolkit";
import { courses as initialCourses } from "../database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  courses: initialCourses,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload: course }) => {
      const newCourse = { ...course, _id: uuidv4() };
      state.courses = [...state.courses, newCourse];
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter((c: any) => c._id !== courseId);
    },
    updateCourse: (state, { payload: updated }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === updated._id ? updated : c
      );
    },
  },
});

export const { addCourse, deleteCourse, updateCourse } = courseSlice.actions;
export default courseSlice.reducer;