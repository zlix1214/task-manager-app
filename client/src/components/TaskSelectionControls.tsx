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
        className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 mb-4 transition-colors"
      >
        選取任務
      </button>
    );
  }

  return (
    <div className="mb-4">
      <div className="flex gap-2 mb-2">
        <button
          onClick={onToggleSelectMode}
          className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
        >
          取消選取
        </button>
        <button
          onClick={onSelectAll}
          className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
        >
          全選
        </button>
        {selectedCount > 0 && (
          <button
            onClick={onClearSelection}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
          >
            清除選取
          </button>
        )}
      </div>

      {selectedCount > 0 && (
        <div className="bg-yellow-100 p-3 rounded flex items-center justify-between text-sm">
          <span className="text-gray-800">
            已選取 {selectedCount} 個任務
          </span>
          <div className="flex gap-2">
            <button
              onClick={onBulkDelete}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
            >
              批量刪除
            </button>
            <select
              onChange={(e) => {
                const value = e.target.value;
                if (value) {
                  onBulkStatusChange(value as Task['status']);
                  e.target.value = ''; // 重置選擇
                }
              }}
              defaultValue=""
              className="border p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                更改狀態...
              </option>
              <option value="pending">待處理</option>
              <option value="in-progress">進行中</option>
              <option value="completed">已完成</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};