import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Admin from "./pages/Admin";
import Roles from "./pages/Roles";
import ResetPassword from "./pages/ResetPassword";

/* =========================================
   Layout Wrapper
========================================= */

function Layout({ children }) {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const location = useLocation();

  // Hide sidebar on login/reset pages
  const isPublicPage =
    location.pathname === "/" ||
    location.pathname === "/reset-password";

  if (!user || isPublicPage) {
    return children;
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="logo">Company Portal</h2>

        <nav>
          <button onClick={() => (window.location.href = "/tasks")}>
            Tasks
          </button>

          {isAdmin && (
            <>
              <button onClick={() => (window.location.href = "/admin")}>
                Admin
              </button>
              <button onClick={() => (window.location.href = "/roles")}>
                Roles
              </button>
            </>
          )}
        </nav>

        <div className="sidebar-footer">
          <button className="btn-secondary" onClick={logout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="content">{children}</main>
    </div>
  );
}

/* =========================================
   Routes
========================================= */

function AppRoutes() {
  const { user, loading, isAdmin } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="loader-screen">
        Checking session...
      </div>
    );
  }

  return (
    <Layout>
      <Routes>
        {/* Public */}
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/"
          element={!user ? <Login /> : <Navigate to="/tasks" replace />}
        />

        {/* Protected */}
        <Route
          path="/tasks"
          element={user ? <Tasks /> : <Navigate to="/" replace />}
        />

        <Route
          path="/admin"
          element={
            user && isAdmin
              ? <Admin />
              : <Navigate to="/tasks" replace />
          }
        />

        <Route
          path="/roles"
          element={
            user && isAdmin
              ? <Roles />
              : <Navigate to="/tasks" replace />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

/* =========================================
   App Root
========================================= */

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}