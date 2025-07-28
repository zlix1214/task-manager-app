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

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending': return 'from-amber-50 to-orange-50 border-amber-200/50';
      case 'in-progress': return 'from-blue-50 to-indigo-50 border-blue-200/50';
      case 'completed': return 'from-emerald-50 to-green-50 border-emerald-200/50';
      default: return 'from-gray-50 to-slate-50 border-gray-200/50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className={`bg-gradient-to-br ${getStatusColor(task.status)} backdrop-blur-sm p-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto border shadow-2xl transform animate-in fade-in-0 zoom-in-95 duration-200`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white/50  transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="pr-12 mb-6">
          {isEditing ? (
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask(prev =>
                  prev ? { ...prev, title: e.target.value } : prev
                )
              }
              className="w-full text-2xl font-bold bg-white/80 backdrop-blur-sm border border-gray-200/50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-200 shadow-sm hover:shadow-md"
              placeholder="任務標題"
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h2>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">任務描述</label>
          {isEditing ? (
            <textarea
              rows={4}
              value={editedTask.description || ''}
              onChange={(e) =>
                setEditedTask(prev =>
                  prev ? { ...prev, description: e.target.value } : prev
                )
              }
              className="w-full bg-white/80 backdrop-blur-sm border border-gray-200/50  px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-200 shadow-sm hover:shadow-md resize-none"
              placeholder="描述這個任務的詳細內容..."
            />
          ) : (
            <div className="bg-white/60 backdrop-blur-sm  p-4 border border-gray-200/30">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {task.description || '沒有描述'}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-semibold text-gray-700 mb-2">狀態</label>
            <StatusSelect
              value={editedTask.status}
              onChange={handleStatusChange}
              className="bg-white/80 backdrop-blur-sm border border-gray-200/50 px-4 py-2.5  font-medium shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50"
            />
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            {isEditing ? (
              <>
                <button
                  onClick={onCancel}
                  className="flex-1 sm:flex-none px-4 py-2.5 text-gray-600 hover:text-gray-800 font-medium transition-all duration-200 hover:bg-white/50"
                >
                  取消
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  儲存
                </button>
              </>
            ) : (
              <button
                onClick={onEdit}
                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 px-6 py-2.5  font-medium transition-all duration-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 border border-gray-200/50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>編輯</span>
              </button>
            )}
          </div>
        </div>
        
        {task.createdAt && (
          <div className="mt-6 pt-6 border-t border-gray-200/50 flex items-center space-x-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>建立於 {new Date(task.createdAt).toLocaleString('zh-TW', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</span>
          </div>
        )}
      </div>
    </div>
  );
};