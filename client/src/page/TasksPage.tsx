import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Task } from "../types/Task";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/task";
import { toast } from "react-toastify";

// 子元件
import { TaskHeader } from "../components/TaskHeader";
import { TaskFilters } from "../components/TaskFilters";
import { TaskForm } from "../components/TaskForm";
import { TaskSelectionControls } from "../components/TaskSelectionControls";
import { TaskList } from "../components/TaskList";
import { TaskModal } from "../components/TaskModal";

export const TasksPage: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  // 篩選和搜尋狀態
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // 任務相關狀態
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Loading 狀態
  const [isFetching, setIsFetching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [changingId, setChangingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // 選取模式狀態
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 認證檢查和初始載入
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

  // 篩選任務
  const filteredTasks = tasks.filter((task) => {
    const matchText = task.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchStatus = statusFilter === "all" || task.status === statusFilter;
    return matchText && matchStatus;
  });

  // 新增任務
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

  // 更新任務狀態
  const handleChangeStatus = async (taskId: string, newStatus: Task["status"]) => {
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

  // 刪除任務
  const handleDelete = async (taskId: string) => {
    if (!token) return;
    setDeletingId(taskId);
    try {
      await deleteTask(token, taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      if (selectedTask?._id === taskId) {
        setSelectedTask(null);
      }
      toast.success("刪除成功");
    } catch (err) {
      toast.error("刪除任務失敗");
      console.log("刪除失敗", err);
    } finally {
      setDeletingId(null);
    }
  };

  // 儲存編輯
  const handleSaveEdit = async (updatedTask: Task) => {
    if (!token) return;

    try {
      await updateTask(token, updatedTask._id, {
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
      });

      setTasks((prev) =>
        prev.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
      setSelectedTask(updatedTask);
      toast.success("更新成功");
      setIsEditing(false);
    } catch (err) {
      toast.error("更新失敗");
      console.log("更新失敗", err);
    }
  };

  // 登出
  const handleLogout = async () => {
    try {
      logout();
      toast.success("登出成功");
    } catch (err) {
      toast.error("登出失敗");
      console.log("登出失敗", err);
    }
  };

  // 選取模式相關處理
  const handleToggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    setSelectedIds([]);
  };

  const handleSelectAll = () => {
    setSelectedIds(filteredTasks.map((task) => task._id));
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  const handleTaskSelect = (taskId: string, selected: boolean) => {
    if (selected) {
      setSelectedIds((prev) => [...prev, taskId]);
    } else {
      setSelectedIds((prev) => prev.filter((id) => id !== taskId));
    }
  };

  // 批量操作
  const handleBulkDelete = async () => {
    if (!token || selectedIds.length === 0) return;
    
    try {
      await Promise.all(selectedIds.map((id) => deleteTask(token, id)));
      setTasks((prev) => prev.filter((task) => !selectedIds.includes(task._id)));
      toast.success("批量刪除成功");
      setSelectedIds([]);
    } catch (err) {
      toast.error("批量刪除失敗");
      console.error("批量刪除錯誤", err);
    }
  };

  const handleBulkStatusChange = async (newStatus: Task["status"]) => {
    if (!token || selectedIds.length === 0) return;
    
    try {
      await Promise.all(
        selectedIds.map((id) => updateTask(token, id, { status: newStatus }))
      );
      setTasks((prev) =>
        prev.map((task) =>
          selectedIds.includes(task._id) ? { ...task, status: newStatus } : task
        )
      );
      toast.success("批量修改狀態成功");
    } catch (err) {
      toast.error("批量修改狀態失敗");
      console.error("批量狀態錯誤", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="max-w-2xl mx-auto p-6">
        <TaskHeader onLogout={handleLogout} />
        
        <TaskFilters
          searchText={searchText}
          statusFilter={statusFilter}
          onSearchChange={setSearchText}
          onStatusFilterChange={setStatusFilter}
        />

        <TaskForm
          title={newTitle}
          description={newDescription}
          isAdding={isAdding}
          onTitleChange={setNewTitle}
          onDescriptionChange={setNewDescription}
          onSubmit={handleAddTask}
        />

        <TaskSelectionControls
          isSelectMode={isSelectMode}
          selectedCount={selectedIds.length}
          totalCount={filteredTasks.length}
          onToggleSelectMode={handleToggleSelectMode}
          onSelectAll={handleSelectAll}
          onClearSelection={handleClearSelection}
          onBulkDelete={handleBulkDelete}
          onBulkStatusChange={handleBulkStatusChange}
        />

        <TaskList
          tasks={filteredTasks}
          isSelectMode={isSelectMode}
          selectedIds={selectedIds}
          changingId={changingId}
          deletingId={deletingId}
          isFetching={isFetching}
          onTaskClick={setSelectedTask}
          onTaskSelect={handleTaskSelect}
          onStatusChange={handleChangeStatus}
          onDelete={handleDelete}
        />

        <TaskModal
          task={selectedTask}
          isEditing={isEditing}
          onClose={() => {
            setSelectedTask(null);
            setIsEditing(false);
          }}
          onEdit={() => setIsEditing(true)}
          onSave={handleSaveEdit}
          onCancel={() => setIsEditing(false)}
          onStatusChange={handleChangeStatus}
        />
      </div>
    </div>
  );
};