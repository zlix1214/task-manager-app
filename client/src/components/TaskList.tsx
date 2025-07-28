import React from 'react';
import type { Task } from '../types/Task';
import { TaskItem } from './TaskItem';
import Spinner from './Spinner';

interface TaskListProps {
  tasks: Task[];
  isSelectMode: boolean;
  selectedIds: string[];
  changingId: string | null;
  deletingId: string | null;
  isFetching: boolean;
  onTaskClick: (task: Task) => void;
  onTaskSelect: (taskId: string, selected: boolean) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
  onDelete: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isSelectMode,
  selectedIds,
  changingId,
  deletingId,
  isFetching,
  onTaskClick,
  onTaskSelect,
  onStatusChange,
  onDelete
}) => {
  if (isFetching) {
    return <Spinner />;
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>沒有找到任務</p>
      </div>
    );
  }

  return (
    <ul className="space-y-0">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          isSelectMode={isSelectMode}
          isSelected={selectedIds.includes(task._id)}
          isChanging={changingId === task._id}
          isDeleting={deletingId === task._id}
          onTaskClick={() => onTaskClick(task)}
          onSelect={(selected) => onTaskSelect(task._id, selected)}
          onStatusChange={(status) => onStatusChange(task._id, status)}
          onDelete={() => onDelete(task._id)}
        />
      ))}
    </ul>
  );
};