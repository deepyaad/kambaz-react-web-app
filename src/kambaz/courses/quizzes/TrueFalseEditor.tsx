import { useState } from "react";
import { Card, Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";

export default function TrueFalseEditor({ question, index, quiz, setQuiz }: any) {
  const [localQuestion, setLocalQuestion] = useState({ ...question });

  const saveQuestion = () => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index] = {
      ...localQuestion,
      type: "True/False",
      editing: false,
    };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const cancelEdit = () => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index].editing = false;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  return (
    <Card className="mb-3 p-3">
      <FormGroup className="mb-2">
        <FormLabel>Question Title</FormLabel>
        <FormControl
          value={localQuestion.title}
          onChange={(e) => setLocalQuestion({ ...localQuestion, title: e.target.value })}
        />
      </FormGroup>

      <FormGroup className="mb-2">
        <FormLabel>Question Text</FormLabel>
        <FormControl
          as="textarea"
          rows={3}
          value={localQuestion.question}
          onChange={(e) => setLocalQuestion({ ...localQuestion, question: e.target.value })}
        />
      </FormGroup>

      <FormGroup className="mb-2">
        <FormLabel>Correct Answer</FormLabel>
        <div>
          <Form.Check
            inline
            type="radio"
            label="True"
            checked={localQuestion.correctAnswer === true}
            onChange={() => setLocalQuestion({ ...localQuestion, correctAnswer: true })}
          />
          <Form.Check
            inline
            type="radio"
            label="False"
            checked={localQuestion.correctAnswer === false}
            onChange={() => setLocalQuestion({ ...localQuestion, correctAnswer: false })}
          />
        </div>
      </FormGroup>

      <FormGroup className="mb-2">
        <FormLabel>Points</FormLabel>
        <FormControl
          type="number"
          value={localQuestion.points}
          onChange={(e) =>
            setLocalQuestion({ ...localQuestion, points: parseInt(e.target.value) })
          }
        />
      </FormGroup>

      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={cancelEdit}>
          Cancel
        </Button>
        <Button onClick={saveQuestion}>Save</Button>
      </div>
    </Card>
  );
}