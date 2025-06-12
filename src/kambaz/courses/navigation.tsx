import { Link, useLocation, useParams } from "react-router-dom";

export default function CourseNavigation() {
  const { cid } = useParams(); 
  console.log("Course ID in Navigation:", cid);
  const { pathname } = useLocation(); 
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  const navLinks = links.map((link) => {
    const linkPath = `/Kambaz/Courses/${cid}/${link}`;
    const isActive = pathname.includes(link);

    return (
      <Link
        key={link}
        to={linkPath}
        className={`list-group-item border border-0 ${isActive ? "active" : "text-danger"}`}
      >
        {link}
      </Link>
    );
  });

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      { navLinks }
    </div>
  );
}

