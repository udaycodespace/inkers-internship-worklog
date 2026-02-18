import React, { useEffect, useState, useContext } from "react";
import frappe from "../api/frappe";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const loadTasks = async () => {
    try {
      const res = await frappe.get("/api/resource/Company Task?fields=[\"name\",\"title\",\"status\"]");
      setTasks(res.data.data);
    } catch (err) {
      alert("Not permitted or session expired");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async () => {
    if (!title.trim()) return;

    try {
      await frappe.post("/api/resource/Company Task", {
        title: title.trim(),
        status: "Open"
      });

      setTitle("");
      loadTasks();
    } catch (err) {
      alert("Permission denied to create task");
    }
  };

  const updateTask = async () => {
    if (!editingTask || !title.trim()) return;

    try {
      await frappe.put(`/api/resource/Company Task/${editingTask}`, {
        title: title.trim()
      });

      setEditingTask(null);
      setTitle("");
      loadTasks();
    } catch (err) {
      alert("Permission denied to edit task");
    }
  };

  const deleteTask = async (name) => {
    try {
      await frappe.delete(`/api/resource/Company Task/${name}`);
      loadTasks();
    } catch (err) {
      alert("Permission denied to delete task");
    }
  };

  const logout = async () => {
    await frappe.post("/api/method/logout");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Tasks</h2>

      {/* Admin Button */}
      {user && user.roles.includes("Company Admin") && (
        <button onClick={() => navigate("/admin")}>
          Go To Admin Panel
        </button>
      )}

      <button style={{ marginLeft: 10 }} onClick={logout}>
        Logout
      </button>

      <hr />

      <input
        value={title}
        placeholder="Enter Task Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      {editingTask ? (
        <button onClick={updateTask}>Update</button>
      ) : (
        <button onClick={createTask}>Create</button>
      )}

      <hr />

      {tasks.length === 0 ? (
        <p>No tasks created yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) =>
            task.title ? (
              <li key={task.name} style={{ marginBottom: 10 }}>
                <strong>{task.title}</strong> ({task.status})

                <button
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    setEditingTask(task.name);
                    setTitle(task.title);
                  }}
                >
                  Edit
                </button>

                <button
                  style={{ marginLeft: 5 }}
                  onClick={() => deleteTask(task.name)}
                >
                  Delete
                </button>
              </li>
            ) : null
          )}
        </ul>
      )}
    </div>
  );
}
