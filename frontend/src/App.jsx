import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import LandingPage from "./components/LandingPage.jsx";

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
            <div className="w-full min-h-screen bg-dracula-background">
                {/* Navigation Bar */}
                <nav className="w-full bg-dracula-current-line text-dracula-foreground p-4 flex justify-between
                items-center shadow-md">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold text-dracula-purple hover:text-dracula-foreground
                    transition">
                        Task Manager
                    </Link>

                    {/* Navigation Links */}
                    <div className="space-x-4">
                        {token ? (
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-dracula-red font-bold text-white rounded-md shadow
                                hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/signup" className="px-4 py-2 bg-dracula-purple font-bold
                                text-dracula-foreground rounded-md shadow hover:bg-dracula-foreground
                                hover:text-dracula-background transition">
                                    Sign Up
                                </Link>
                                <Link to="/login" className="px-4 py-2 outline-2 outline-dracula-purple font-bold
                                text-dracula-foreground rounded-md shadow hover:outline-dracula-foreground
                                hover:bg-dracula-foreground hover:text-dracula-background transition">
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Page Content (Ensuring Full Width) */}
                <div className="w-full">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login setToken={setToken} />} />
                        <Route path="/signup" element={<Signup setToken={setToken} />} />
                        <Route
                            path="/tasks"
                            element={
                                token ? (
                                    <div className="w-full flex justify-center items-start p-6">
                                        {/* Container for Centering */}
                                        <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6">
                                            {/* Task Form on Left */}
                                            <div className="w-full lg:w-1/3 p-4 rounded-lg content-center">
                                                <TaskForm
                                                    editingTask={editingTask}
                                                    onSave={handleSave}
                                                    onCancel={() => setEditingTask(null)}
                                                />
                                            </div>

                                            {/* Task List on Right */}
                                            <div className="w-full lg:w-2/3 bg-dracula-background p-4 rounded-lg">
                                                <TaskList key={refresh} onEdit={setEditingTask} />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />

                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
