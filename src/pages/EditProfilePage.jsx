import React, { useEffect, useState } from "react";
import { getProfile } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../api/authApi";

function EditProfilePage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getProfile()
        .then((user) => {
            setUsername(user.username);
            setEmail(user.email);
        })
        .catch(() => {
            setError("Unauthorized");
            navigate("/login");
        });
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateProfile({ username, password, email });
            navigate("/profile");
        } catch (err) {
            if (err.response) {
                try {
                    const errorData = await err.response.json();

                    if(errorData.message) {
                        setError(errorData.message);
                    } else {
                        const allMessages = Object.entries(errorData)
                            .map(([field, message]) => `${field}: ${message}`)
                            .join(" | ");
                        setError(allMessages || "Update failed");    
                    }
                } catch (parseError) {
                    setError("Update failed (response parsing error)");
                }
            } else {
                setError(err.message || "Update failed");
            }
        }
    };

    return (
        <form onSubmit={handleUpdate}>
            <h2>Edit Profile</h2>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <br/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password (optional)" type="password" />
            <br/>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
            <br/>
            <button type="submit">Save changes</button>
            {error && <div style={{ color: "red" }}> {error}</div>}
            <br/>
            <button onClick={() => navigate("/profile")} style={{ margin: "10px" }}>
                Return to your personal account
            </button>
        </form>
    );
}

export default EditProfilePage;