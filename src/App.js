// src/App.js

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, AuthContextProvider } from "./context/AuthContext"

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
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
