import { Routes, Route, Navigate } from "react-router-dom";
import Account from "./account";
import Dashboard from "./dashboard";
import KambazNavigation from "./navigation";
import Courses from "./courses/index";
import "./styles.css";
import { useState, useEffect } from "react";
import Session from "./account/session";
import ProtectedRoute from "./account/ProtectedRoute";
import { useSelector,  } from "react-redux"; // useDispatch
import * as courseClient from "./courses/client";
import * as userClient from "./account/client";



export default function Kambaz() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  console.log(currentUser)
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    //_id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
    image: "Aerodynamics.png",
  });

  const [enrolling, setEnrolling] = useState<boolean>(false);
  const findCoursesForUser = async () => {
    try {
      const courses = await userClient.findCoursesForUser(currentUser._id);
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
   if (enrolled) {
     await userClient.enrollIntoCourse(currentUser._id, courseId);
   } else {
     await userClient.unenrollFromCourse(currentUser._id, courseId);
   }
   setCourses(
     courses.map((course) => {
       if (course._id === courseId) {
         return { ...course, enrolled: enrolled };
       } else {
         return course;
       }
     })
   );
 };


  const fetchCourses = async () => {
  console.log("fetchCourses called. CurrentUser:", currentUser, "Enrolling:", enrolling);
  try {
    if (currentUser && currentUser._id) {
        console.log("Fetching courses for logged-in user.");
        const allCourses = await courseClient.fetchAllCourses();
        const enrolledCourses = await userClient.findCoursesForUser(
          currentUser._id
        );
        console.log("Fetched allCourses:", allCourses);
        console.log("Fetched enrolledCourses:", enrolledCourses);

        const courses = allCourses.map((course: any) => {
          // ... map logic
          return course; // Or { ...course, enrolled: true/false }
        });
        console.log("Final courses after mapping:", courses);
        setCourses(courses);
    } else {
      console.log("No current user, fetching all courses.");
      const allCourses = await courseClient.fetchAllCourses();
      console.log("Fetched allCourses (no user):", allCourses);
      setCourses(allCourses);
    }
  } catch (error) {
    console.error("Error in fetchCourses:", error);
    setCourses([]);
  }
};
  /*
  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      const courses = allCourses.map((course: any) => {
        if (enrolledCourses.find((c: any) => c._id === course._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  */

  useEffect(() => {
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);

  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const addNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(courses.map((c) => {
        if (c._id === course._id) { return course; }
        else { return c; }
      }
    ));
  };

  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="account" />} />
            <Route path="/account/*" element={<Account />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                    enrolling={enrolling} setEnrolling={setEnrolling}
                    updateEnrollment={updateEnrollment}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              }
            />
            <Route path="/calendar" element={<h1>Calendar</h1>} />
            <Route path="/inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
