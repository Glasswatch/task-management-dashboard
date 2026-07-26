"use client";

import { type FormEvent } from "react";

interface TaskFormProps {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function TaskForm({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
}: TaskFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-8 rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur-sm transition-all focus-within:border-slate-700"
    >
      <h2 className="mb-4 text-xl font-semibold text-slate-100">
        Create New Task
      </h2>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <textarea
            placeholder="Description (optional)"
            rows={3}
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="w-full resize-none rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 active:scale-[0.98] disabled:opacity-50"
          >
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}
