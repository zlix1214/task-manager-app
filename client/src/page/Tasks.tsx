import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Task } from "../types/Task";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/task";

export const Tasks: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");

  // 先保留你的 token 驗證與跳轉
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const getTasks = async () => {
      try {
        const data = await fetchTasks(token);
        setTasks(data);
      } catch (err) {
        console.log("取得任務失敗", err);
      }
    };

    getTasks();
  }, [token, navigate]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !token) return;

    try {
      const newTask = await createTask(token, newTitle);
      setTasks((prev) => [newTask, ...prev]);
      setNewTitle("");
    } catch (err) {
      console.log("新增任務失敗", err);
    }
  };

  const handleChangeStatus = async (
    taskId: string,
    newStatus: Task["status"]
  ) => {
    if (!token) return;
    try {
      await updateTask(token, taskId, newStatus);
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.log("更新狀態失敗", err);
    }
  };

  const handleDelete = async (taskId: string) => {
    if (!token) return;
    try {
      await deleteTask(token, taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (err) {
      console.log("刪除失敗", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">任務列表</h1>

      <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="輸入任務名稱"
          className="flex-1 border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          新增
        </button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex item-center justify-between border-b py-2"
          >
            <div>
              <span className="mr-4">{task.title}</span>
              <select
                value={task.status}
                onChange={(e) =>
                  handleChangeStatus(task._id, e.target.value as Task["status"])
                }
                className="border p-1 rounded text-sm"
              >
                <option value="pending">待處理</option>
                <option value="in-progress">進行中</option>
                <option value="completed">已完成</option>
              </select>
            </div>
            <button
              onClick={() => handleDelete(task._id)}
              className="text-sm text-red-500 hover:underline"
            >
              刪除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
