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
    <form onSubmit={onSubmit} className="flex gap-2 mb-4">
      <div className="flex flex-col gap-1 w-full">
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="輸入任務名稱"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isAdding}
        />
        <textarea
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="輸入任務描述"
          disabled={isAdding}
        />
      </div>
      <button
        type="submit"
        disabled={isAdding || !title.trim()}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isAdding ? "新增中..." : "新增"}
      </button>
    </form>
  );
};