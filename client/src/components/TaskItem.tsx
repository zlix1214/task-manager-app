import React from 'react';
import type { Task } from '../types/Task';
import { StatusSelect } from './StatusSelect';

interface TaskItemProps {
  task: Task;
  isSelectMode: boolean;
  isSelected: boolean;
  isChanging: boolean;
  isDeleting: boolean;
  onTaskClick: () => void;
  onSelect: (selected: boolean) => void;
  onStatusChange: (status: Task['status']) => void;
  onDelete: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isSelectMode,
  isSelected,
  isChanging,
  isDeleting,
  onTaskClick,
  onSelect,
  onStatusChange,
  onDelete
}) => {
  return (
    <li
      onClick={onTaskClick}
      className="flex flex-col border-b py-2 cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center justify-between">
        {isSelectMode && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(e.target.checked)}
            onClick={(e) => e.stopPropagation()}
            className="mr-2"
          />
        )}
        <span className="mr-auto font-medium">{task.title}</span>
        
        {isChanging ? (
          <span className="text-blue-500 text-sm mr-4">更新中...</span>
        ) : (
          <StatusSelect
            value={task.status}
            onChange={onStatusChange}
            onClick={(e) => e.stopPropagation()}
            className="border p-1 rounded text-sm mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        
        {isDeleting ? (
          <span className="text-red-400 text-sm">刪除中...</span>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-sm text-red-500 hover:text-red-700 hover:underline transition-colors"
          >
            刪除
          </button>
        )}
      </div>
      
      {task.description && (
        <div className={isSelectMode ? "ml-6" : ""}>
          <p className="text-sm text-gray-500 mt-1">
            {task.description}
          </p>
        </div>
      )}
    </li>
  );
};