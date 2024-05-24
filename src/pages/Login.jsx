// src/pages/Login.js

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../css/Login.css'; // Updated path
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { updateCurrentUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log("login hit");
    });

    const handleLogin = () => {
        const user = { name: username };
        updateCurrentUser(user);
        navigate("/");
    };

    return (
        <div className="login-page">
        <div className="login-container">
            <h1 className="login-heading">Music Reco</h1>
            <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            />
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
        </div>
    );
};

export default Login;
