import React from 'react';

interface TaskHeaderProps {
  onLogout: () => void;
}

export const TaskHeader: React.FC<TaskHeaderProps> = ({ onLogout }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">任務列表</h1>
      <button
        onClick={onLogout}
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
      >
        登出
      </button>
    </div>
  );
};