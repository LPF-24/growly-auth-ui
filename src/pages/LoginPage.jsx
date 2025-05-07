import React, { useState } from "react";
import { login } from "../api/authApi";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(username, password);
            alert("Login successful");
        } catch (err) {
            setError(err.message || "Unknown error");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
            {error && <div style={{color: "red"}}>{error}</div>}
        </form>
    );
}

export default LoginPage;