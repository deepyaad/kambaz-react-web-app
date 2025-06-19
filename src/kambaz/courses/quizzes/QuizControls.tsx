import { Container, InputGroup, Form, Button } from "react-bootstrap";
import { BsSearch } from 'react-icons/bs';
import { FaPlus } from "react-icons/fa6";
import { useParams, useNavigate } from "react-router-dom";

export default function QuizControls() { // Renamed component
  const { cid } = useParams();
  const navigate = useNavigate();

  return (
    <Container>
      <Button
        onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/new`)}
        variant="danger"
        size="lg"
        className="me-1 float-end"
        id="wd-add-quiz-btn" // Updated ID
      >
        <FaPlus className="position-relative me-2" />
        Quiz 
      </Button>

      <InputGroup className="mb-3 w-50">
        <InputGroup.Text>
          <BsSearch />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search..."
          className="border-gray"
        />
      </InputGroup>
    </Container>
  );
}