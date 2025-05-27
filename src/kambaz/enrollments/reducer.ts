import { createSlice } from "@reduxjs/toolkit";
// import enrollments from "../database/index.js";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: [] as any[],
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload }) => {
      const { userId, courseId } = payload;
      const already = state.enrollments.some(
        (e) => e.user === userId && e.course === courseId
      );
      if (!already) {
        const newEnrollment = {
          _id: uuidv4(),
          user: userId,
          course: courseId,
        };
        state.enrollments = [...state.enrollments, newEnrollment];
      }
    },
    unenroll: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId)
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;

