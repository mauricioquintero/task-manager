import { useState } from "react";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";

export default function App() {
    const [editingTask, setEditingTask] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleSave = () => {
        setEditingTask(null);
        setRefresh(!refresh);
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                Task Manager
            </h1>
            <TaskForm editingTask={editingTask} onSave={handleSave} onCancel={() => setEditingTask(null)} />
            <TaskList key={refresh} onEdit={setEditingTask} />
        </div>
    );
}