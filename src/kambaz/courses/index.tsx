import { useParams, useLocation, Navigate } from "react-router-dom";
import { Route, Routes } from "react-router";
import { useSelector } from "react-redux";
import { FaAlignJustify } from "react-icons/fa";

import CourseNavigation from "./navigation";
import Modules from "./modules";
import Home from "./home";
import Assignments from "./assignments";
import AssignmentEditor from "./assignments/editor";
import PeopleTable from "./people/table";
import Quizzes from "./quizzes";
import QuizEditor from "./quizzes/editor";
// import QuizDetails from "./quizzes/details";
// import QuizPreview from "./quizzes/preview";
import QuizQuestionsEditor from "./quizzes/QuizQuestionsEditor";

export default function Courses() {
  const { cid } = useParams();
  const { pathname } = useLocation();

  const { courses } = useSelector((state: any) => state.courseReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);

  const course = courses.find((c: any) => c._id === cid);
  const enrolled = enrollments.some(
    (e: any) => e.user === currentUser?._id && e.course === cid
  );
  

  const currentTab = pathname.split("/")[4] || "Home";

  if (!enrolled) {
    return <Navigate to="/Kambaz/Dashboard" />;
  }

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course?.name} &gt; {currentTab}
      </h2>

      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>

        <Routes>
          <Route path="Home" element={<Home />} />
          <Route path="Modules" element={<Modules />} />
          <Route path="Assignments" element={<Assignments />} />
          <Route path="Assignments/:aid" element={<AssignmentEditor />} />
          <Route path="Quizzes" element={<Quizzes />} />
          <Route path="Quizzes/:qid" element={<QuizEditor />} />
          <Route path="Quizzes/:qid/Questions" element={<QuizQuestionsEditor />} />
          <Route path="People" element={<PeopleTable />} />
        </Routes>
      </div>
    </div>
  );
}

/*



*/
