import { Tabs, Tab } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as quizzesClient from "./client";
import { addQuiz, updateQuiz as updateQuizInReducer } from "./reducer";

import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const isNew = qid === "new";

  const [quiz, setQuiz] = useState<any>({
    title: "",
    description: "",
    points: 100,
    due: "",
    available: "",
    until: "",
    course: cid,
    published: false,
    questions: [],
  });

  const [originalQuiz, setOriginalQuiz] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    async function fetchQuiz() {
      if (!isNew && qid) {
        const foundQuiz = await quizzesClient.findQuizById(qid);
        if (foundQuiz) {
          setQuiz(foundQuiz);
          setOriginalQuiz(foundQuiz);
        }
      }
    }
    fetchQuiz();
  }, [qid, isNew]);


  const handleSave = async () => {
    if (!cid) return;
    if (isNew) {
      const saved = await quizzesClient.createQuizForCourse(cid, quiz);
      dispatch(addQuiz(saved));
    } else {
      const updated = await quizzesClient.updateQuiz(quiz._id, quiz);
      dispatch(updateQuizInReducer(updated));
    }
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  const handleCancel = () => {
    if (!isNew && originalQuiz) {
      setQuiz(originalQuiz);
    }
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  return (
    <div id="wd-quizzes-editor">
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || "details")} className="mb-3">
        <Tab eventKey="details" title="Details">
          <QuizDetailsEditor quiz={quiz} setQuiz={setQuiz} onSave={handleSave} onCancel={handleCancel} />
        </Tab>
        <Tab eventKey="questions" title="Questions">
          <QuizQuestionsEditor quiz={quiz} setQuiz={setQuiz} onSave={handleSave} onCancel={handleCancel} />
        </Tab>
      </Tabs>
    </div>
  );
}