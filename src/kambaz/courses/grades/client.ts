import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
// const GRADES_API = `${REMOTE_SERVER}/api/grades`; // Not directly used in the problematic line
// const USERS_API = `${REMOTE_SERVER}/api/users`;   // Not directly used in the problematic line
// const COURSES_API = `${REMOTE_SERVER}/api/courses`; // Not directly used in the problematic line

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const findGradesForUserAndCourse = async (userId: string, courseId: string) => {
  // CORRECTED: Construct the URL directly to avoid duplicating the REMOTE_SERVER prefix.
  // The backend route is expected to be /api/users/:userId/courses/:courseId/grades
  const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/users/${userId}/courses/${courseId}/grades`);
  return response.data;
};