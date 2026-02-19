import React, { useEffect, useState } from "react";
import frappe from "../api/frappe";
import { useNavigate, useLocation } from "react-router-dom";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // =========================================
  // LOAD USERS
  // =========================================
  const loadUsers = async () => {
    try {
      const res = await frappe.get(
        "/api/method/company_access_portal.api.user_api.list_users"
      );

      const userData = res?.data?.message;
      setUsers(Array.isArray(userData) ? userData : []);
    } catch (err) {
      console.error("User load failed:", err);
      navigate("/tasks");
    }
  };

  // =========================================
  // LOAD ROLES (BULLETPROOF)
  // =========================================
  const loadRoles = async () => {
    try {
      const res = await frappe.get(
        "/api/method/company_access_portal.api.role_api.list_roles"
      );

      const roleData = res?.data?.message;

      if (Array.isArray(roleData)) {
        setRoles(roleData);
      } else {
        setRoles([]);
      }
    } catch (err) {
      console.error("Failed loading roles:", err);
      setRoles([]);
      setError("Failed to load roles.");
    }
  };

  // Reload when returning from /roles page
  useEffect(() => {
    setLoading(true);

    Promise.all([loadUsers(), loadRoles()]).finally(() =>
      setLoading(false)
    );
  }, [location]);

  // =========================================
  // CREATE USER
  // =========================================
  const createUser = async (e) => {
    e.preventDefault();

    if (!email.trim() || !firstName.trim()) {
      setError("Email and First Name are required.");
      return;
    }

    if (selectedRoles.length === 0) {
      setError("Select at least one role.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await frappe.post(
        "/api/method/company_access_portal.api.user_api.create_user",
        {
          email: email.trim(),
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          roles: selectedRoles,
        }
      );

      // Reset form
      setEmail("");
      setFirstName("");
      setLastName("");
      setSelectedRoles([]);

      await loadUsers(); // refresh list
    } catch (err) {
      setError(err?.message || "Error creating user.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleRole = (roleName) => {
    setSelectedRoles((prev) =>
      prev.includes(roleName)
        ? prev.filter((r) => r !== roleName)
        : [...prev, roleName]
    );
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      {/* ================= HEADER ================= */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <h1>Admin Panel</h1>
        <div>
          <button onClick={() => navigate("/tasks")}>
            Back to Tasks
          </button>
          <button
            style={{ marginLeft: 10 }}
            onClick={() => navigate("/roles")}
          >
            Manage Roles
          </button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {/* ================= CREATE USER ================= */}
      <div className="card">
        <h2>Create New User</h2>

        <form onSubmit={createUser}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <div style={{ marginTop: 15 }}>
            <strong>Select Roles:</strong>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(200px, 1fr))",
                marginTop: 10,
                gap: 6,
              }}
            >
              {roles.length === 0 ? (
                <p>No roles available</p>
              ) : (
                roles.map((r) => (
                  <label key={r.name}>
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(r.name)}
                      onChange={() => toggleRole(r.name)}
                    />{" "}
                    {r.name}
                  </label>
                ))
              )}
            </div>
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>

      {/* ================= USER LIST ================= */}
      <div className="card" style={{ marginTop: 30 }}>
        <h2>All Users</h2>

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.name}>
                  <td>
                    {u.first_name} {u.last_name}
                  </td>
                  <td>{u.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}