import React, { useEffect, useState } from "react";
import frappe from "../api/frappe";
import { useNavigate } from "react-router-dom";

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [modules, setModules] = useState({});
  const [selectedRole, setSelectedRole] = useState("");
  const [permissions, setPermissions] = useState({});
  const [newRole, setNewRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const navigate = useNavigate();

  // ===============================
  // LOAD ROLES
  // ===============================
  const loadRoles = async () => {
    try {
      const res = await frappe.get(
        "/api/method/company_access_portal.api.role_api.list_roles"
      );
      setRoles(res.data?.message || []);
    } catch (err) {
      setError("Failed to load roles.");
    }
  };

  // ===============================
  // LOAD MODULES
  // ===============================
  const loadModules = async () => {
    try {
      const res = await frappe.get(
        "/api/method/company_access_portal.api.role_api.list_modules_with_doctypes"
      );
      setModules(res.data?.message || {});
    } catch {
      setError("Failed to load modules.");
    }
  };

  // ===============================
  // LOAD PERMISSIONS
  // ===============================
  const loadPermissions = async (role) => {
    if (!role) return;

    try {
      const res = await frappe.get(
        `/api/method/company_access_portal.api.role_api.get_role_permissions?role=${role}`
      );

      const perms = {};
      (res.data?.message || []).forEach((p) => {
        perms[p.parent] = {
          read: !!p.read,
          write: !!p.write,
          create: !!p.create,
          delete: !!p.delete,
          submit: !!p.submit,
        };
      });

      setPermissions(perms);
    } catch {
      setError("Failed to load permissions.");
    }
  };

  useEffect(() => {
    Promise.all([loadRoles(), loadModules()]).finally(() =>
      setLoading(false)
    );
  }, []);

  useEffect(() => {
    loadPermissions(selectedRole);
  }, [selectedRole]);

  // ===============================
  // CREATE ROLE
  // ===============================
  const createRole = async (e) => {
    e.preventDefault();

    if (!newRole.trim()) {
      setError("Role name required.");
      return;
    }

    try {
      setError("");
      setSuccess("");

      await frappe.post(
        "/api/method/company_access_portal.api.role_api.create_role",
        { role_name: newRole.trim() }
      );

      setSuccess("Role created successfully.");
      setNewRole("");
      await loadRoles();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create role.");
    }
  };

  // ===============================
  // DELETE ROLE
  // ===============================
  const deleteRole = async () => {
    if (!selectedRole) return;

    if (!window.confirm("Are you sure you want to delete this role?"))
      return;

    try {
      setError("");
      setSuccess("");

      await frappe.post(
        "/api/method/company_access_portal.api.role_api.delete_role",
        { role_name: selectedRole }
      );

      setSuccess("Role deleted successfully.");
      setSelectedRole("");
      setPermissions({});
      await loadRoles();
    } catch (err) {
      setError(err.response?.data?.message || "Cannot delete role.");
    }
  };

  // ===============================
  // TOGGLE PERMISSION
  // ===============================
  const togglePermission = async (doctype, field) => {
    if (!selectedRole || updating) return;

    const current = permissions[doctype] || {};

    const updated = {
      read: current.read ? 1 : 0,
      write: current.write ? 1 : 0,
      create: current.create ? 1 : 0,
      delete: current.delete ? 1 : 0,
      submit: current.submit ? 1 : 0,
    };

    updated[field] = updated[field] ? 0 : 1;

    try {
      setUpdating(true);

      await frappe.post(
        "/api/method/company_access_portal.api.role_api.update_doctype_permission",
        {
          role: selectedRole,
          doctype,
          ...updated,
        }
      );

      await loadPermissions(selectedRole);
    } catch (err) {
      setError("Permission update failed.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Role Management</h1>
        <button onClick={() => navigate("/admin")}>
          Back to Admin
        </button>
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      {/* ================= CREATE ROLE ================= */}
      <div className="card">
        <h2>Create Role</h2>
        <form onSubmit={createRole}>
          <input
            value={newRole}
            placeholder="New Role Name"
            onChange={(e) => setNewRole(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>
      </div>

      {/* ================= SELECT ROLE ================= */}
      <div className="card" style={{ marginTop: 30 }}>
        <h2>Select Role</h2>

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">Select Role</option>
          {roles.map((r) => (
            <option key={r.name} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>

        {selectedRole && (
          <button
            style={{ marginLeft: 10 }}
            onClick={deleteRole}
          >
            Delete Role
          </button>
        )}
      </div>

      {/* ================= PERMISSIONS ================= */}
      {selectedRole &&
        Object.keys(modules).map((module) => (
          <div key={module} className="card" style={{ marginTop: 30 }}>
            <h3>{module}</h3>

            {modules[module].map((dt) => {
              const p = permissions[dt] || {};
              return (
                <div key={dt} style={{ marginBottom: 12 }}>
                  <strong>{dt}</strong>

                  {["read", "write", "create", "delete", "submit"].map(
                    (perm) => (
                      <label key={perm} style={{ marginLeft: 15 }}>
                        <input
                          type="checkbox"
                          checked={p[perm] || false}
                          disabled={updating}
                          onChange={() =>
                            togglePermission(dt, perm)
                          }
                        />{" "}
                        {perm}
                      </label>
                    )
                  )}
                </div>
              );
            })}
          </div>
        ))}
    </div>
  );
}