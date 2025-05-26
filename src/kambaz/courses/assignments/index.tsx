import AssignmentControls from "./AssignmentControls";
import { ListGroup } from "react-bootstrap";
import HeaderControlButtons from "./HeaderControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { BsGripVertical } from 'react-icons/bs';
import { TfiPencilAlt } from "react-icons/tfi";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div>
        {isFaculty && (
            <AssignmentControls />
        )}
      <br /><br /><br /><br />

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-assignment p-3 ps-1 bg-secondary align-items-center">
          <BsGripVertical className="me-2 fs-3" />
          <b>ASSIGNMENTS</b>
          <HeaderControlButtons />
        </ListGroup.Item>

        {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <ListGroup.Item className="wd-assignment p-3 ps-1" key={assignment._id}>
              <BsGripVertical className="me-2 fs-3" />
              <TfiPencilAlt className="me-2 fs-3 document-icon" />

              {isFaculty && (
                <AssignmentControlButtons
                  assignmentId={assignment._id}
                  deleteAssignment={() => dispatch(deleteAssignment(assignment._id))}
                />
              )}

              <b>
                {isFaculty ? (
                  <a
                    href={`#/Kambaz/Courses/${assignment.course}/Assignments/${assignment._id}`}
                    className="wd-assignment-link"
                  >
                    {assignment.title}
                  </a>
                ) : (
                  assignment.title
                )}
              </b>

              <p className="mb-0 ps-5 p-1">
                <span className="text-danger ps-4">Multiple Modules</span> |
                <b> Not available until </b> {assignment.available} at 12:00am |
                <b> Due </b> {assignment.due} at 11:59pm | {assignment.points} pts
              </p>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}


/*
import AssignmentControls from "./AssignmentControls";
import { ListGroup } from "react-bootstrap";
import HeaderControlButtons from "./HeaderControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { BsGripVertical } from 'react-icons/bs'
import { TfiPencilAlt } from "react-icons/tfi";
import { useParams } from "react-router";
import * as db from "../../database";

// import { useState } from "react";
// import { addAssignment, editAssignment, updateAssignment, deleteAssignment } from "./reducer";
// import { useSelector, useDispatch } from "react-redux";



- Clicking the + Assignment button navigates to the AssignmentEditor screen
- Using the example of deleting assignments, add a Delete button or trash icon to the right of each assignment.
- Clicking Delete on an assignment pops up a dialog asking if you are sure you want to remove the assignment.
- Clicking Yes or Ok, dismisses the dialog, removes the assignment, and updates the Assignments screen without the deleted assignment.
- Clicking No or Cancel, dismisses the dialog without removing the assignment
- Clicking on an assignment in the Assignments screen navigates to the AssignmentsEditor screen, displaying the assignment's name, description, points, due date, available from date, and available until date of the corresponding assignment.



// latest working code
export default function Assignments() {
    const { cid } = useParams();
    const assignments = db.assignments;
    

    return (
        <div>
            <AssignmentControls /><br /><br /><br /><br />
            <ListGroup className="rounded-0" id="wd-assignments">

                <ListGroup.Item className="wd-assignment p-3 ps-1 bg-secondary align-items-center">
                    <BsGripVertical className="me-2 fs-3" /><b>ASSIGNMENTS</b> <HeaderControlButtons />
                </ListGroup.Item>


                {assignments.filter((assignment: any) => assignment.course === cid).map((assignment: any) => (
                    <ListGroup.Item className="wd-assignment p-3 ps-1" key={assignment._id}>
                        <BsGripVertical className="me-2 fs-3" />
                        <TfiPencilAlt className="me-2 fs-3 document-icon" />
                        <b>
                            <a href={`#/Kambaz/Courses/${assignment.course}/Assignments/${assignment._id}`} className="wd-assignment-link">
                                {assignment.title}
                            </a>
                        </b>
                        <AssignmentControlButtons />
                        <p className="mb-0 ps-5 p-1">
                            <span className="text-danger ps-4">Multiple assignments</span> |
                            <b> Not available until </b> {assignment.available} at 12:00am |
                            <b> Due </b> {assignment.due} at 11:59pm | 100 pts
                        </p>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}






// my attempt
export default function Assignments() {
    const { cid } = useParams();
    const [assignmentName, setAssignmentName] = useState("");
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const dispatch = useDispatch();
    
    return (
        <div>
            
            <br /><br /><br /><br />
            <ul id="wd-assignments" className="list-group rounded-0">
                {assignments.filter((assignment: any) => assignment.course === cid).map((assignment: any) => (
                    <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3" /> {assignment.name}
                            {!assignment.editing && assignment.name}
                            { assignment.editing && (
                                <input className="form-control w-50 d-inline-block"
                                    onChange={(e) => dispatch(updateAssignment({ ...assignment, name: e.target.value }))}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            dispatch(updateAssignment({ ...assignment, editing: false }));}}}
                                    defaultValue={assignment.name}
                                />
                            )} 
                            <AssignmentControlButtons assignmentId={assignment._id}
                                deleteAssignment={(assignmentId) => {dispatch(deleteAssignment(assignmentId));}}
                                editAssignment={(assignmentId) => dispatch(editAssignment(assignmentId))} 
                            />   
                        </div>
                    </li>))
                }
            </ul>
      </div>      
    );
}
*/