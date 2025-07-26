import axios from "axios";
import type { Task } from "../types/Task";

const API_URL = "http://localhost:5000/api/tasks";

export const fetchTasks = async (token: string): Promise<Task[]> => {
  const res = await axios.get<Task[]>(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


export const createTask = async (token: string, title:string): Promise<Task> =>{
    const res = await axios.post<Task>(
        API_URL, {title},
        {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
}


export const toggleTask = async (token: string, taskId: string, status: "pending" | "in-progress" | "completed"): Promise<Task> => {
  const res = await axios.patch<Task>(
    `${API_URL}/${taskId}/toggle`,
    {status},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};


export const deleteTask = async(token:string, taskId: string): Promise<void> =>{
    await axios.delete(`${API_URL}/${taskId}`,{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
};

