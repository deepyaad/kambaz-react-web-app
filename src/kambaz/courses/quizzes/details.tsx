import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as quizzesClient from "./client";
import { Button, Card, Col, Row, ListGroup } from "react-bootstrap";
import QuizEditor from "./editor"; 
import QuizPreview from "./preview"; 

export default function QuizDetails() {
  const { cid, qid } = useParams(); // Course ID and Quiz ID from URL
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer); 
  const isFaculty = currentUser?.role === "FACULTY";

  const [quiz, setQuiz] = useState<any>(null); 
  const [currentView, setCurrentView] = useState<'details' | 'edit' | 'preview'>('details');

  
  useEffect(() => {
    const fetchQuizDetails = async () => {
      if (qid && qid !== "new") { 
        try {
          const fetchedQuiz = await quizzesClient.findQuizById(qid);
          setQuiz(fetchedQuiz);
          setCurrentView('details'); 
        } catch (error) {
          console.error("Error fetching quiz details:", error);
          setQuiz(null); 
          setCurrentView('details'); 
        }
      }
    };
    fetchQuizDetails();
  }, [qid]);

  
  const formatBoolean = (value: boolean) => (value ? "Yes" : "No");

  
  if (!quiz) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <h3>Loading Quiz Details or Quiz Not Found...</h3>
      </div>
    );
  }

  return (
    <div className="p-3 w-100">
      <h2 className="mb-4">{quiz.title}</h2>
      <h3>PROOF THAT IS IT NAVIGATING</h3>

      
      <div className="d-flex justify-content-end mb-3">
        {isFaculty ? (
          <>
            <Button
              variant="secondary"
              className="me-2"
              onClick={() => setCurrentView('preview')}
            >
              Preview
            </Button>
            <Button
              variant="primary"
              onClick={() => setCurrentView('edit')}
            >
              Edit
            </Button>
          </>
        ) : (
          <Button
            variant="success"
            onClick={() => alert("Start Quiz functionality (to be implemented)")} // Placeholder for starting quiz
          >
            Start Quiz
          </Button>
        )}
      </div>
      <hr />

     
      {currentView === 'details' && (
        <Card className="mb-4 shadow-sm">
          <Card.Header className="bg-light">
            <h3>Quiz Properties</h3> {/* Changed title from "Quiz Details" to "Quiz Properties" */}
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col md={4} className="fw-bold">Quiz Type:</Col>
                <Col md={8}>{quiz.quizType}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={4} className="fw-bold">Points:</Col>
                <Col md={8}>{quiz.points}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={4} className="fw-bold">Assignment Group:</Col>
                <Col md={8}>{quiz.assignmentGroup}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={4} className="fw-bold">Shuffle Answers:</Col>
                <Col md={8}>{formatBoolean(quiz.shuffleAnswers)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={4} className="fw-bold">Time Limit:</Col>
                <Col md={8}>{quiz.timeLimit ? `${quiz.timeLimit} Minutes` : "No Limit"}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={4} className="fw-bold">Multiple Attempts:</Col>
                <Col md={8}>{formatBoolean(quiz.multipleAttempts)}</Col>
              </Row>
            </ListGroup.Item>
            {quiz.multipleAttempts && (
              <ListGroup.Item>
                <Row>
                  <Col md={{ span: 8, offset: 4 }} className="ms-auto"> {/* Adjusted offset for better alignment */}
                    <span className="fw-bold">How Many Attempts:</span> {quiz.howManyAttempts}
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Row>
                <Col md={4} className="fw-bold">Show Correct Answers:</Col>
                <Col md={8}>{quiz.showCorrectAnswers}</Col>
              </Row>
            </ListGroup.Item>
            {quiz.accessCode && (
              <ListGroup.Item>
                <Row>
                  <Col md={4} className="fw-bold">Access Code:</Col>
                  <Col md={8}>{quiz.accessCode}</Col>
                </Row>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Row>
                <Col md={4} className="fw-bold">One Question at a Time:</Col>
                <Col md={8}>{formatBoolean(quiz.oneQuestionAtATime)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={4} className="fw-bold">Webcam Required:</Col>
                <Col md={8}>{formatBoolean(quiz.webcamRequired)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={4} className="fw-bold">Lock Questions After Answering:</Col>
                <Col md={8}>{formatBoolean(quiz.lockQuestionsAfterAnswering)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={4} className="fw-bold">Due Date:</Col>
                <Col md={8}>{new Date(quiz.due).toLocaleString()}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={4} className="fw-bold">Available Date:</Col>
                <Col md={8}>{new Date(quiz.available).toLocaleString()}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={4} className="fw-bold">Until Date:</Col>
                <Col md={8}>{new Date(quiz.until).toLocaleString()}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      )}

      {currentView === 'edit' && (
        <Card className="mb-4 shadow-sm p-3">
          <Card.Header className="bg-light mb-3">
            <h3>Edit Quiz</h3>
          </Card.Header>
          <QuizEditor />
          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={() => setCurrentView('details')}>
              Back to Details
            </Button>
          </div>
        </Card>
      )}

      {currentView === 'preview' && (
        <Card className="mb-4 shadow-sm p-3">
          <Card.Header className="bg-light mb-3">
            <h3>Quiz Preview</h3>
          </Card.Header>
          {/* Render QuizPreview here. Pass necessary props */}
          <QuizPreview />
          {/* Add a button to go back to details */}
          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={() => setCurrentView('details')}>
              Back to Details
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}