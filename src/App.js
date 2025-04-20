// src/App.js

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, AuthContextProvider } from "./context/AuthContext"
import MusicPreferences from "./pages/MusicPreferences";
import SearchPage from "./pages/SearchPage";
import { MusicPlayerProvider } from "./context/MusicPlayerContext";
import Callback from "./pages/Callback";

function App() {

  const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    if (JSON.stringify(currentUser) === '{}') {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <MusicPlayerProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/music-preferences" element={<MusicPreferences />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/callback" element={<Callback />} />
          </Routes>
        </MusicPlayerProvider>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
