import { useParams } from "react-router-dom";

export default function QuizPreview() {
  const { cid, qid } = useParams(); // Get params if needed for preview content

  return (
    <div>
      <h4>This is the Quiz Preview Screen</h4>
      <p>Course ID: {cid}</p>
      <p>Quiz ID: {qid}</p>
      <p>Here you would display the quiz questions and answers in a read-only format, as a student would see them before starting the quiz.</p>
      <p>Functionality to take the quiz (e.g., submitting answers, checking time limit) would be implemented here.</p>
    </div>
  );
}
