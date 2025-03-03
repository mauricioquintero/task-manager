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
        <div className="max-w-lg mx-auto mt-6 p-6 bg-dracula-current-line shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-dracula-foreground mb-4">
                {editingTask ? "Edit Task" : "Create Task"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm text-dracula-foreground font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 rounded-md bg-dracula-foreground"
                    />
                </div>
                <div>
                    <label className="block text-sm text-dracula-foreground font-medium">Description</label>
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md bg-dracula-foreground"
                    />
                </div>
                <div>
                    <label className="block text-sm text-dracula-foreground font-medium">Status</label>
                    <select
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md bg-dracula-foreground"
                    >
                        <option value="TODO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                    </select>
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="px-4 py-2  bg-dracula-purple text-dracula-foreground font-bold
                    rounded hover:bg-dracula-foreground hover:text-dracula-background transition">
                        {editingTask ? "Update Task" : "Create Task"}
                    </button>
                    {editingTask && (
                        <button type="button" onClick={onCancel} className="px-4 py-2 bg-dracula-comment
                        text-dracula-foreground font-bold rounded hover:bg-dracula-foreground
                        hover:text-dracula-background transition">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}