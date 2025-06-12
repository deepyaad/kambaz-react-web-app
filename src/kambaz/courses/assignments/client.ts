import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

// This axios instance is configured to send cookies with requests
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const updateAssignment = async (assignment: any) => {
  const { data } = await axiosWithCredentials.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return data;
};

export const deleteAssignment = async (assignmentId: string) => {
 const response = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
 return response.data; };