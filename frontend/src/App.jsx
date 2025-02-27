import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {useEffect, useState} from "react";
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";


export default function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [editingTask, setEditingTask] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleSave = () => {
        setEditingTask(null);
        setRefresh(!refresh);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Task Manager
                </h1>
                {token && (
                    <button
                        onClick={handleLogout}
                        className="absolute top-4 right-4 px-3 py-2 bg-red-500 text-white rounded"
                    >
                        Logout
                    </button>
                )}
                <Routes>
                    <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/signup" element={<Signup setToken={setToken} />} />
                    <Route
                        path="/tasks"
                        element={
                            token ? (
                                <>
                                    <TaskForm
                                        editingTask={editingTask}
                                        onSave={handleSave}
                                        onCancel={() => setEditingTask(null)}
                                    />
                                    <TaskList key={refresh} onEdit={setEditingTask} />
                                </>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route path="*" element={<Navigate to={token ? "/tasks" : "/login"} />} />
                </Routes>
            </div>
        </Router>
    );
}