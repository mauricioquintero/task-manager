import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../services/taskService";

export default function TaskList({ onEdit }) {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        fetchTasks(); // Refresh list after deletion
    };

    const filteredTasks = tasks.filter((task) =>
        (filter === "ALL" || task.status === filter) &&
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Task List</h2>

            {/* Filter Dropdown */}
            <div className="mb-4 text-center">
                <label className="mr-2 font-medium">Filter:</label>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 border rounded-md bg-white"
                >
                    <option value="ALL">All</option>
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                </select>
            </div>

            {/* Search Input */}
            <div className="mb-4 text-center">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded-md w-64"
                />
            </div>

            {/* Task List */}
            <ul className="bg-white shadow-md rounded-lg overflow-hidden">
                {filteredTasks.length === 0 ? (
                    <li className="p-4 text-center text-gray-500">No tasks available</li>
                ) : (
                    filteredTasks.map((task) => (
                        <li key={task.id} className="border-b p-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{task.title}</h3>
                                <p className="text-sm text-gray-500">{task.description}</p>
                                <span className={`px-2 py-1 text-xs font-semibold rounded 
                  ${task.status === "TODO" ? "bg-red-200 text-red-800" :
                                    task.status === "IN_PROGRESS" ? "bg-yellow-200 text-yellow-800" :
                                        "bg-green-200 text-green-800"}`}>
                  {task.status}
                </span>
                            </div>
                            <div className="space-x-2">
                                <button
                                    className="px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded"
                                    onClick={() => onEdit(task)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded"
                                    onClick={() => handleDelete(task.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
