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
    <div className="flex gap-3 mb-6">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="搜尋任務..."
          className="w-full pl-11 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50  text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-200 shadow-sm hover:shadow-md"
        />
      </div>
      <div className="relative">
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="appearance-none bg-white/80 backdrop-blur-sm border border-gray-200/50 px-4 py-3 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
        >
          <option value="all">全部</option>
          <option value="pending">待處理</option>
          <option value="in-progress">進行中</option>
          <option value="completed">已完成</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};