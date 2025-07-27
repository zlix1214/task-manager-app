import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Task } from "../types/Task";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/task";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

export const Tasks: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [changingId, setChangingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const getTasks = async () => {
      setIsFetching(true);
      try {
        const data = await fetchTasks(token);
        setTasks(data);
      } catch (err) {
        toast.error("取得任務失敗");
        console.log("取得任務失敗", err);
      } finally {
        setIsFetching(false);
      }
    };

    getTasks();
  }, [token, navigate]);

  const filteredTask = tasks.filter((task) => {
    const matchText = task.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchStatus = statusFilter === "all" || task.status === statusFilter;
    return matchText && matchStatus;
  });

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !token) return;

    setIsAdding(true);

    try {
      const newTask = await createTask(token, newTitle, newDescription);
      setTasks((prev) => [newTask, ...prev]);
      setNewTitle("");
      setNewDescription("");
      toast.success("新增成功");
    } catch (err) {
      toast.error("新增任務失敗");
      console.log("新增任務失敗", err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleChangeStatus = async (
    taskId: string,
    newStatus: Task["status"]
  ) => {
    if (!token) return;
    setChangingId(taskId);
    try {
      await updateTask(token, taskId, { status: newStatus });
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
      setSelectedTask((prev) =>
        prev && prev._id === taskId ? { ...prev, status: newStatus } : prev
      );
    } catch (err) {
      toast.error("更新狀態失敗");
      console.log("更新狀態失敗", err);
    } finally {
      setChangingId(null);
    }
  };

  const handleDelete = async (taskId: string) => {
    if (!token) return;
    setDeletingId(taskId);
    try {
      await deleteTask(token, taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (err) {
      toast.error("刪除任務失敗");
      console.log("刪除失敗", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaveEdit = async () => {
  if (!token || !selectedTask) return;

  try {
    await updateTask(token, selectedTask._id, {
      title: selectedTask.title,
      description: selectedTask.description,
      status: selectedTask.status,
    });

    // 同步更新 tasks 陣列
    setTasks((prev) =>
      prev.map((task) =>
        task._id === selectedTask._id ? { ...selectedTask } : task
      )
    );

    toast.success("更新成功");
    setIsEditing(false);
  } catch (err) {
    toast.error("更新失敗");
    console.log("更新失敗", err);
  }
};


  const handleLogout = async () => {
    try {
      logout();
      toast.success("登出成功");
    } catch (err) {
      toast.error("登出失敗");
      console.log("登出失敗", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">任務列表</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          登出
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="搜尋任務標題"
          className="flex-1 border p-2 rounded"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">全部</option>
          <option value="pending">待處理</option>
          <option value="in-progress">進行中</option>
          <option value="completed">已完成</option>
        </select>
      </div>
      <div className="max-w-xl mx-auto mt-10 p-4">
        <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
          <div className="flex flex-col gap-1 w-full">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="輸入任務名稱"
              className="border p-2 rounded"
            />
            <textarea
              className="border p-2 rounded"
              rows={3}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="輸入任務描述"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {isAdding ? "新增中..." : "新增"}
          </button>
        </form>

        {/* 載入中畫面 */}
        {isFetching ? (
          <Spinner />
        ) : (
          <ul>
            {filteredTask.map((task) => (
              <li
                key={task._id}
                onClick={() => setSelectedTask(task)}
                className="flex flex-col border-b py-2"
              >
                <div className=" flex item-center justify-between">
                  <span className="mr-auto">{task.title}</span>
                  {changingId === task._id ? (
                    <span className="text-blue-500 text-sm">更新中...</span>
                  ) : (
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleChangeStatus(
                          task._id,
                          e.target.value as Task["status"]
                        )
                      }
                      onClick={(e) => e.stopPropagation()}
                      className="border p-1 rounded text-sm mr-4"
                    >
                      <option value="pending">待處理</option>
                      <option value="in-progress">進行中</option>
                      <option value="completed">已完成</option>
                    </select>
                  )}
                  {deletingId === task._id ? (
                    <span className="text-red-400 text-sm">刪除中...</span>
                  ) : (
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      刪除
                    </button>
                  )}
                </div>
                <div>
                  {task.description && (
                    <p className="text-sm text-gray-500 mt-1">
                      {task.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedTask && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-50 ">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setSelectedTask(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            {isEditing ? (
              <input
                type="text"
                value={selectedTask?.title}
                onChange={(e) =>
                  setSelectedTask((prev) =>
                    prev ? { ...prev, title: e.target.value } : prev
                  )
                }
                className="border p-2 rounded w-full"
              />
            ) : (
              <h2 className="text-xl font-bold">{selectedTask?.title}</h2>
            )}
            {isEditing ? (
              <textarea
                rows={4}
                value={selectedTask?.description}
                onChange={(e) =>
                  setSelectedTask((prev) =>
                    prev ? { ...prev, description: e.target.value } : prev
                  )
                }
                className="border p-2 rounded w-full mt-2"
              />
            ) : (
              <p className="mt-2">{selectedTask?.description}</p>
            )}

            <div className="flex justify-between items-center">
              <select
                value={selectedTask.status}
                onChange={(e) =>
                  handleChangeStatus(
                    selectedTask._id,
                    e.target.value as Task["status"]
                  )
                }
                className="border p-2 rounded"
              >
                <option value="pending">待處理</option>
                <option value="in-progress">進行中</option>
                <option value="completed">已完成</option>
              </select>
              <div className="flex justify-end mt-4 gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-gray-500 hover:underline"
                    >
                      取消
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                      儲存
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    編輯
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
