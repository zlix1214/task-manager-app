import React from 'react';
import type { Task } from '../types/Task';
import { TaskItem } from './TaskItem';
import Spinner from './Spinner';

interface TaskListProps {
  tasks: Task[];
  isSelectMode: boolean;
  selectedIds: string[];
  changingId: string | null;
  deletingId: string | null;
  isFetching: boolean;
  onTaskClick: (task: Task) => void;
  onTaskSelect: (taskId: string, selected: boolean) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
  onDelete: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isSelectMode,
  selectedIds,
  changingId,
  deletingId,
  isFetching,
  onTaskClick,
  onTaskSelect,
  onStatusChange,
  onDelete
}) => {
  if (isFetching) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-indigo-400 animate-spin animate-reverse"></div>
          </div>
          <Spinner/>
          <p className="text-gray-500 text-sm font-medium">載入任務中...</p>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div className="space-y-2">
            <p className="text-gray-500 font-medium">還沒有任務</p>
            <p className="text-gray-400 text-sm">開始建立你的第一個任務吧！</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-64 overflow-y-auto">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          isSelectMode={isSelectMode}
          isSelected={selectedIds.includes(task._id)}
          isChanging={changingId === task._id}
          isDeleting={deletingId === task._id}
          onTaskClick={() => onTaskClick(task)}
          onSelect={(selected) => onTaskSelect(task._id, selected)}
          onStatusChange={(status) => onStatusChange(task._id, status)}
          onDelete={() => onDelete(task._id)}
        />
      ))}
    </div>
  );
};