import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import frappe from "../api/frappe";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const roles = user?.roles || [];

  const canCreate =
    roles.includes("Company Admin") ||
    roles.includes("Task Manager");

  const canRead =
    roles.includes("Company Admin") ||
    roles.includes("Task Manager") ||
    roles.includes("Task Viewer") ||
    roles.includes("Reports Only");

  const canEdit = canCreate;
  const canDelete = canCreate;

  // ===============================
  // LOAD TASKS
  // ===============================
  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await frappe.get(
        `/api/resource/Company Task?fields=["name","title","status"]`
      );

      setTasks(res.data?.data || []);
    } catch (err) {
      setError("Failed to load tasks.");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    if (!canRead) {
      setError("You do not have permission to view tasks.");
      setLoading(false);
      return;
    }

    loadTasks();
  }, [user, canRead, loadTasks]);

  // ===============================
  // CREATE / UPDATE
  // ===============================
  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    if (!canCreate) {
      setError("You do not have permission.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      if (editingTask) {
        await frappe.put(
          `/api/resource/Company Task/${editingTask}`,
          { title: title.trim() }
        );
        setSuccess("Task updated successfully.");
      } else {
        await frappe.post("/api/resource/Company Task", {
          title: title.trim(),
          status: "Open",
        });
        setSuccess("Task created successfully.");
      }

      setTitle("");
      setEditingTask(null);
      await loadTasks();
    } catch {
      setError("Operation failed.");
    } finally {
      setSubmitting(false);
    }
  };

  // ===============================
  // DELETE
  // ===============================
  const deleteTask = async (name) => {
    if (!canDelete) return;

    if (!window.confirm("Delete this task?")) return;

    try {
      await frappe.delete(`/api/resource/Company Task/${name}`);
      setSuccess("Task deleted.");
      await loadTasks();
    } catch {
      setError("Delete failed.");
    }
  };

  // ===============================
  // LOGOUT
  // ===============================
  const handleLogout = async () => {
    await logout();
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div className="container">

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Task Management</h1>

        <div>
          {roles.includes("Company Admin") && (
            <button onClick={() => navigate("/admin")}>
              Admin Panel
            </button>
          )}

          <button style={{ marginLeft: 10 }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      {/* ================= CREATE / EDIT CARD ================= */}
      {canCreate && (
        <div className="card">
          <h2>{editingTask ? "Edit Task" : "Create Task"}</h2>

          <input
            value={title}
            placeholder="Enter task title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting
              ? "Saving..."
              : editingTask
              ? "Update"
              : "Create"}
          </button>

          {editingTask && (
            <button
              style={{ marginLeft: 10 }}
              onClick={() => {
                setEditingTask(null);
                setTitle("");
              }}
            >
              Cancel
            </button>
          )}
        </div>
      )}

      {/* ================= TASK LIST ================= */}
      <div className="card" style={{ marginTop: 30 }}>
        <h2>All Tasks</h2>

        {loading && <p>Loading...</p>}

        {!loading && tasks.length === 0 && (
          <p>No tasks available.</p>
        )}

        {!loading &&
          tasks.map((task) => (
            <div
              key={task.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <strong>{task.title}</strong>
                <div style={{ fontSize: 12, color: "#666" }}>
                  Status: {task.status}
                </div>
              </div>

              <div>
                {canEdit && (
                  <button
                    onClick={() => {
                      setEditingTask(task.name);
                      setTitle(task.title);
                    }}
                  >
                    Edit
                  </button>
                )}

                {canDelete && (
                  <button
                    style={{ marginLeft: 10 }}
                    onClick={() => deleteTask(task.name)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}