import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { useState } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch
import { addQuiz, setQuizzes } from "./reducer"; // Assuming these actions are from your quiz reducer
import * as coursesClient from "../client";


export default function QuizControlButtons({
  quiz, // Changed from quizId to full quiz object to allow copying details
  deleteQuiz,
  quizCourse, // This is `quiz.course`
  publishQuiz,
  isPublished,
  // Add a prop for sorting the overall list
  onSortQuizzes, // New prop: a function passed from parent to sort the main quizzes list
}: {
  quiz: any; // Now expects the full quiz object
  deleteQuiz: (id: string) => void;
  quizCourse: string;
  publishQuiz?: (id: string, published: boolean) => void;
  isPublished?: boolean;
  onSortQuizzes?: (sortKey: string) => void; // Function to trigger sort in parent
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleEdit = () => {
    navigate(`/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}`); // Use quiz.course and quiz._id
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    deleteQuiz(quiz._id); // Use quiz._id
    setShowDeleteConfirm(false);
  };

  const handlePublishToggle = () => {
    if (publishQuiz) {
      publishQuiz(quiz._id, !isPublished); // Use quiz._id
    }
  };

  const handleCopy = async () => {
    const newCourseId = prompt("Enter the Course ID to copy this quiz to (leave empty for current course):", quiz.course);

    if (newCourseId === null) { // User clicked cancel on prompt
      return;
    }

    const targetCourseId = newCourseId || quiz.course;

    // Create a copy of the quiz data, excluding _id for new creation
    const quizCopy = {
      title: `${quiz.title} (Copy)`, // Add (Copy) to the title
      description: quiz.description,
      points: quiz.points,
      due: quiz.due,
      available: quiz.available,
      until: quiz.until,
      course: targetCourseId, // Set to the target course ID
      published: false, // Copies are usually unpublished by default
    };

    try {
      const createdQuiz = await coursesClient.createQuizForCourse(targetCourseId, quizCopy);
      
      if (targetCourseId === quiz.course) {
        dispatch(addQuiz(createdQuiz)); // Dispatch addQuiz to update Redux store
      }
      alert(`Quiz "${createdQuiz.title}" copied successfully to course ${targetCourseId}!`);
    } catch (error) {
      console.error("Error copying quiz:", error);
      alert("Failed to copy quiz. See console for details.");
    }
  };

  const handleSortBy = (sortKey: string) => {
    if (onSortQuizzes) {
      onSortQuizzes(sortKey); // Call the sorting function passed from the parent
    }
  };

  return (
    <div className="float-end">
      <GreenCheckmark />

      <Dropdown className="d-inline ms-2">
        <Dropdown.Toggle variant="link" id={`quiz-options-${quiz._id}`} className="p-0 border-0 text-decoration-none">
          <IoEllipsisVertical className="fs-4 text-black" style={{ cursor: "pointer" }} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={handleDeleteClick}>Delete</Dropdown.Item>
          {publishQuiz && (
            <Dropdown.Item onClick={handlePublishToggle}>
              {isPublished ? "Unpublish" : "Publish"}
            </Dropdown.Item>
          )}
          <Dropdown.Item onClick={handleCopy}>Copy</Dropdown.Item>

          <Dropdown.Divider /> 

          <Dropdown.Header>Sort By</Dropdown.Header>
          <Dropdown.Item onClick={() => handleSortBy('title')}>Title</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortBy('due')}>Due Date</Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortBy('available')}>Available Date</Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>

      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

/*

import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 

export default function QuizControlButtons({
  quizId, 
  deleteQuiz, 
  quizCourse
}: {
  quizId: string; 
  deleteQuiz: (id: string) => void; 
  quizCourse: string;
}) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="float-end">
      <FaTrash
        className="text-danger me-2"
        onClick={() => setShow(true)}
        style={{ cursor: "pointer" }}
      />
      <GreenCheckmark />
      <IoEllipsisVertical
        className="fs-4"
        onClick={() => {
          navigate(`/Kambaz/Courses/${quizCourse}/Quizzes/${quizId}`);
        }}
        style={{ cursor: 'pointer' }}
      />

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title> 
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body> 
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteQuiz(quizId); 
              setShow(false);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
  */