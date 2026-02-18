import React, { useEffect, useState } from "react";
import frappe from "../api/frappe";
import { useNavigate } from "react-router-dom";

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");
  const navigate = useNavigate();

  const loadRoles = async () => {
    try {
      const res = await frappe.get(
        "/api/method/company_access_portal.api.user_api.list_roles"
      );
      setRoles(res.data.message);
    } catch (err) {
      navigate("/tasks");
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const createRole = async () => {
    if (!newRole.trim()) {
      alert("Enter role name");
      return;
    }

    try {
      await frappe.post(
        "/api/method/company_access_portal.api.user_api.create_role",
        { role_name: newRole }
      );

      setNewRole("");
      loadRoles();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating role");
    }
  };

  const deleteRole = async (roleName) => {
    if (!window.confirm("Delete this role?")) return;

    try {
      await frappe.post(
        "/api/method/company_access_portal.api.user_api.delete_role",
        { role_name: roleName }
      );

      loadRoles();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting role");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Role Management</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          value={newRole}
          placeholder="New Role Name"
          onChange={(e) => setNewRole(e.target.value)}
        />

        <button style={{ marginLeft: 10 }} onClick={createRole}>
          Create Role
        </button>
      </div>

      <h3>Existing Roles</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {roles.map((r) => (
          <li key={r.name} style={{ marginBottom: 10 }}>
            {r.name}

            <button
              style={{ marginLeft: 10 }}
              onClick={() => deleteRole(r.name)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
