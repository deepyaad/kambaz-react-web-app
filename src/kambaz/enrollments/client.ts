import axios from "axios";
const SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${SERVER}/api/enrollments`;

const axiosWithCreds = axios.create({ withCredentials: true });

export const enroll = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCreds.post(ENROLLMENTS_API, { userId, courseId });
  return data;
};

export const unenroll = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCreds.delete(ENROLLMENTS_API, { data: { userId, courseId } });
  return data;
};

export const findEnrollmentsByUser = async (userId: string) => {
  const { data } = await axiosWithCreds.get(`${SERVER}/api/users/${userId}/enrollments`);
  return data;
};

export const findEnrollmentsByCourse = async (courseId: string) => {
  const { data } = await axiosWithCreds.get(`${SERVER}/api/courses/${courseId}/enrollments`);
  return data;
};
