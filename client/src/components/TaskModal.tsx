import React, { useState, useEffect } from 'react';
import type { Task } from '../types/Task';
import { StatusSelect } from './StatusSelect';

interface TaskModalProps {
  task: Task | null;
  isEditing: boolean;
  onClose: () => void;
  onEdit: () => void;
  onSave: (updatedTask: Task) => void;
  onCancel: () => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  task,
  isEditing,
  onClose,
  onEdit,
  onSave,
  onCancel,
  onStatusChange
}) => {
  const [editedTask, setEditedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
    }
  }, [task]);

  if (!task || !editedTask) {
    return null;
  }

  const handleSave = () => {
    if (editedTask) {
      onSave(editedTask);
    }
  };

  const handleStatusChange = (status: Task['status']) => {
    onStatusChange(task._id, status);
    setEditedTask(prev => prev ? { ...prev, status } : null);
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.76)] flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          ✕
        </button>
        
        <div className="pr-8">
          {isEditing ? (
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask(prev =>
                  prev ? { ...prev, title: e.target.value } : prev
                )
              }
              className="border p-2 rounded w-full text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="任務標題"
            />
          ) : (
            <h2 className="text-xl font-bold mb-4">{task.title}</h2>
          )}
        </div>

        <div className="mb-4">
          {isEditing ? (
            <textarea
              rows={4}
              value={editedTask.description || ''}
              onChange={(e) =>
                setEditedTask(prev =>
                  prev ? { ...prev, description: e.target.value } : prev
                )
              }
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="任務描述"
            />
          ) : (
            <p className="text-gray-700 whitespace-pre-wrap">
              {task.description || '無描述'}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              狀態
            </label>
            <StatusSelect
              value={editedTask.status}
              onChange={handleStatusChange}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={onCancel}
                  className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors"
                >
                  儲存
                </button>
              </>
            ) : (
              <button
                onClick={onEdit}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
              >
                編輯
              </button>
            )}
          </div>
        </div>
        
        {task.createdAt && (
          <div className="mt-4 pt-4 border-t text-sm text-gray-500">
            建立時間: {new Date(task.createdAt).toLocaleString('zh-TW')}
          </div>
        )}
      </div>
    </div>
  );
};