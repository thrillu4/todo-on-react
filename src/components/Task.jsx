import React from "react";
import { useDrag } from "react-dnd";
import toast from "react-hot-toast";

export default function Task({ tasks, setTasks, task }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const handleRemove = (id) => {
    const filterTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(filterTasks));
    setTasks(filterTasks);
    toast("Task Removed", { icon: "🦁" });
  };

  return (
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-md rounded-md cursor-grabbing ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      <p>{task.name}</p>
      <button
        className="absolute bottom-3 right-1 text-slate-400"
        onClick={() => {
          handleRemove(task.id);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
}
