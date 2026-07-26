"use client";

import { type FormEvent, useCallback, useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { supabase } from "@/lib/supabase";
import { Task, TaskStatus } from "@/types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = useCallback(async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setTasks(data ?? []);
  }, []);

  const addTask = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
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
    },
    [description, fetchTasks, title],
  );

  const updateTaskStatus = useCallback(
    async (id: string, status: TaskStatus) => {
      const { error } = await supabase
        .from("tasks")
        .update({ status })
        .eq("id", id);

      if (error) {
        console.error(error);
        return;
      }

      await fetchTasks();
    },
    [fetchTasks],
  );

  useEffect(() => {
    void fetchTasks();
  }, [fetchTasks]);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 flex items-center justify-between border-b border-slate-800/80 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Task Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Manage and track your active progress
            </p>
          </div>
          <div className="rounded-full border border-slate-800 bg-slate-900 px-3.5 py-1 text-xs font-semibold text-slate-400">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </div>
        </header>

        <TaskForm
          title={title}
          description={description}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onSubmit={addTask}
        />

        <TaskList tasks={tasks} onTaskUpdated={updateTaskStatus} />
      </div>
    </main>
  );
}
