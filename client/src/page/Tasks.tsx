import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Task } from "../types/Task";

export const Tasks: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");

  // 先保留你的 token 驗證與跳轉
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: Task = {
      _id: Date.now().toString(),
      title: newTitle,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
    setNewTitle("");
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
            className="flex items-center justify-between border-b py-2"
          >
            <span className={task.completed ? "line-through text-gray-500" : ""}>
              {task.title}
            </span>
            <div className="flex gap-2">
              <button className="text-sm text-blue-500 hover:underline">
                完成
              </button>
              <button className="text-sm text-red-500 hover:underline">
                刪除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
