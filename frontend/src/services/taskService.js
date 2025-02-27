import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

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

export const createTask = async (task) => {
    try {
        const response = await axios.post(API_URL, task, {
            headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
    }
};

export const updateTask = async (id, updatedTask) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedTask, {
            headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
    }
};

export const deleteTask = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`, {
            headers: getAuthHeaders()
        });
    } catch (error) {
        console.error("Error deleting task:", error)
    }
};

