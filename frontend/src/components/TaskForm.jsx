import { useState, useEffect } from "react";
import { createTask, updateTask } from "../services/taskService.js";

export default function TaskForm({ editingTask, onSave, onCancel }) {
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "TODO",
    });

    useEffect(() => {
        if (editingTask) {
            setTask(editingTask);
        } else {
            setTask({ title: "", description: "", status: "TODO"});
        }
    }, [editingTask]);

    const handleChange = async (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingTask) {
            await updateTask(editingTask.id, task);
        } else {
            await createTask(task);
        }
        onSave();
    }

    return (
        <div className="max-w-lg mx-auto mt-6 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
                {editingTask ? "Edit Task" : "Create Task"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Status</label>
                    <select
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
                    >
                        <option value="TODO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                    </select>
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        {editingTask ? "Update Task" : "Create Task"}
                    </button>
                    {editingTask && (
                        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}