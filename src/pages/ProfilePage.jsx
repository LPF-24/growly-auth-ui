import React, { useEffect, useState } from "react";
import { logout, getProfile } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../api/authApi";

function ProfilePage() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getProfile()
           .then(setUser)
           .catch(() => {
             setError("Unauthorized or session expired");
             navigate("/login")
           });
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            alert("Logged out");
            navigate("/login");
        } catch(e) {
            alert("Logout failed");
        }
    };

    if (!user) return <div>Loading...</div>
    
    return (
        <div style={{ padding: "20px" }}>
            <h2>Your profile</h2>
            <br/>
            <p><strong>Username:</strong> {user.username}</p>
            <br/>
            <p><strong>Email:</strong> {user.email}</p>
            <br/>
            <button onClick={handleLogout}>Logout</button>
            <br/>
            <button onClick={() => navigate("/edit")}>Update Profile</button>
            <br/>
            <button onClick={async () => {
                if (window.confirm("Are you sure you want to delete your account?")) {
                    try {
                        await deleteProfile();
                        alert("account deleted");
                        navigate("/register");
                    } catch (err) {
                        alert(err.message || "Delete failed");
                    }
                }
            }}>Delete Account</button>
        </div>
    );
}

export default ProfilePage;