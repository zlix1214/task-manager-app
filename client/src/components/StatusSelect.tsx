import React from 'react';
import type { Task } from '../types/Task';

interface StatusSelectProps {
  value: Task['status'];
  onChange: (status: Task['status']) => void;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

export const StatusSelect: React.FC<StatusSelectProps> = ({
  value,
  onChange,
  className = "bg-white/80 backdrop-blur-sm border border-gray-200/50 px-3 py-2 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50",
  onClick,
  disabled = false
}) => {
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending': return 'text-amber-600';
      case 'in-progress': return 'text-blue-600';
      case 'completed': return 'text-emerald-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Task['status'])}
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${getStatusColor(value)} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <option value="pending" className="text-amber-600">待處理</option>
      <option value="in-progress" className="text-blue-600">進行中</option>
      <option value="completed" className="text-emerald-600">已完成</option>
    </select>
  );
};