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
        <div className="max-w-3xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center text-dracula-foreground">Task List</h2>

            {/* Filter Dropdown */}
            <div className="mb-4 text-center">
                <label className="mr-2 font-medium text-dracula-foreground">Filter:</label>
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
                    className="p-2 bg-dracula-foreground rounded-md w-64"
                />
            </div>

            {/* Task List with Scrollable Container */}
            <div className="bg-dracula-current-line shadow-md rounded-lg overflow-hidden w-full max-w-2xl mx-auto">
                <ul className="h-[500px] overflow-y-auto">
                    {filteredTasks.length === 0 ? (
                        <li className="p-4 text-center text-dracula-foreground">No tasks available</li>
                    ) : (
                        filteredTasks.map((task) => (
                            <li
                                key={task.id}
                                className="border-b p-4 flex justify-between items-center space-x-4"
                            >
                                {/* Task Info on the Left */}
                                <div className="w-3/4">
                                    <h3 className="font-semibold text-dracula-foreground break-words whitespace-normal">
                                        {task.title}
                                    </h3>
                                    <p className="text-sm text-dracula-foreground break-words whitespace-normal">
                                        {task.description}
                                    </p>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded 
                                    ${task.status === "TODO" ? "outline-2 outline-dracula-red text-dracula-foreground" :
                                        task.status === "IN_PROGRESS" ? "outline-2 outline-dracula-yellow text-dracula-foreground" :
                                            "outline-2 outline-dracula-green text-dracula-foreground"}`}>
                                    {task.status}
                                </span>
                                </div>

                                {/* Buttons on the Right (Now in a Row) */}
                                <div className="space-x-2 flex flex-row items-center">
                                    <button
                                        className="px-3 py-1 text-dracula-foreground font-bold outline-2 outline-dracula-purple hover:bg-dracula-foreground hover:outline-dracula-foreground hover:text-dracula-background transition rounded"
                                        onClick={() => onEdit(task)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-3 py-1 text-white font-bold bg-dracula-red hover:bg-dracula-foreground hover:text-dracula-background rounded transition"
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
        </div>
    );

}
