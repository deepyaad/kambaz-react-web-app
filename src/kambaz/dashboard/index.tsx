import { Link } from "react-router-dom";
import {Card, Button} from "react-bootstrap"
// import { useSelector } from "react-redux";
// import * as db from "../database";
// import { useDispatch } from "react-redux";
// import { enrollments } from "../kambaz/account/reducer";
// import { useState } from "react";



export default function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse, enrolling, setEnrolling,
    updateEnrollment}: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; enrolling: boolean; 
    setEnrolling: (enrolling: boolean) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => void}
) {

  // const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const { enrollments }: {enrollments: any[]} = db; 

  
  
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
           {enrolling ? "My Courses" : "All Courses"}
        </button>
      </h1> <hr />
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
          .map((course) => {
            // --- ADDED NULL/UNDEFINED CHECK HERE ---
            if (!course || !course._id) {
              console.warn("Skipping malformed course object:", course);
              return null; // Don't render this item if it's null or missing _id
            }
            // --- END OF ADDED CHECK ---

            return (
              <div key={course._id} className="col" style={{ width: "300px" }}>
                <Card>
                  <Link to={`/Kambaz/Courses/${course._id}/Home`}
                        className="wd-dashboard-course-link text-decoration-none text-dark" >
                    <Card.Img src={`/images/${course.image}`} variant="top" width="100%" height={160} />
                    <Card.Body className="card-body">
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {enrolling && (
                          <button  onClick={(event) => {
                              event.preventDefault();
                              updateEnrollment(course._id, !course.enrolled);
                            }}
                          className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} >
                            {course.enrolled ? "Unenroll" : "Enroll"}
                          </button>
                        )}
                        {course.name} 
                      </Card.Title>
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
            );
          })}
        </div>
        </div>
      </div>
  );
}

/*

import { Link } from "react-router-dom";
import {Card, Button} from "react-bootstrap"
// import { useSelector } from "react-redux";
// import * as db from "../database";
// import { useDispatch } from "react-redux";
// import { enrollments } from "../kambaz/account/reducer";
// import { useState } from "react";



export default function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse, enrolling, setEnrolling }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; enrolling: boolean; 
    setEnrolling: (enrolling: boolean) => void;}
) {

  // const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const { enrollments }: {enrollments: any[]} = db; 
  
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
           {enrolling ? "My Courses" : "All Courses"}
        </button>
      </h1> <hr />
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
              if (!course || !course._id) {
                console.warn("Skipping malformed course object:", course);
                return null;
              };
            <div key={course._id} className="col" style={{ width: "300px" }}>
              <Card>
                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <Card.Img src={`/images/${course.image}`} variant="top" width="100%" height={160} />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {enrolling && (
                        <button className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} >
                          {course.enrolled ? "Unenroll" : "Enroll"}
                        </button>
                      )}
                      {course.name} 
                    </Card.Title>
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