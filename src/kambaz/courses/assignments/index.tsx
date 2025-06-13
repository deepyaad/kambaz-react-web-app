import AssignmentControls from "./AssignmentControls";
import { ListGroup } from "react-bootstrap";
import HeaderControlButtons from "./HeaderControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { BsGripVertical } from 'react-icons/bs';
import { TfiPencilAlt } from "react-icons/tfi";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { useEffect} from "react";
import { deleteAssignment, setAssignments } from "./reducer";


export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";




  const removeAssignment = async (assId: string) => {
      await assignmentsClient.deleteAssignment(assId);
      dispatch(deleteAssignment(assId));
  };

  const fetchAssignments = async () => {
      const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
      dispatch(setAssignments(assignments));
  };
  useEffect(() => {
      fetchAssignments();
  }, []);





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
                  deleteAssignment={(assignmentId) => removeAssignment(assignmentId)}
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