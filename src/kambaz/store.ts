import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./courses/modules/reducer";
import accountReducer from "./account/reducer";
import assignmentReducer from "./courses/assignments/reducer"
import courseReducer from "./courses/reducer";
import enrollmentReducer from "./enrollments/reducer";
import quizReducer from "./courses/quizzes/reducer"

    const store = configureStore({
        reducer: {
            modulesReducer,
            accountReducer,
            assignmentReducer,
            courseReducer,
            enrollmentReducer,
            quizReducer
        },
    });
export default store;