import { Routes, Route, Navigate } from "react-router-dom";
import Account from "./account";
import Dashboard from "./dashboard";
import KambazNavigation from "./navigation";
import Courses from "./courses/index";
import "./styles.css";
import { useState } from "react";
// import * as db from "./database";
// import { v4 as uuidv4 } from "uuid";
import ProtectedRoute from "./account/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { addCourse, deleteCourse, updateCourse } from "./courses/reducer";


export default function Kambaz() {
  // const [courses, setCourses] = useState<any[]>(db.courses);
  const { courses } = useSelector((state: any) => state.courseReducer);
  const dispatch = useDispatch(); 
  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
    image: "Aerodynamics.png",
  });

  const addNewCourse = () => {
    dispatch(addCourse(course));
  };

  const deleteCourseById = (courseId: any) => {
    dispatch(deleteCourse(courseId));
  };

  const updateCourseInState = () => {
    dispatch(updateCourse(course));
  };

  return (
    <div id="wd-kambaz">
      <KambazNavigation />
      <div className="wd-main-content-offset p-3">
      <Routes>
              <Route path="/" element={<Navigate to="account" />} />
              <Route path="/account/*" element={<Account />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard 
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourseById}
                    updateCourse={updateCourseInState}
                  />
                </ProtectedRoute>
              }/>
              <Route path="/courses" element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              } />
              <Route path="/courses/:cid/*" element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              } />
              <Route path="/calendar" element={<h1>Calendar</h1>} />
              <Route path="/inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
  );
}


/*
import { Routes, Route, Navigate } from "react-router-dom";
import Account from "./account";
import Dashboard from "./dashboard";
import KambazNavigation from "./navigation";
import Courses from "./courses";
import "./styles.css";
import { useState } from "react";
import * as db from "./database";
import { v4 as uuidv4 } from "uuid";
import ProtectedRoute from "./account/ProtectedRoute";



export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>(db.courses);
  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number", image: "Aerodynamics.png",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description", 
  });
  const addNewCourse = () => {
    setCourses([...courses, { ...course, _id: uuidv4() }]);
  };
  const deleteCourse = (courseId: any) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  const updateCourse = () => {
    setCourses(
      courses.map((c) => {
      if (c._id === course._id) {
        return course;
      } 
      else {
        return c;
      }
      })
    );
  };

  return (
    // <Route path="/" element={<Navigate to="account" />} />
    <div id="wd-kambaz">
      <KambazNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />  // account
          <Route path="Account/*" element={<Account />} />
          <Route path="Dashboard" element={
            <ProtectedRoute>
              <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}
                />
            </ProtectedRoute> } 
          />
          <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute> } />
          <Route path="Calendar" element={<h1>Calendar</h1>} />
          <Route path="Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
  );
}
  */