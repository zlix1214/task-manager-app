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
  const getStatusStyle = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return ' border-amber-200 hover:bg-amber-50/80';
      case 'in-progress':
        return ' border-blue-200 hover:bg-blue-50/80';
      case 'completed':
        return ' border-emerald-200 hover:bg-emerald-50/80';
      default:
        return 'bg-gray-50 border-gray-200 hover:bg-gray-50/80';
    }
  };

  return (
    <ul
      onClick={onTaskClick}
      className={`group p-4 backdrop-blur-sm border-b shadow cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 ${
        getStatusStyle(task.status)
      } ${
        isSelected ? 'ring-2 ring-blue-500/20 border-blue-300/50 shadow-md transform -translate-y-0.5' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {isSelectMode && (
          <div className="flex items-center mt-0.5">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(e.target.checked)}
              onClick={(e) => e.stopPropagation()}
              className="w-4 h-4 text-blue-600 bg-white/80 border-gray-300 focus:ring-blue-500/20 focus:ring-2 transition-all duration-200"
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors duration-200">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-600 line-clamp-2 group-hover:text-gray-500 transition-colors duration-200">
              {task.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-3 flex-shrink-0">
          {isChanging ? (
            <div className="flex items-center space-x-2 text-blue-600 text-sm">
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>更新中...</span>
            </div>
          ) : (
            <StatusSelect
              value={task.status}
              onChange={onStatusChange}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/80 backdrop-blur-sm border border-gray-200/50 px-3 py-1.5 text-xs font-medium shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50"
            />
          )}
          
          {isDeleting ? (
            <div className="flex items-center space-x-2 text-red-500 text-sm">
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>刪除中...</span>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="group/delete flex items-center justify-center w-8 h-8 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 hover:shadow-md"
            >
              <svg className="w-4 h-4 group-hover/delete:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </ul>
  );
};