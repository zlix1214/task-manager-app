import React from 'react';

interface TaskFormProps {
  title: string;
  description: string;
  isAdding: boolean;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  title,
  description,
  isAdding,
  onTitleChange,
  onDescriptionChange,
  onSubmit
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 backdrop-blur-sm p-6 mb-6 border border-blue-100/50 shadow-sm">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="輸入任務名稱..."
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-200 shadow-sm hover:shadow-md"
            disabled={isAdding}
          />
          <textarea
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-200 shadow-sm hover:shadow-md resize-none"
            rows={3}
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="任務描述（選填）..."
            disabled={isAdding}
          />
        </div>
        <button
          type="submit"
          disabled={isAdding || !title.trim()}
          className="group w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-black cursor-pointer hover:bg-black text-white px-6 py-3 font-medium disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
        >
          <svg className={`w-4 h-4 transition-transform duration-200 ${isAdding ? 'animate-spin' : 'group-hover:rotate-12'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>{isAdding ? "新增中..." : "新增任務"}</span>
        </button>
      </form>
    </div>
  );
};