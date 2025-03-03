import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authService.js";

export default function Signup({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const token = await signup(username, password);
        if (token) {
            localStorage.setItem("token", token);
            setToken(token);
            navigate("/tasks");
        } else {
            setError("Signup failed. Try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-dracula-background">
            <div className="p-6 bg-dracula-current-line shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-dracula-foreground mb-4 text-center">Sign Up</h2>
                {error && <p className="text-dracula-red text-center">{error}</p>}
                <form onSubmit={handleSignup} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 rounded-md bg-dracula-foreground"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 rounded-md bg-dracula-foreground"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="w-full p-2 bg-dracula-green font-bold text-white rounded-md">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}