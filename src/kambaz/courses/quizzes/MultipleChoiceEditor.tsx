import { useState } from "react";
import { Card, Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";

export default function MultipleChoiceEditor({ question, index, quiz, setQuiz }: any) {
  const [localQuestion, setLocalQuestion] = useState({ 
    ...question,
    choices: question.choices || [],
  });

  const handleChoiceChange = (value: string, i: number) => {
    const updatedChoices = [...localQuestion.choices];
    updatedChoices[i] = value;
    setLocalQuestion({ ...localQuestion, choices: updatedChoices });
  };

  const addChoice = () => {
    setLocalQuestion({ ...localQuestion, choices: [...localQuestion.choices, ""] });
  };

  const removeChoice = (i: number) => {
    const updatedChoices = [...localQuestion.choices];
    updatedChoices.splice(i, 1);

    let newCorrect = localQuestion.correctAnswer;
    if (localQuestion.correctAnswer === i) {
      newCorrect = null;
    } else if (localQuestion.correctAnswer > i) {
      newCorrect -= 1;
    }

    setLocalQuestion({ ...localQuestion, choices: updatedChoices, correctAnswer: newCorrect });
  };

  const saveQuestion = () => {
    const updatedQuestions = [...(quiz?.questions || [])];
    updatedQuestions[index] = {
      ...localQuestion,
      type: "Multiple Choice",
      editing: false,
    };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const cancelEdit = () => {
    const updatedQuestions = [...(quiz?.questions || [])];
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
        <FormLabel>Choices</FormLabel>
        {localQuestion.choices.map((choice: string, i: number) => (
          <div key={i} className="d-flex align-items-center mb-2">
            <Form.Check
              type="radio"
              name={`correct-${index}`}
              checked={localQuestion.correctAnswer === i}
              onChange={() => setLocalQuestion({ ...localQuestion, correctAnswer: i })}
              className="me-2"
            />
            <FormControl
              value={choice}
              onChange={(e) => handleChoiceChange(e.target.value, i)}
              placeholder={`Option ${i + 1}`}
            />
            <Button
              variant="outline-danger"
              size="sm"
              className="ms-2"
              onClick={() => removeChoice(i)}
            >
              ✕
            </Button>
          </div>
        ))}
        <Button size="sm" onClick={addChoice}>
          + Add Choice
        </Button>
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