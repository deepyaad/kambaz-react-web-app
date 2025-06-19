import { Form, Col, Button, Row, Card } from "react-bootstrap";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { addQuiz, updateQuiz as updateQuizInReducer } from "./reducer"; // Renamed updateQuiz to avoid conflict
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as quizzesClient from "./client"

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const isNew = qid === "new";


  const [quiz, setQuiz] = useState<any>({
    title: "",
    description: "",
    points: 100,
    due: "",
    available: "",
    until: "",
    course: cid,
    published: false, // Default to unpublished
  });

  const [originalQuiz, setOriginalQuiz] = useState<any>(null);


  useEffect(() => {
    if (!isNew) {
      // Find the quiz from Redux state when updating an existing quiz
      const found = quizzes.find((q: any) => q._id === qid);
      if (found) setQuiz(found);
      setOriginalQuiz(found);
    }
  }, [qid, quizzes, isNew]);


  const handleSave = async () => {
    if (!cid) return;
    if (isNew) {
      // For new quiz, create it for the specific course
      const saved = await quizzesClient.createQuizForCourse(cid, quiz);
      dispatch(addQuiz(saved));
    } else {
      // For existing quiz, update it.
      // Pass quiz._id as the first argument, and the quiz object (with updates) as the second.
      const updated = await quizzesClient.updateQuiz(quiz._id, quiz); // <-- FIX IS HERE
      dispatch(updateQuizInReducer(updated)); // Use the renamed action from reducer
    }
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  const handleCancel = () => {
    if (!isNew && originalQuiz) { // Corrected originalAssignment to originalQuiz
      setQuiz(originalQuiz); // Corrected setAssignment to setQuiz
    }
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };


  return (
    <div id="wd-quizzes-editor">
      <FormGroup className="mb-3">
        <FormLabel>Quiz Name</FormLabel>
        <FormControl
          type="text"
          value={quiz.title}
          onChange={(e) =>
            setQuiz({ ...quiz, title: e.target.value })
          }
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormControl
          as="textarea"
          rows={3}
          value={quiz.description}
          onChange={(e) =>
            setQuiz({ ...quiz, description: e.target.value })
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
              value={quiz.points}
              onChange={(e) =>
                setQuiz({ ...quiz, points: e.target.value })
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
                  value={quiz.due}
                  onChange={(e) =>
                    setQuiz({ ...quiz, due: e.target.value })
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
                      value={quiz.available}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
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
                      value={quiz.until || ""}
                      onChange={(e) =>
                        setQuiz({ ...quiz, until: e.target.value })
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