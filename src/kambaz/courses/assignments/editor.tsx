import { Form, Col, Button, Row, Card } from "react-bootstrap";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { addAssignment, updateAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client"

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);;
  const isNew = aid === "new";


  const [assignment, setAssignment] = useState<any>({
    title: "",
    description: "",
    points: 100,
    due: "",
    available: "",
    until: "",
    course: cid,
  });
  
  const [originalAssignment, setOriginalAssignment] = useState<any>(null);
  


  useEffect(() => {
    if (!isNew) {
      const found = assignments.find((a: any) => a._id === aid);
      if (found) setAssignment(found);
      setOriginalAssignment(found);
    }
  }, [aid, assignments, isNew]);


  const handleSave = async () => {
    if (!cid) return;
    if (isNew) {
      const saved = await coursesClient.createAssignmentForCourse(cid, assignment);
      dispatch(addAssignment(saved));
    } else {
      const updated = await assignmentsClient.updateAssignment(assignment);
      dispatch(updateAssignment(updated));
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    if (!isNew && originalAssignment) {
      setAssignment(originalAssignment);
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };


  return (
    <div id="wd-assignments-editor">
      <FormGroup className="mb-3">
        <FormLabel>Assignment Name</FormLabel>
        <FormControl
          type="text"
          value={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormControl
          as="textarea"
          rows={3}
          value={assignment.description}
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
        />
      </FormGroup>

      <FormGroup className="mb-2 ms-5">
        <Row className="align-items-center mb-4 ms-4">
          <Col xs="auto">
            <FormLabel className="ms-5">Points</FormLabel>
          </Col>
          <Col>
            <FormControl
              type="number"
              value={assignment.points}
              onChange={(e) =>
                setAssignment({ ...assignment, points: e.target.value })
              }
            />
          </Col>
        </Row>

        <Row>
          <Col xs="auto">
            <FormLabel className="ms-5 mt-4">Assign</FormLabel>
          </Col>
          <Col className="ms-4 mb-4">
            <Card>
              <Form.Group className="mb-1 ms-3">
                <FormLabel className="mb-1 mt-3 ms-3">
                  <b>Due</b>
                </FormLabel>
                <FormControl
                  type="date"
                  className="ms-3 w-50"
                  value={assignment.due}
                  onChange={(e) =>
                    setAssignment({ ...assignment, due: e.target.value })
                  }
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3 ms-5">
                    <FormLabel className="mb-1 mt-3">
                      <b>Available From</b>
                    </FormLabel>
                    <FormControl
                      type="date"
                      className="w-80"
                      value={assignment.available}
                      onChange={(e) =>
                        setAssignment({
                          ...assignment,
                          available: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-1 ms-3 me-5">
                    <FormLabel className="mb-1 mt-3">
                      <b>Until</b>
                    </FormLabel>
                    <FormControl
                      type="date" 
                      value={assignment.until || ""}
                      onChange={(e) =>
                        setAssignment({ ...assignment, until: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </FormGroup>

      <FormGroup>
        <Button variant="danger" onClick={handleCancel} className="ms-2 float-end">
          Cancel
        </Button>
        <Button variant="secondary" onClick={handleSave} className="float-end">
          Save
        </Button>
      </FormGroup>
    </div>
  );
}