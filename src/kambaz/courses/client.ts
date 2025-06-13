import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;


const axiosWithAuth = axios.create({
  withCredentials: true,
});

export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axiosWithAuth.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const response = await axiosWithAuth.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const fetchAllCourses = async () => {
  const { data } = await axiosWithAuth.get(COURSES_API);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithAuth.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axiosWithAuth.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithAuth.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithAuth.post(COURSES_API, course);
  return data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axiosWithAuth.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const enrollInCourse = async (
  courseId: string,
  userId: string,
  action: "enroll" | "unenroll"
) => {
  const response = await fetch(
    `${REMOTE_SERVER}/api/users/${userId}/courses/${courseId}/enroll`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, action }),
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || "Enrollment request failed");
  }
};

export const fetchEnrollmentsForUser = async (userId: string) => {
  const response = await axios.get(`${REMOTE_SERVER}/api/users/${userId}/courses`, {
    withCredentials: true,
  });
  return response.data;
};
