import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export const getTasks = async () => {
    try {
        const response = await axios.get(API_URL, {headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
};

export const createTask = async (taskData) => {
    try {
        const token = localStorage.getItem("token"); // Retrieve token from storage
        if (!token) {
            throw new Error("No token found. Please log in.");
        }

        const response = await axios.post(API_URL, taskData, {
            headers: {
                Authorization: `Bearer ${token}`, // Attach JWT token
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};

export const updateTask = async (id, updatedTask) => {
    try {
        const response = await axios.put(`${API_URL}/tasks/${id}`, updatedTask, {
            headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
    }
};

export const deleteTask = async (id) => {
    try {
        await axios.delete(`${API_URL}/tasks/${id}`, {
            headers: getAuthHeaders()
        });
    } catch (error) {
        console.error("Error deleting task:", error)
    }
};

