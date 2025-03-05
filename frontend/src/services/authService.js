import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        return response.data.token;
    } catch (error) {
        console.error("Login failed:", error);
        return null;
    }
};

export const signup = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, { username, password });
        return response.data.token;
    } catch (error) {
        console.error("Signup failed:", error);
        return null;
    }
};

export const logout = () => {
    localStorage.removeItem("token");
};