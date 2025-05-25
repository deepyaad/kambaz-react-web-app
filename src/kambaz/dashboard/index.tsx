import { Link } from "react-router-dom";
import * as db from "../database";
import {Row, Card, Col, Button} from "react-bootstrap"

export default function Dashboard() {
  const courses = db.courses;
  
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
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
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>);
}
    
    
/*

import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as db from "../database";
export default function Dashboard() {
  const [courses, setCourses] = useState<any[]>(db.courses);
  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div className="row" id="wd-dashboard-courses">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div key={course._id} className="col" style={{ width: "300px" }}>
              <div className="card">
                 ...  {course.name}   ...
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
);}




import { Link } from "react-router-dom";
import {Card, Button} from "react-bootstrap"
import { useSelector } from "react-redux";
import * as db from "../database";
// import { useDispatch } from "react-redux";
// import { enrollment } from "../Kambaz/Account/reducer";
// import { useState } from "react";




- if the current user's role is Student, they have a blue Enrollments button at the top right of the screen. 
- Clicking the Enrollments button displays all the the courses. 
- Clicking it again only shows the courses a student is enrolled in. 
- Courses that the student is enrolled in should provide a red Unenroll button 
- courses that the student is not enrolled in should provide a green Enroll button. 
- When a student click's the Unenroll or Enroll button the enrollment status must actually change and the buttons should toggle to reflect the new state. 
- If a student signs out, and then signs in again, the enrollment choices should still persist. 
- If a user refreshes or reloads the page, the new enrollments are lost. 
- Protect the route to a course so that only students enrolled in that course can navigate to the course, and stay in the Dashboard screen otherwise. 
- All enrollment related buttons should only be visible to students. 
- Create new or modify existing reducers and store as needed.





export default function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; }
) {

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments }: {enrollments: any[]} = db; 
  
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
            .filter((course) =>
            enrollments.some(
              (enrollment) =>
              enrollment.user === currentUser._id &&
              enrollment.course === course._id
            ))
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

*/