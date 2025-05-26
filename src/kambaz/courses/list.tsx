import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function CourseList() {
  const { courses } = useSelector((state: any) => state.courseReducer);

  return (
    <div>
      <h2 className="mb-3">All Courses</h2>
      <Row xs={1} md={4} className="g-4">
        {courses.map((course: any) => (
          <Col key={course._id}>
            <Card>
              <Card.Img src={`/images/${course.image}`} height={150} />
              <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <Link to={`/Kambaz/Courses/${course._id}/Home`}>
                  <Button>Go to Course</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
