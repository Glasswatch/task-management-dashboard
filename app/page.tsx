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

  return (
    // Changed page background
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="mx-auto max-w-3xl">
        {/* Changed title color */}
        <h1 className="mb-6 text-4xl font-bold text-white">Task Dashboard</h1>

        {/* Add Task Form */}
        <form
          onSubmit={addTask}
          className="mb-8 rounded-lg bg-slate-800 p-6 shadow-md border border-slate-700"
        >
          <h2 className="mb-4 text-2xl font-semibold text-slate-100">
            Add Task
          </h2>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 w-full rounded border border-slate-700 bg-slate-900 p-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4 w-full rounded border border-slate-700 bg-slate-900 p-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Add Task
          </button>
        </form>

        {tasks.length === 0 ? (
          // Added text color for empty state
          <p className="text-slate-400">No tasks yet.</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              // Changed card background and added a subtle border
              <div
                key={task.id}
                className="rounded-lg bg-slate-800 p-4 shadow-md border border-slate-700"
              >
                {/* Changed task title color */}
                <h2 className="text-xl font-semibold text-slate-100">
                  {task.title}
                </h2>

                {/* Changed description color */}
                <p className="mt-1 text-slate-400">
                  {task.description || "No Description"}
                </p>

                {/* Updated badge background and text color */}
                {/* Updated status dropdown to match dark theme */}
                <select
                  value={task.status}
                  onChange={(e) =>
                    updateTaskStatus(task.id, e.target.value as TaskStatus)
                  }
                  className="mt-3 cursor-pointer rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm font-medium text-slate-200 outline-none transition-colors hover:border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
