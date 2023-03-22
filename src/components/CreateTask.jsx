import { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export default function CreateTask({ tasks, setTasks }) {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.name.length < 3)
      return toast.error("A task must have more than 3 characters");
    if (task.name.length > 100)
      return toast.error("A task must not be more than 100 characters");
    setTasks((prev) => {
      const newList = [...prev, task];
      localStorage.setItem("tasks", JSON.stringify(newList));
      return newList;
    });

    toast.success("Task Created");

    setTask({
      id: "",
      name: "",
      status: "todo",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 px-2"
        value={task.name}
        onChange={(e) =>
          setTask({ ...task, id: uuidv4(), name: e.target.value })
        }
      />
      <button className="bg-slate-500 rounded-md px-4 h-12 text-white">
        Create
      </button>
    </form>
  );
}
