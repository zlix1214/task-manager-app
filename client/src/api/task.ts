import axios from "axios";
import type { Task } from "../types/Task";


const API_URL =
  (import.meta.env.VITE_BACKEND_URL
    ? `${import.meta.env.VITE_BACKEND_URL}/api/login`
    : 'http://localhost:5000/api/login');


export const fetchTasks = async (token: string): Promise<Task[]> => {
  const res = await axios.get<Task[]>(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


export const createTask = async (token: string, title:string, description:string): Promise<Task> =>{
    const res = await axios.post<Task>(
        API_URL, {title, description},
        {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
}


// 更新任務（支援 title、description、status）
export const updateTask = async (
  token: string,
  taskId: string,
  updates: Partial<{
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
  }>
): Promise<void> => {
  await axios.patch(
    `${API_URL}/${taskId}`,
    updates,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};



export const deleteTask = async(token:string, taskId: string): Promise<void> =>{
    await axios.delete(`${API_URL}/${taskId}`,{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
};

