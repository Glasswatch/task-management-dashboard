"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Task, TaskStatus } from "@/types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function fetchTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setTasks(data);
  }

  async function addTask(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    const { error } = await supabase.from("tasks").insert({
      title,
      description,
      status: "todo",
    });

    if (error) {
      console.error(error);
      return;
    }

    setTitle("");
    setDescription("");

    await fetchTasks();
  }

  async function updateTaskStatus(id: string, status: TaskStatus) {
    const { error } = await supabase
      .from("tasks")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
  }, []);

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

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Page Header */}
        <header className="mb-8 flex items-center justify-between border-b border-slate-800/80 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Task Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Manage and track your active progress
            </p>
          </div>
          <div className="rounded-full bg-slate-900 px-3.5 py-1 text-xs font-semibold text-slate-400 border border-slate-800">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </div>
        </header>

        {/* Add Task Form */}
        <form
          onSubmit={addTask}
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
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <textarea
                placeholder="Description (optional)"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950/80 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
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

        {/* Task List */}
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-900/30 py-12 text-center">
            <p className="text-base font-medium text-slate-300">
              No tasks found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Add your first task above to start tracking your work.
            </p>
          </div>
        ) : (
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
                    <option
                      value="todo"
                      className="bg-slate-900 text-slate-200"
                    >
                      Todo
                    </option>
                    <option
                      value="in_progress"
                      className="bg-slate-900 text-slate-200"
                    >
                      In Progress
                    </option>
                    <option
                      value="done"
                      className="bg-slate-900 text-slate-200"
                    >
                      Done
                    </option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
