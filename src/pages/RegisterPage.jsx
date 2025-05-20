import React, { useState } from "react";
import { register } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await register(username, password, email);
            alert("Registration successful! Please login.");
            navigate("/login");
        } catch (err) {
            if (err.response) {
                try {
                    const errorData = await err.response.json();

                    if (errorData.message) {
                        setError(errorData.message);
                    } else {
                        const allMessages = Object.entries(errorData)
                            .map(([field, message]) => `${field}: ${message}`)
                            .join(" | ");
                    }
                } catch (parseError) {
                    setError("Registration failed (response parsing error)");
                }
            } else {
                setError(err.message || "Registration failed");
            }
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <br/>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required type="email" />
            <br/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required type="password" />
            <br/>
            <button type="submit">Register</button>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <br/>
            <span>Already have an account?</span>
            <br/>
            <button onClick={() => navigate("/login")} style={{ margin: "10px" }}>
                Login
            </button>
        </form>
    );
}

export default RegisterPage;