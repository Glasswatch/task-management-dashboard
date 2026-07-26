"use client";

import { Task, TaskStatus } from "@/types/task";

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: (id: string, status: TaskStatus) => Promise<void> | void;
}

export default function TaskList({ tasks, onTaskUpdated }: TaskListProps) {
  async function updateTaskStatus(id: string, status: TaskStatus) {
    await onTaskUpdated(id, status);
  }

  const getStatusBadgeStyle = (status: TaskStatus) => {
    switch (status) {
      case "done":
        return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:border-emerald-500/50";
      case "in_progress":
        return "border-blue-500/30 bg-blue-500/10 text-blue-400 hover:border-blue-500/50";
      default:
        return "border-amber-500/30 bg-amber-500/10 text-amber-400 hover:border-amber-500/50";
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-900/30 py-12 text-center">
        <p className="text-base font-medium text-slate-300">No tasks found</p>
        <p className="mt-1 text-sm text-slate-500">
          Add your first task above to start tracking your work.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="group flex flex-col justify-between gap-4 rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-sm transition-all hover:border-slate-700 hover:bg-slate-900/90 sm:flex-row sm:items-start"
        >
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-slate-100 group-hover:text-white">
              {task.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              {task.description || "No description provided."}
            </p>
          </div>

          <div className="shrink-0">
            <select
              value={task.status}
              onChange={(e) =>
                updateTaskStatus(task.id, e.target.value as TaskStatus)
              }
              className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-semibold outline-none transition-all ${getStatusBadgeStyle(
                task.status,
              )}`}
            >
              <option value="todo" className="bg-slate-900 text-slate-200">
                Todo
              </option>
              <option
                value="in_progress"
                className="bg-slate-900 text-slate-200"
              >
                In Progress
              </option>
              <option value="done" className="bg-slate-900 text-slate-200">
                Done
              </option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
