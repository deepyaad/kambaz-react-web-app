import QuizControls from "./QuizControls";
import { ListGroup } from "react-bootstrap";
import QuizControlButtons from "./QuizControlButtons";
import { BsGripVertical } from 'react-icons/bs';
import { RxRocket } from "react-icons/rx"; // For published icon
import { FaBan } from "react-icons/fa"; // For unpublished icon
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch, useSelector } from "react-redux";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import * as gradesClient from "../grades/client";
import { useEffect, useState } from "react";
import { deleteQuiz, setQuizzes } from "./reducer";


export default function Quizzes() {
  const { cid } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const { quizzes } = useSelector((state: any) => state.quizReducer) || { quizzes: [] };
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const [userGrades, setUserGrades] = useState<any[]>([]);

  const removeQuiz = async (quizId: string) => {
      await quizzesClient.deleteQuiz(quizId);
      dispatch(deleteQuiz(quizId));
  };

  const toggleQuizPublished = async (quizId: string, isPublished: boolean) => {
    try {
      if (!quizId) {
        console.error("Attempted to toggle publish for a quiz with no ID.");
        alert("Cannot update quiz: Missing quiz ID.");
        return;
      }
      const quizToUpdate = quizzes.find((q: any) => q._id === quizId);
      if (!quizToUpdate) {
        console.error(`Quiz with ID ${quizId} not found in state for publishing toggle.`);
        alert("Quiz not found to update.");
        return;
      }
      if (!quizToUpdate._id) {
          console.error(`Quiz found in state has no _id:`, quizToUpdate);
          alert("Quiz data incomplete: Missing ID.");
          return;
      }
      const updatedQuiz = await quizzesClient.updateQuiz(quizToUpdate._id, { ...quizToUpdate, published: isPublished });
      fetchQuizzesAndGrades();
    } catch (error) {
      console.error("Error toggling quiz published status:", error);
      alert("Failed to update quiz published status.");
    }
  };

  const fetchQuizzesAndGrades = async () => {
      const fetchedQuizzes = await coursesClient.findQuizzesForCourse(cid as string);
      const cleanQuizzes = fetchedQuizzes.filter((q:any) => q && q._id);
      dispatch(setQuizzes(cleanQuizzes));

      if (!isFaculty && currentUser?._id && cid) {
          try {
              const grades = await gradesClient.findGradesForUserAndCourse(currentUser._id, cid);
              setUserGrades(grades);
          } catch (error) {
              console.error("Error fetching user grades:", error);
              setUserGrades([]);
          }
      } else if (isFaculty) {
          setUserGrades([]);
      }
  };

  const handleSortQuizzes = (sortKey: string) => {
    const sortedQuizzes = [...quizzes].sort((a, b) => {
      if (sortKey === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortKey === 'due') {
        const dateA = new Date(a.due).getTime();
        const dateB = new Date(b.due).getTime();
        return dateA - dateB;
      } else if (sortKey === 'available') {
        const dateA = new Date(a.available).getTime();
        const dateB = new Date(b.available).getTime();
        return dateA - dateB;
      }
      return 0;
    });
    dispatch(setQuizzes(sortedQuizzes));
  };

  useEffect(() => {
      fetchQuizzesAndGrades();
  }, [cid, currentUser?._id, isFaculty]);


  const getAvailabilityStatus = (quiz: any) => {
    const now = new Date();
    const availableDate = quiz.available ? new Date(quiz.available) : null;
    const untilDate = quiz.until ? new Date(quiz.until) : null;
    const dueDate = quiz.due ? new Date(quiz.due) : null;

    if (availableDate && now < availableDate) {
      return `Not available until ${availableDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }
    if (untilDate && now > untilDate) {
      return "Closed";
    }
    if (dueDate && now > dueDate) {
        return "Closed";
    }
    if (availableDate && now >= availableDate) {
        return "Available";
    }
    return "No availability info";
  };


  return (
    <div className="w-100">
        {isFaculty && (
            <QuizControls />
        )}
      <br /><br /><br /><br />

      <ListGroup className="rounded-0 w-100" id="wd-modules">
        <ListGroup.Item className="wd-quiz p-3 ps-1 bg-secondary align-items-center">
          <BsGripVertical className="me-2 fs-3" />
          <b>Assignment Quizzes</b>
        </ListGroup.Item>

        {quizzes
          .filter((quiz: any) => quiz.course === cid && (isFaculty || quiz.published))
          .map((quiz: any) => {
            const currentStudentGrade = !isFaculty && userGrades.find((grade: any) => grade.quizId === quiz._id);
            const scoreToDisplay = currentStudentGrade ? currentStudentGrade.grade : null;

            return (
              <ListGroup.Item className="wd-quiz p-3 ps-1" key={quiz._id}>
                <BsGripVertical className="me-2 fs-3" />
                {quiz.published ? (
                  <RxRocket
                    className="me-2 fs-3 document-icon"
                    style={{ color: 'green' }}
                  />
                ) : (
                  <FaBan
                    className="me-2 fs-3 document-icon"
                    style={{ color: 'red' }}
                  />
                )}

                {isFaculty && (
                  <QuizControlButtons
                    quiz={quiz}
                    deleteQuiz={(qId) => removeQuiz(qId)}
                    quizCourse={quiz.course}
                    publishQuiz={toggleQuizPublished}
                    isPublished={quiz.published}
                    onSortQuizzes={handleSortQuizzes}
                  />
                )}


                <b
                  onClick={() => navigate(`/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {quiz.title}
                </b>

                <p className="mb-0 ps-5 p-1">
                  <span className="text-danger ps-4">
                      {getAvailabilityStatus(quiz)}
                  </span>
                  {quiz.due && <> | <b>Due </b> {new Date(quiz.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</>}
                  {quiz.points !== undefined && <> | {quiz.points} pts</>}
                  {quiz.numQuestions !== undefined && <> | {quiz.numQuestions} questions</>}
                  {!isFaculty && currentUser?._id && (
                      <> | Score: {scoreToDisplay !== null ? `${scoreToDisplay}/${quiz.points || 'N/A'}` : 'Not Taken'}</>
                  )}
                </p>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </div>
  );
}


/*
import QuizControls from "./QuizControls"; 
import { ListGroup } from "react-bootstrap";
import QuizControlButtons from "./QuizControlButtons"; 
import { BsGripVertical } from 'react-icons/bs';
import { RxRocket } from "react-icons/rx";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as coursesClient from "../client";
import * as quizzesClient from "./client"; 
import { useEffect} from "react";
import { deleteQuiz, setQuizzes } from "./reducer"; 


export default function Quizzes() { // Renamed component
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizReducer); // Changed assignmentReducer to quizReducer, assignments to quizzes
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";


  const removeQuiz = async (quizId: string) => { // Renamed function and parameter
      await quizzesClient.deleteQuiz(quizId); // Changed assignmentsClient to quizzesClient, deleteAssignment to deleteQuiz
      dispatch(deleteQuiz(quizId)); // Changed deleteAssignment to deleteQuiz
  };

  const fetchQuizzes = async () => { // Renamed function
      const quizzes = await coursesClient.findQuizzesForCourse(cid as string); // Changed findAssignmentsForCourse to findQuizzesForCourse
      dispatch(setQuizzes(quizzes)); // Changed setAssignments to setQuizzes
  };
  useEffect(() => {
      fetchQuizzes();
  }, []);


  return (
    <div>
        {isFaculty && (
            <QuizControls />
        )}
      <br /><br /><br /><br />

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-quiz p-3 ps-1 bg-secondary align-items-center"> 
          <BsGripVertical className="me-2 fs-3" />
          <b>Assignment Quizzes</b> 
        </ListGroup.Item>

        {quizzes 
          .filter((quiz: any) => quiz.course === cid) // Filter by quiz.course
          .map((quiz: any) => ( 
            <ListGroup.Item className="wd-quiz p-3 ps-1" key={quiz._id}> 
              <BsGripVertical className="me-2 fs-3" />
              <RxRocket className="me-2 fs-3 document-icon" />

              {isFaculty && (
                <QuizControlButtons 
                  quizId={quiz._id} 
                  deleteQuiz={(qId) => removeQuiz(qId)} 
                  quizCourse={quiz.course}
                />
              )}

              <b>
                {isFaculty ? (
                  <a
                    href={`#/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}`}
                    className="wd-quiz-link"
                  >
                    {quiz.title}
                  </a>
                ) : (
                  quiz.title // Display quiz title
                )}
              </b>

              <p className="mb-0 ps-5 p-1">
                <span className="text-danger ps-4">Multiple Modules</span> |
                <b> Not available until </b> {quiz.available} at 12:00am |
                <b> Due </b> {quiz.due} at 11:59pm | {quiz.points} pts 
              </p>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}
  */