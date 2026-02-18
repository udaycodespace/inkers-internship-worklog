import React, { useEffect, useState } from "react";
import frappe from "../api/frappe";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("Company Employee");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  // 🔐 Load Users (Admin Only)
  const loadUsers = async () => {
    try {
      const res = await frappe.get(
        "/api/method/company_access_portal.api.user_api.list_users"
      );

      setUsers(res.data.message);
      setLoading(false);
    } catch (err) {
      // If not admin → redirect safely
      navigate("/tasks");
    }
  };

  // ➕ Create User
  const createUser = async () => {
    if (!email.trim() || !firstName.trim() || !lastName.trim()) {
      alert("All fields are required");
      return;
    }

    try {
      setSubmitting(true);

      await frappe.post(
        "/api/method/company_access_portal.api.user_api.create_user",
        {
          email: email.trim(),
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          role
        }
      );

      alert("User created and invitation sent successfully!");

      setEmail("");
      setFirstName("");
      setLastName("");

      loadUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating user");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return <div style={{ padding: 40 }}>Loading Admin Panel...</div>;
  }

  return (
    <div style={{ padding: 40, maxWidth: 700 }}>
      <h2>Admin Panel</h2>

      {/* 🔹 Navigation Buttons */}
      <div style={{ marginBottom: 20 }}>
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

      <hr />

      {/* 🔹 Create User Section */}
      <h3>Create New User</h3>

      <div style={{ marginBottom: 10 }}>
        <input
          style={{ width: "100%", padding: 8 }}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <input
          style={{ width: "100%", padding: 8 }}
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <input
          style={{ width: "100%", padding: 8 }}
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <select
          style={{ width: "100%", padding: 8 }}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Company Employee">Company Employee</option>
          <option value="Company Admin">Company Admin</option>
        </select>
      </div>

      <button
        onClick={createUser}
        disabled={submitting}
        style={{ padding: "8px 16px" }}
      >
        {submitting ? "Creating..." : "Create User"}
      </button>

      <hr style={{ margin: "30px 0" }} />

      {/* 🔹 User List */}
      <h3>All Users</h3>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((u) => (
            <li
              key={u.name}
              style={{
                padding: 10,
                marginBottom: 8,
                border: "1px solid #ddd",
                borderRadius: 6
              }}
            >
              <strong>{u.first_name} {u.last_name}</strong>
              <br />
              <small>{u.name}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
