import React from 'react';
import type { Task } from '../types/Task';

interface TaskSelectionControlsProps {
  isSelectMode: boolean;
  selectedCount: number;
  totalCount: number;
  onToggleSelectMode: () => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onBulkDelete: () => void;
  onBulkStatusChange: (status: Task['status']) => void;
}

export const TaskSelectionControls: React.FC<TaskSelectionControlsProps> = ({
  isSelectMode,
  selectedCount,
  onToggleSelectMode,
  onSelectAll,
  onClearSelection,
  onBulkDelete,
  onBulkStatusChange
}) => {
  if (!isSelectMode) {
    return (
      <button
        onClick={onToggleSelectMode}
        className="group flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2.5 font-medium mb-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 border border-gray-200/50"
      >
        <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>選取任務</span>
      </button>
    );
  }

  return (
    <div className="mb-6 space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onToggleSelectMode}
          className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 text-sm font-medium transition-all duration-200 hover:shadow-md border border-gray-200/50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>取消選取</span>
        </button>
        <button
          onClick={onSelectAll}
          className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 text-sm font-medium transition-all duration-200 hover:shadow-md border border-blue-200/50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>全選</span>
        </button>
        {selectedCount > 0 && (
          <button
            onClick={onClearSelection}
            className="flex items-center space-x-2 bg-amber-50 hover:bg-amber-100 text-amber-700 px-3 py-2 text-sm font-medium transition-all duration-200 hover:shadow-md border border-amber-200/50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>清除選取</span>
          </button>
        )}
      </div>

      {selectedCount > 0 && (
        <div className="bg-gradient-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm p-4 border border-amber-200/50 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-500 animate-pulse"></div>
              <span className="text-amber-800 font-medium text-sm">
                已選取 {selectedCount} 個任務
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onBulkDelete}
                className="group flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 text-sm font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>刪除</span>
              </button>
              <div className="relative">
                <select
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      onBulkStatusChange(value as Task['status']);
                      e.target.value = '';
                    }
                  }}
                  defaultValue=""
                  className="appearance-none bg-white/80 backdrop-blur-sm border border-gray-200/50 px-3 py-2 pr-8  text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-200 cursor-pointer hover:shadow-md"
                >
                  <option value="" disabled>更改狀態...</option>
                  <option value="pending">🟡 待處理</option>
                  <option value="in-progress">🔵 進行中</option>
                  <option value="completed">🟢 已完成</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};