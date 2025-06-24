// QuizQuestionsEditor.tsx
import { useState } from "react";
import { Button, Card, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";

export default function QuizQuestionsEditor({ quiz, setQuiz, onSave, onCancel }: any) {
  const handleAddQuestion = () => {
    const newQuestion = {
      type: "Multiple Choice",
      title: "",
      options: ["", ""],
      correctAnswer: "",
      points: 1,
      editing: true,
    };
    setQuiz({
      ...quiz,
      questions: [...(quiz.questions || []), newQuestion],
    });
  };

  return (
    <div className="p-3 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Questions ({quiz.questions?.length || 0})</h4>
        <Button onClick={handleAddQuestion}>+ New Question</Button>
      </div>

      {quiz.questions?.map((q: any, index: number) =>
        q.editing ? (
          <Card className="mb-3 p-3" key={index}>
            <FormGroup className="mb-2">
              <FormLabel>Question Title</FormLabel>
              <FormControl
                value={q.title}
                onChange={(e) => {
                  const updated = [...quiz.questions];
                  updated[index].title = e.target.value;
                  setQuiz({ ...quiz, questions: updated });
                }}
              />
            </FormGroup>

            <FormGroup className="mb-2">
              <FormLabel>Question Type</FormLabel>
              <Form.Select
                value={q.type}
                onChange={(e) => {
                  const updated = [...quiz.questions];
                  updated[index].type = e.target.value;
                  setQuiz({ ...quiz, questions: updated });
                }}
              >
                <option>Multiple Choice</option>
                <option>True/False</option>
                <option>Fill in the Blank</option>
              </Form.Select>
            </FormGroup>

            {q.type === "Multiple Choice" &&
              q.options?.map((opt: string, i: number) => (
                <FormGroup key={i} className="mb-2">
                  <FormLabel>Option {i + 1}</FormLabel>
                  <FormControl
                    value={opt}
                    onChange={(e) => {
                      const updated = [...quiz.questions];
                      updated[index].options[i] = e.target.value;
                      setQuiz({ ...quiz, questions: updated });
                    }}
                  />
                </FormGroup>
              ))}
            {q.type === "Multiple Choice" && (
              <Button
                size="sm"
                onClick={() => {
                  const updated = [...quiz.questions];
                  updated[index].options.push("");
                  setQuiz({ ...quiz, questions: updated });
                }}
                className="mb-2"
              >
                Add Option
              </Button>
            )}

            {q.type === "True/False" && (
              <FormGroup className="mb-2">
                <FormLabel>Correct Answer</FormLabel>
                <Form.Select
                  value={q.correctAnswer}
                  onChange={(e) => {
                    const updated = [...quiz.questions];
                    updated[index].correctAnswer = e.target.value;
                    setQuiz({ ...quiz, questions: updated });
                  }}
                >
                  <option value="True">True</option>
                  <option value="False">False</option>
                </Form.Select>
              </FormGroup>
            )}

            {q.type === "Fill in the Blank" && (
              <FormGroup className="mb-2">
                <FormLabel>Correct Answer</FormLabel>
                <FormControl
                  value={q.correctAnswer}
                  onChange={(e) => {
                    const updated = [...quiz.questions];
                    updated[index].correctAnswer = e.target.value;
                    setQuiz({ ...quiz, questions: updated });
                  }}
                />
              </FormGroup>
            )}

            <FormGroup className="mb-2">
              <FormLabel>Points</FormLabel>
              <FormControl
                type="number"
                value={q.points}
                onChange={(e) => {
                  const updated = [...quiz.questions];
                  updated[index].points = parseInt(e.target.value);
                  setQuiz({ ...quiz, questions: updated });
                }}
              />
            </FormGroup>

            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => {
                  const updated = [...quiz.questions];
                  updated[index].editing = false;
                  setQuiz({ ...quiz, questions: updated });
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const updated = [...quiz.questions];
                  updated[index].editing = false;
                  setQuiz({ ...quiz, questions: updated });
                }}
              >
                Save
              </Button>
            </div>
          </Card>
        ) : (
          <Card
            className="mb-2 p-3"
            key={index}
            onClick={() => {
              const updated = [...quiz.questions];
              updated[index].editing = true;
              setQuiz({ ...quiz, questions: updated });
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex justify-content-between">
              <div>
                <strong>{q.title || "Untitled Question"}</strong>
                <br />
                <small>Type: {q.type}</small>
              </div>
              <div>{q.points} pts</div>
            </div>
          </Card>
        )
      )}

      <div className="mt-4 text-end">
        <h5>
          Total Points:{" "}
          {quiz.questions?.reduce(
            (sum: number, q: any) => sum + (parseInt(q.points) || 0),
            0
          ) || 0}
        </h5>
      </div>

      <FormGroup>
        <Button variant="danger" onClick={onCancel} className="ms-2 float-end">
          Cancel
        </Button>
        <Button variant="secondary" onClick={onSave} className="float-end">
          Save
        </Button>
      </FormGroup>
    </div>
  );
}