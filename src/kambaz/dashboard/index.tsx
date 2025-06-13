import { Link } from "react-router-dom";
import {Card, Button} from "react-bootstrap"
// import { useSelector } from "react-redux";
// import * as db from "../database";
// import { useDispatch } from "react-redux";
// import { enrollments } from "../kambaz/account/reducer";
// import { useState } from "react";



export default function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; }
) {

  // const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const { enrollments }: {enrollments: any[]} = db; 
  
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h5>New Course
        <button className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={addNewCourse} > Add 
        </button>
        <button className="btn btn-warning float-end me-2"
          onClick={updateCourse} id="wd-update-course-click">
          Update
        </button>
      </h5>
      <br />
      <input value={course.name} className="form-control mb-2" 
          onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <textarea value={course.description} className="form-control"
          onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div className="row" id="wd-dashboard-courses">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses
          .map((course) => (
            <div key={course._id} className="col" style={{ width: "300px" }}>
              <Card>
                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <Card.Img src={`/images/${course.image}`} variant="top" width="100%" height={160} />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} </Card.Title>
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} </Card.Text>
                    <Button variant="primary"> Go </Button>
                  
                    <button onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                      }} 
                      className="btn btn-danger float-end"
                      id="wd-delete-course-click">
                        Delete
                    </button>

                    <button id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end" >
                      Edit
                    </button>

                  </Card.Body>
                </Link>
              </Card>
            </div>
          ))}
        </div>
        </div>
      </div>
  );
}

// removed this because at  6.4.1.1 the code was different, no .filter in return statement

/*

import { Link } from "react-router-dom";
import { Row, Card, FormControl, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { enroll, unenroll } from "../enrollments/reducer";
import { useState } from "react";
// import * as enrollmentClient from "../enrollments/client";


export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}) {

  const [showAllCourses, setShowAllCourses] = useState(false);

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);


  const isFaculty = currentUser?.role === "FACULTY";

  const enrolledCourseIds = enrollments
    .filter((e: any) => e.user === currentUser?._id)
    .map((e: any) => e.course);

  const visibleCourses = showAllCourses
    ? courses
    : courses.filter((c: any) => enrolledCourseIds.includes(c._id));

  const dispatch = useDispatch();




  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button
          variant="primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
        </Button>
      </div>

      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <hr />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
        </>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({visibleCourses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((c: any) => {
            const isEnrolled = enrolledCourseIds.includes(c._id);
            const handleEnroll = () =>
              dispatch(enroll({ userId: currentUser._id, courseId: c._id }));
            const handleUnenroll = () =>
              dispatch(unenroll({ userId: currentUser._id, courseId: c._id }));
            return (
              <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link
                    to={`/Kambaz/Courses/${c._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      src={`/images/${c.image}`}
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <Card.Body className="card-body">
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {c.name}
                      </Card.Title>
                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {c.description}
                      </Card.Text>


                      <Button variant="primary" className="me-2">
                        Go
                      </Button>


                      {isEnrolled ? (
                        <Button
                          variant="danger"
                          onClick={(e) => {
                            e.preventDefault();
                            handleUnenroll();
                          }}
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={(e) => {
                            e.preventDefault();
                            handleEnroll();
                          }}
                        >
                          Enroll
                        </Button>
                      )}

                      {isFaculty && (
                        <>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              deleteCourse(c._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setCourse(c);
                            }}
                            className="btn btn-warning me-2 float-end"
                            id="wd-edit-course-click"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

*/