import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../css/Login.css'; // Updated path
const Login = () => {
    const { updateCurrentUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        console.log("login hit");
    });

    const handleLogin = () => {
        const user = { name: username };
        updateCurrentUser(user);

        const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID; // replace with actual ID
        const redirect_uri = "http://localhost:3000/callback";
        const scopes = [
          "playlist-read-private",
          "playlist-read-collaborative"
        ];

        const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${scopes.join('%20')}`;

        window.location.href = authUrl;
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
