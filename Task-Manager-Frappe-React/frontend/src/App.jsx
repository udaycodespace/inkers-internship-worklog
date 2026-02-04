import React, { useState, useEffect } from 'react';

function App() {
  // 🔐 AUTH STATE
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🧾 TASK STATE
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  // 🔄 CHECK SESSION ON PAGE REFRESH
  useEffect(() => {
    fetch('/api/method/frappe.auth.get_logged_user', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.message !== "Guest") {
          setLoggedIn(true);
          fetchTasks();
        }
      });
  }, []);

  // 🔐 LOGIN
  const login = async () => {
    const res = await fetch('/api/method/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ usr: email, pwd: password })
    });

    const data = await res.json();
    if (data.message === "Logged In") {
      setLoggedIn(true);
      fetchTasks();
    } else {
      alert("Login failed");
    }
  };

  // 🚪 LOGOUT
  const logout = async () => {
    await fetch('/api/method/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setLoggedIn(false);
    setTasks([]);
  };

  // 📥 FETCH TASKS (USER-SCOPED BY BACKEND)
  const fetchTasks = async () => {
    const res = await fetch('/api/method/task_manager.api.get_tasks', {
      credentials: 'include'
    });
    const data = await res.json();
    setTasks(data.message || []);
  };

  // ➕ ADD TASK
  const addTask = async () => {
    if (!title) return alert("Title is required");

    await fetch('/api/method/task_manager.api.add_task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        title,
        description: desc,
        due_date: dueDate,
        priority
      })
    });

    setTitle("");
    setDesc("");
    setDueDate("");
    setPriority("Medium");
    fetchTasks();
  };

  // 🔁 UPDATE STATUS
  const updateStatus = async (name, newStatus) => {
    await fetch('/api/method/task_manager.api.update_task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, status: newStatus })
    });
    fetchTasks();
  };

  // 🗑️ DELETE TASK
  const deleteTask = async (name) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    await fetch('/api/method/task_manager.api.delete_task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name })
    });
    fetchTasks();
  };

  // 🚫 BLOCK TASK UI IF NOT LOGGED IN
  if (!loggedIn) {
    return (
      <div style={{ maxWidth: "300px", margin: "120px auto" }}>
        <h3>Login</h3>
        <input
          placeholder="Email"
          style={{ width: "100%", marginBottom: "10px" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", marginBottom: "10px" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login} style={{ width: "100%" }}>
          Login
        </button>
      </div>
    );
  }

  // 🎨 STYLES
  const containerStyle = {
    maxWidth: "500px",
    margin: "50px auto",
    background: "#fff",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px"
  };

  const headerStyle = {
    textAlign: "center",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
    marginBottom: "20px"
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "4px"
  };

  const btnStyle = {
    padding: "8px 15px",
    cursor: "pointer",
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    fontSize: "14px"
  };

  // ✅ MAIN APP (LOGGED IN)
  return (
    <div style={containerStyle}>
      <button onClick={logout} style={{ float: "right" }}>
        Logout
      </button>

      <h2 style={headerStyle}>Task Manager</h2>

      {/* INPUT FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input
          style={inputStyle}
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <select
          style={inputStyle}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <input
          type="date"
          style={inputStyle}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button onClick={addTask} style={{ ...btnStyle, width: "100%" }}>
          Add Task
        </button>
      </div>

      {/* TASK LIST */}
      <div>
        {tasks.map((t) => (
          <div key={t.name} style={{ borderBottom: "1px solid #eee", padding: "10px 0" }}>
            <strong>{t.title}</strong> ({t.priority})<br />
            <small>{t.description}</small><br />
            <small>Status: {t.status}</small><br />

            {t.status === "Open" && (
              <button
                onClick={() => updateStatus(t.name, "Completed")}
                style={{ ...btnStyle, background: "green", fontSize: "12px", marginRight: "5px" }}
              >
                Done
              </button>
            )}

            <button
              onClick={() => deleteTask(t.name)}
              style={{ ...btnStyle, background: "#d9534f", fontSize: "12px" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
