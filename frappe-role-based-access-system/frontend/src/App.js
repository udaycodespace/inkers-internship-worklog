import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Admin from "./pages/Admin";
import Roles from "./pages/Roles";

function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Tasks - must be logged in */}
      <Route
        path="/tasks"
        element={
          user ? <Tasks /> : <Navigate to="/" />
        }
      />

      {/* Admin Panel - Company Admin only */}
      <Route
        path="/admin"
        element={
          user && user.roles.includes("Company Admin")
            ? <Admin />
            : <Navigate to="/tasks" />
        }
      />

      {/* Roles Management - Company Admin only */}
      <Route
        path="/roles"
        element={
          user && user.roles.includes("Company Admin")
            ? <Roles />
            : <Navigate to="/tasks" />
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
