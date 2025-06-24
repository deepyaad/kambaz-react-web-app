import { useState } from "react";
import { Card, Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";

export default function FillBlankEditor({ question, index, quiz, setQuiz }: any) {
  const [localQuestion, setLocalQuestion] = useState({
    ...question,
    answers: question.answers || [""],
    caseInsensitive: question.caseInsensitive ?? true,
  });

  const updateAnswer = (value: string, i: number) => {
    const newAnswers = [...localQuestion.answers];
    newAnswers[i] = value;
    setLocalQuestion({ ...localQuestion, answers: newAnswers });
  };

  const addAnswer = () => {
    setLocalQuestion({ ...localQuestion, answers: [...localQuestion.answers, ""] });
  };

  const removeAnswer = (i: number) => {
    const newAnswers = localQuestion.answers.filter((_: string, idx: number) => idx !== i);
    setLocalQuestion({ ...localQuestion, answers: newAnswers });
  };

  const saveQuestion = () => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index] = {
      ...localQuestion,
      type: "Fill in the Blank",
      editing: false,
    };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const cancelEdit = () => {
    const updated = [...quiz.questions];
    updated[index].editing = false;
    setQuiz({ ...quiz, questions: updated });
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
        <FormLabel>Acceptable Answers</FormLabel>
        {localQuestion.answers.map((ans: string, i: number) => (
          <div key={i} className="d-flex mb-2">
            <FormControl
              value={ans}
              onChange={(e) => updateAnswer(e.target.value, i)}
              className="me-2"
            />
            <Button variant="danger" onClick={() => removeAnswer(i)} size="sm">
              Remove
            </Button>
          </div>
        ))}
        <Button variant="outline-primary" onClick={addAnswer} size="sm">
          + Add Answer
        </Button>
      </FormGroup>

      <FormGroup className="mb-2">
        <Form.Check
          type="checkbox"
          label="Case Insensitive Match"
          checked={localQuestion.caseInsensitive}
          onChange={(e) =>
            setLocalQuestion({ ...localQuestion, caseInsensitive: e.target.checked })
          }
        />
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