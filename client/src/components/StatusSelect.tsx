import React from 'react';
import type {Task} from '../types/Task'

interface StatusSelectProps {
    value: Task['status'];
    onChange?: (status: Task['status']) => void;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
    disabled?: boolean;
}

export const StatusSelect: React.FC<StatusSelectProps> = ({
  value,
  onChange,
  className = "border p-1 rounded text-sm",
  onClick,
  disabled = false
}) => {
  return (
    <select
      value={value}
      onChange={(e) =>  onChange && onChange(e.target.value as Task['status'])}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      <option value="pending">待處理</option>
      <option value="in-progress">進行中</option>
      <option value="completed">已完成</option>
    </select>
  );
};