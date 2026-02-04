import { useEffect, useState } from "react";
import "./App.css";

const API = "http://127.0.0.1:5000";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetch(`${API}/todos`)
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

async function addTodo() {
  if (!input.trim()) return;
    try {
      const res = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });
    if (!res.ok) throw new Error("Request failed");
      const todo = await res.json();
      setTodos(prev => [...prev, todo]);
      setInput("");
      } catch (err) {
        console.error("ADD TODO ERROR:", err);
      alert("Backend not reachable");
    }
  }

  function toggleDone(todo) {
    fetch(`${API}/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !todo.done })
    })
      .then(res => res.json())
      .then(updated =>
        setTodos(prev =>
          prev.map(t => (t.id === updated.id ? updated : t))
        )
      );
  }

  function deleteTodo(id) {
    fetch(`${API}/todos/${id}`, { method: "DELETE" })
      .then(() => setTodos(prev => prev.filter(t => t.id !== id)));
  }

  function saveEdit(id) {
    fetch(`${API}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editText })
    })
      .then(res => res.json())
      .then(updated => {
        setTodos(prev =>
          prev.map(t => (t.id === updated.id ? updated : t))
        );
        setEditingId(null);
      });
  }

  return (
    <div className="page">
      <div className="panel">
        <header>
          <h1>TO-DO</h1>
          <p>Things worth finishing</p>
        </header>

        <div className="input-row">
          <input
            placeholder="Add task"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTodo()}
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul>
          {todos.map(todo => (
            <li key={todo.id} className={todo.done ? "done" : ""}>
              {editingId === todo.id ? (
                <input
                  value={editText}
                  autoFocus
                  onChange={e => setEditText(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && saveEdit(todo.id)}
                />
              ) : (
                <span onClick={() => toggleDone(todo)}>
                  {todo.text}
                </span>
              )}

              <div className="actions">
                {editingId === todo.id ? (
                  <button onClick={() => saveEdit(todo.id)}>Save</button>
                ) : (
                  <button onClick={() => {
                    setEditingId(todo.id);
                    setEditText(todo.text);
                  }}>
                    Edit
                  </button>
                )}
                <button
                  className="delete"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
