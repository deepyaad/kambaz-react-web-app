import { Form, Col, Button, Row, Card } from "react-bootstrap";
import { FormGroup, FormControl, FormLabel, FormSelect } from "react-bootstrap";
import { Link, useParams, useLocation} from "react-router-dom";
// import { useState, useEffect } from "react";
import * as db from "../../database";

export default function AssignmentEditor() {
  const { aid } = useParams();
  const assignments = db.assignments;
  const { pathname } = useLocation();

  const formatDate = (date: string) => {
    return new Date(date).toISOString().split('T')[0]; 
  };

  return (
    <div id="wd-assignments-editor">
        {assignments.filter((assignment: any) => assignment._id === aid).map((assignment: any) => (
            <><FormGroup className="mb-3 w-75" controlId="wd-assignment-name">
                <FormLabel>Assignment Name</FormLabel>
                <FormControl type="text" value={assignment.title} disabled />
            </FormGroup><FormGroup className="mb-3 w-75" controlId="wd-textarea">
                    <FormControl as="textarea" rows={3} value={assignment.description} disabled />
                </FormGroup><FormGroup className="mb-2 ms-5" controlId="wd-assignment-points">
                    <Row className="align-items-center mb-4 ms-4">
                        <Col xs="auto"><FormLabel className="ms-5">Points</FormLabel></Col>
                        <Col><FormControl className="w-50" value={assignment.points} disabled /></Col>
                    </Row>

                    <Row className="align-items-center mb-4">
                        <Col xs="auto"><FormLabel className="ms-0">Assignment Group</FormLabel></Col>
                        <Col>
                            <FormSelect className="ms-0 w-50">
                                <option selected>ASSIGNMENTS</option>
                                <option value="quiz">QUIZZES</option>
                                <option value="project">PROJECT</option>
                                <option value="exam">EXAM</option>
                            </FormSelect>
                        </Col>
                    </Row>

                    <Row className="align-items-center mb-4">
                        <Col xs="auto"><FormLabel className="ms-1">Display Grade as</FormLabel></Col>
                        <Col>
                            <FormSelect className="w-50">
                                <option selected>Percentage</option>
                                <option value="quiz">Letter</option>
                            </FormSelect>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col xs="auto"><FormLabel className="ms-2 mt-4">Submission Type</FormLabel></Col>
                        <Col>
                            <Card className="w-75">
                                <FormSelect className="ms-3 w-50 mb-3 mt-3">
                                    <option selected>Online</option>
                                    <option value="quiz">In-person</option>
                                </FormSelect>
                                <fieldset>
                                    <Form.Group as={Row} className="mb-3 ms-5">
                                        <FormLabel><b>Online Entry Options </b></FormLabel>
                                        <Col sm={10}>
                                            <Form.Check label="Text Entry" name="formHorizontalRadios" />
                                            <Form.Check label="Website URL" checked name="formHorizontalRadios" />
                                            <Form.Check label="Media Recordings" name="formHorizontalRadios" />
                                            <Form.Check label="Student Annotation" name="formHorizontalRadios" />
                                            <Form.Check label="File Uploads" name="formHorizontalRadios" />
                                        </Col>
                                    </Form.Group>
                                </fieldset>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="auto"><FormLabel className="ms-5 mt-4">Assign</FormLabel></Col>
                        <Col className="ms-4">
                            <Card className="w-75">
                                <Form.Group as={Row} className="mb-1 mt-3 ms-3">
                                    <FormLabel><b>Assign to</b></FormLabel>
                                    <FormSelect className="ms-3 w-75 mb-1" multiple>
                                        <option selected>Everyone</option>
                                        <option value="quiz">Tony Stark</option>
                                        <option value="quiz">Bruce Wayne</option>
                                        <option value="quiz">Steve Rogers</option>
                                        <option value="quiz">Natasha Romanoff</option>
                                    </FormSelect>
                                </Form.Group>

                                <Form.Group className="mb-1 ms-3">
                                    <FormLabel className="mb-1 mt-3 ms-3"><b>Due</b></FormLabel>
                                    <FormControl type="date" className="ms-3 w-50" value={assignment.due ? formatDate(assignment.due) : ''}  />
                                </Form.Group>

                                <Row>
                                    <Col>
                                        <Form.Group className="mb-1 ms-3">
                                            <FormLabel className="mb-1 mt-3 ms-3"><b>Available From</b></FormLabel>
                                            <FormControl type="date" className="ms-3 w-50" value={assignment.available ? formatDate(assignment.available) : ''} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-1 ms-3">
                                            <FormLabel className="mb-1 mt-3 ms-3"><b>Until</b></FormLabel>
                                            <FormControl type="date" className="ms-3 w-50" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </FormGroup><FormGroup>
                    <Link to={pathname.replace(/\/Assignments\/[^/]+$/, '/Assignments')} className="ms-2 float-end">
                        <Button variant="danger">Cancel</Button>
                    </Link>
                    <Link to={pathname.replace(/\/Assignments\/[^/]+$/, '/Assignments')} className="float-end">
                        <Button variant="secondary">Save</Button>
                    </Link>
                </FormGroup></>
                
      ))}
    </div>
  );
}


/*

import { Form, Col, Button, Row, Card } from "react-bootstrap";
import { FormGroup, FormControl, FormLabel, FormSelect } from "react-bootstrap";
import { Link, useParams, useLocation} from "react-router-dom";
// import { useState, useEffect } from "react";
import * as db from "../../database";



- The AssignmentEditor should allow editing at least the following fields: name, description, points, due date, available from date, and available until date.
- Clicking Save creates the new assignment and adds it to the assignments array state variable, navigates to the Assignments screen, which must now contain the newly created assignment.
- Clicking Cancel does not create the new assignment, and navigates back to the Assignments screen, without the new assignment.
- The AssignmentsEditor screen should allow editing the same fields listed earlier for corresponding assignment.
- Clicking Save updates the assignment's fields and navigates back to the Assignments screen with the updated assignment values. Clicking Cancel does not update the assignment, and navigates back to the Assignments screen which shows the assignments unchanged.


export default function AssignmentEditor() {
    const { aid } = useParams();
    const assignments = db.assignments;
    const { pathname } = useLocation();
  
    const formatDate = (date: string) => {
      return new Date(date).toISOString().split('T')[0]; 
    };
  
    return (
      <div id="wd-assignments-editor">
          {assignments.filter((assignment: any) => assignment._id === aid).map((assignment: any) => (
              <><FormGroup className="mb-3 w-75" controlId="wd-assignment-name">
                  <FormLabel>Assignment Name</FormLabel>
                  <FormControl type="text" value={assignment.title} disabled />
              </FormGroup><FormGroup className="mb-3 w-75" controlId="wd-textarea">
                      <FormControl as="textarea" rows={3} value={assignment.description} disabled />
                  </FormGroup><FormGroup className="mb-2 ms-5" controlId="wd-assignment-points">
                      <Row className="align-items-center mb-4 ms-4">
                          <Col xs="auto"><FormLabel className="ms-5">Points</FormLabel></Col>
                          <Col><FormControl className="w-50" value={assignment.points} disabled /></Col>
                      </Row>
  
                      <Row className="align-items-center mb-4">
                          <Col xs="auto"><FormLabel className="ms-0">Assignment Group</FormLabel></Col>
                          <Col>
                              <FormSelect className="ms-0 w-50">
                                  <option selected>ASSIGNMENTS</option>
                                  <option value="quiz">QUIZZES</option>
                                  <option value="project">PROJECT</option>
                                  <option value="exam">EXAM</option>
                              </FormSelect>
                          </Col>
                      </Row>
  
                      <Row className="align-items-center mb-4">
                          <Col xs="auto"><FormLabel className="ms-1">Display Grade as</FormLabel></Col>
                          <Col>
                              <FormSelect className="w-50">
                                  <option selected>Percentage</option>
                                  <option value="quiz">Letter</option>
                              </FormSelect>
                          </Col>
                      </Row>
  
                      <Row className="mb-4">
                          <Col xs="auto"><FormLabel className="ms-2 mt-4">Submission Type</FormLabel></Col>
                          <Col>
                              <Card className="w-75">
                                  <FormSelect className="ms-3 w-50 mb-3 mt-3">
                                      <option selected>Online</option>
                                      <option value="quiz">In-person</option>
                                  </FormSelect>
                                  <fieldset>
                                      <Form.Group as={Row} className="mb-3 ms-5">
                                          <FormLabel><b>Online Entry Options </b></FormLabel>
                                          <Col sm={10}>
                                              <Form.Check label="Text Entry" name="formHorizontalRadios" />
                                              <Form.Check label="Website URL" checked name="formHorizontalRadios" />
                                              <Form.Check label="Media Recordings" name="formHorizontalRadios" />
                                              <Form.Check label="Student Annotation" name="formHorizontalRadios" />
                                              <Form.Check label="File Uploads" name="formHorizontalRadios" />
                                          </Col>
                                      </Form.Group>
                                  </fieldset>
                              </Card>
                          </Col>
                      </Row>
  
                      <Row>
                          <Col xs="auto"><FormLabel className="ms-5 mt-4">Assign</FormLabel></Col>
                          <Col className="ms-4">
                              <Card className="w-75">
                                  <Form.Group as={Row} className="mb-1 mt-3 ms-3">
                                      <FormLabel><b>Assign to</b></FormLabel>
                                      <FormSelect className="ms-3 w-75 mb-1" multiple>
                                          <option selected>Everyone</option>
                                          <option value="quiz">Tony Stark</option>
                                          <option value="quiz">Bruce Wayne</option>
                                          <option value="quiz">Steve Rogers</option>
                                          <option value="quiz">Natasha Romanoff</option>
                                      </FormSelect>
                                  </Form.Group>
  
                                  <Form.Group className="mb-1 ms-3">
                                      <FormLabel className="mb-1 mt-3 ms-3"><b>Due</b></FormLabel>
                                      <FormControl type="date" className="ms-3 w-50" value={assignment.due ? formatDate(assignment.due) : ''}  />
                                  </Form.Group>
  
                                  <Row>
                                      <Col>
                                          <Form.Group className="mb-1 ms-3">
                                              <FormLabel className="mb-1 mt-3 ms-3"><b>Available From</b></FormLabel>
                                              <FormControl type="date" className="ms-3 w-50" value={assignment.available ? formatDate(assignment.available) : ''} />
                                          </Form.Group>
                                      </Col>
                                      <Col>
                                          <Form.Group className="mb-1 ms-3">
                                              <FormLabel className="mb-1 mt-3 ms-3"><b>Until</b></FormLabel>
                                              <FormControl type="date" className="ms-3 w-50" />
                                          </Form.Group>
                                      </Col>
                                  </Row>
                              </Card>
                          </Col>
                      </Row>
                  </FormGroup><FormGroup>
                      <Link to={pathname.replace(/\/Assignments\/[^/]+$/, '/Assignments')} className="ms-2 float-end">
                          <Button variant="danger">Cancel</Button>
                      </Link>
                      <Link to={pathname.replace(/\/Assignments\/[^/]+$/, '/Assignments')} className="float-end">
                          <Button variant="secondary">Save</Button>
                      </Link>
                  </FormGroup></>
                  
        ))}
      </div>
    );
  }




my attempt i guess

export default function AssignmentEditor({ dialogTitle, assignmentName, setAssignmentName, addAssignment }:
    { dialogTitle: string; assignmentName: string; setAssignmentName: (name: string) => void; addAssignment: () => void; }) {
        return (
            <div id="wd-add-assignment-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            {dialogTitle} </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control" defaultValue={assignmentName} placeholder="Assignment Name"
                                onChange={(e) => setAssignmentName(e.target.value)}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel </button>
                            <button onClick={addAssignment} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                                Add Assignment </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }



*/