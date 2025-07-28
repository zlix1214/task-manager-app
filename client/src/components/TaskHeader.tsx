import React from 'react';

interface TaskHeaderProps {
  onLogout: () => void;
}

export const TaskHeader: React.FC<TaskHeaderProps> = ({ onLogout }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center space-x-3">
        <div className="w-2 h-8 "></div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          TaskFlow 任務管理工具
        </h1>
      </div>
      <button
        onClick={onLogout}
        className="group flex items-center space-x-2 text-white bg-black cursor-pointer hover:bg-white hover:text-black px-4 py-2.5 font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
      >
        <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>登出</span>
      </button>
    </div>
  );
};