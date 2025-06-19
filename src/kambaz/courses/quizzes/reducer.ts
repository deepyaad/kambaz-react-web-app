import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    quizzes: [] as any[],
};

const quizSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
         },
        addQuiz: (state, { payload: quiz }) => {
            const newQuiz = {
                _id: uuidv4(),
                title: quiz.title,
                course: quiz.course,
                description: quiz.description,
                points: quiz.points,
                due: quiz.due,
                available: quiz.available,
                until: quiz.until,
              };
            state.quizzes = [...state.quizzes, newQuiz] as any;
        },
        deleteQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter(
            (q: any) => q._id !== quizId);
        },
        updateQuiz: (state, { payload: quiz }) => {
            state.quizzes = state.quizzes.map((q: any) =>
                q._id === quiz._id ? quiz : q
            ) as any;
        },
        editQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.map((q: any) =>
                q._id === quizId ? { ...q, editing: true } : q
            ) as any;
        },
    },
});

export const { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes } = quizSlice.actions;
export default quizSlice.reducer;