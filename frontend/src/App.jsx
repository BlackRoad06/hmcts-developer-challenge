import { useState } from "react";
import "./App.css";

export default function App() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    dueDate: "",
  });

  const [createdTask, setCreatedTask] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCreatedTask(null);

    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.errors?.join(", ") || "Failed to create task");
      } else {
        setCreatedTask(data);
        setForm({
          title: "",
          description: "",
          status: "todo",
          dueDate: "",
        });
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  }

  return (
    <div className="page">
      <div className="card">

        <h1 style={{ textAlign: "center" }}>Create a Task</h1>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div className="form-group">
            <label>Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description (optional)</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="form-group">
            <label>Due Date/Time *</label>
            <input
              type="datetime-local"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Task"}
          </button>
        </form>

        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

        {createdTask && (
          <div className="success-box">
            <h2>Task Created Successfully</h2>
            <p><strong>Title:</strong> {createdTask.title}</p>
            <p><strong>Description:</strong> {createdTask.description || "—"}</p>
            <p><strong>Status:</strong> {createdTask.status}</p>
            <p><strong>Due:</strong> {createdTask.dueDate}</p>
          </div>
        )}

      </div>
    </div>
  );
}
