const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function login(username, password) {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", //нужно для отправки и получения cookie
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    return await response.json();
}

export async function register(username, password, email) {
    const response = await fetch(`${API_BASE}/auth/registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ username, password, email }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Registration failed");
    }

    return await response.json();
}