import React from 'react';

interface TaskFiltersProps {
  searchText: string;
  statusFilter: string;
  onSearchChange: (text: string) => void;
  onStatusFilterChange: (status: string) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  searchText,
  statusFilter,
  onSearchChange,
  onStatusFilterChange
}) => {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="搜尋任務標題"
        className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">全部</option>
        <option value="pending">待處理</option>
        <option value="in-progress">進行中</option>
        <option value="completed">已完成</option>
      </select>
    </div>
  );
};