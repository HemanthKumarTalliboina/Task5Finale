// frontend/src/Students.jsx

import { useEffect, useState } from "react";
import api from "./apiClient";

import { useAuth } from "./AuthContext";

const Students = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students/");
      setStudents(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/students/", { name, email });
      setName("");
      setEmail("");
      await fetchStudents();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to add student");
    }
  };

  const isAdmin = user?.role === "admin";

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Students</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {isAdmin && (
        <form onSubmit={handleAddStudent}>
          <h3>Add Student (Admin only)</h3>
          <div style={{ marginBottom: 10 }}>
            <label>Name</label>
            <input
              style={{ width: "100%" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Email</label>
            <input
              style={{ width: "100%" }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Student</button>
        </form>
      )}

      <h3 style={{ marginTop: 30 }}>Student List</h3>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} - {s.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;
