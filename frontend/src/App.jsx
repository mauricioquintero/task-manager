import { useState } from "react";
import TaskList from "./components/TaskList.jsx";

export default function App() {
    const [editingTask, setEditingTask] = useState(null);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                Task Manager
            </h1>
            <TaskList onEdit={setEditingTask} />
        </div>
    );
}