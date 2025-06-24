import { Button, Card, FormGroup, FormLabel, Form } from "react-bootstrap"; // FormControl
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillBlankEditor from "./FillBlankEditor";

interface Question {
  type: string;
  title: string;
  points: number;
  options?: string[];
  correctAnswer?: any;
  answers?: string[];
  editing: boolean;
}

interface QuizQuestionsEditorProps {
  quiz: { questions: Question[] };
  setQuiz: (quiz: any) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function QuizQuestionsEditor({
  quiz,
  setQuiz,
  onSave,
  onCancel,
}: QuizQuestionsEditorProps) {
  const handleAddQuestion = () => {
    const newQuestion: Question = {
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

  const handleUpdateQuestion = (index: number, updatedQuestion: Question) => {
    const updated = [...quiz.questions];
    updated[index] = updatedQuestion;
    setQuiz({ ...quiz, questions: updated });
  };

  return (
    <div className="p-3 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Questions ({quiz.questions?.length || 0})</h4>
        <Button onClick={handleAddQuestion}>+ New Question</Button>
      </div>

      {quiz.questions?.map((q, index) =>
        q.editing ? (
          <Card className="mb-3 p-3" key={index}>
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

            {q.type === "Multiple Choice" && (
              <MultipleChoiceEditor
                question={q}
                index={index}
                quiz={quiz}
                setQuiz={setQuiz}
                onChange={(updated: Question) => handleUpdateQuestion(index, updated)}
              />
            )}
            {q.type === "True/False" && (
              <TrueFalseEditor
                question={q}
                index={index}
                quiz={quiz}
                setQuiz={setQuiz}
                onChange={(updated: Question) => handleUpdateQuestion(index, updated)}
              />
            )}
            {q.type === "Fill in the Blank" && (
              <FillBlankEditor
                question={q}
                index={index}
                quiz={quiz}
                setQuiz={setQuiz}
                onChange={(updated: Question) => handleUpdateQuestion(index, updated)}
              />
            )}

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
            (sum: number, q) => sum + (parseInt(q.points.toString()) || 0),
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