import { Form, Row, Col, Card, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

export default function QuizDetailsEditor({ quiz, setQuiz, onSave, onCancel }: any) {
  return (
    <>
      <FormGroup className="mb-3">
        <FormLabel>Quiz Name</FormLabel>
        <FormControl
            type="text"
            value={quiz.title || ""}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormControl
          as="textarea"
          rows={3}
          value={quiz.description}
          onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
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

        <FormGroup className="mb-3">
        <FormLabel>Number of Questions</FormLabel>
        <FormControl
            type="number"
            value={quiz.numQuestions}
            onChange={(e) =>
            setQuiz({ ...quiz, numQuestions: parseInt(e.target.value) })
            }
        />
        </FormGroup>

        <FormGroup className="mb-3">
        <FormLabel>Quiz Type</FormLabel>
        <FormControl
            as="select"
            value={quiz.quizType}
            onChange={(e) =>
            setQuiz({ ...quiz, quizType: e.target.value })
            }
        >
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
        </FormControl>
        </FormGroup>

        <FormGroup className="mb-3">
        <FormLabel>Assignment Group</FormLabel>
        <FormControl
            as="select"
            type="text"
            value={quiz.assignmentGroup}
            defaultValue={"Quizzes"}
            onChange={(e) =>
            setQuiz({ ...quiz, assignmentGroup: e.target.value })
            }
        >
            <option value="Quizzes">Quizzes</option>
            <option value="Exams">Exams</option>
            <option value="Assignments">Assignments</option>
            <option value="Project">Project</option>
        </FormControl>
        </FormGroup>

        <FormGroup className="mb-3">
        <Form.Check
            type="checkbox"
            label="Shuffle Answers"
            checked={quiz.shuffleAnswers}
            defaultChecked={true}
            onChange={(e) =>
            setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
            }
        />
        </FormGroup>

        <FormGroup className="mb-3">
        <FormLabel>Time Limit (minutes)</FormLabel>
        <FormControl
            type="number"
            value={quiz.timeLimit}
            onChange={(e) =>
            setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })
            }
        />
        </FormGroup>

        <FormGroup className="mb-3">
        <Form.Check
            type="checkbox"
            label="Allow Multiple Attempts"
            checked={quiz.multipleAttempts}
            onChange={(e) =>
            setQuiz({ ...quiz, multipleAttempts: e.target.checked })
            }
        />
        </FormGroup>

        {quiz.multipleAttempts && (
        <FormGroup className="mb-3">
            <FormLabel>How Many Attempts</FormLabel>
            <FormControl
            type="number"
            value={quiz.howManyAttempts}
            onChange={(e) =>
                setQuiz({ ...quiz, howManyAttempts: parseInt(e.target.value) })
            }
            />
        </FormGroup>
        )}

        <FormGroup className="mb-3">
        <FormLabel>Show Correct Answers</FormLabel>
        <FormControl
            as="select"
            value={quiz.showCorrectAnswers}
            onChange={(e) =>
            setQuiz({ ...quiz, showCorrectAnswers: e.target.value })
            }
        >
            <option value="Immediately">Immediately</option>
            <option value="After Due Date">After Due Date</option>
            <option value="Manually">Manually</option>
        </FormControl>
        </FormGroup>

        <FormGroup className="mb-3">
        <FormLabel>Access Code</FormLabel>
        <FormControl
            type="text"
            value={quiz.accessCode}
            onChange={(e) =>
            setQuiz({ ...quiz, accessCode: e.target.value })
            }
        />
        </FormGroup>

        <FormGroup className="mb-3">
        <Form.Check
            type="checkbox"
            label="One Question At A Time"
            checked={quiz.oneQuestionAtATime}
            onChange={(e) =>
            setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })
            }
        />
        </FormGroup>

        <FormGroup className="mb-3">
        <Form.Check
            type="checkbox"
            label="Require Webcam"
            checked={quiz.webcamRequired}
            onChange={(e) =>
            setQuiz({ ...quiz, webcamRequired: e.target.checked })
            }
        />
        </FormGroup>

        <FormGroup className="mb-3">
        <Form.Check
            type="checkbox"
            label="Lock Questions After Answering"
            checked={quiz.lockQuestionsAfterAnswering}
            onChange={(e) =>
            setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })
            }
        />
        </FormGroup>

        <FormGroup className="mb-3">
        <Form.Check
            type="checkbox"
            label="Published"
            checked={quiz.published}
            onChange={(e) =>
            setQuiz({ ...quiz, published: e.target.checked })
            }
        />
        </FormGroup>

      <FormGroup>
        <Button variant="danger" onClick={onCancel} className="ms-2 float-end">
          Cancel
        </Button>
        <Button variant="secondary" onClick={onSave} className="float-end">
          Save
        </Button>
      </FormGroup>
    </>
  );
}