import { useEffect, useState } from "react";
import api from "../api/api";
import CreateQuiz from "./CreateQuiz";
import "./admin.css";

export default function AdminDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================
  // LOAD QUIZZES
  // ============================
  const loadQuizzes = async () => {
    try {
      const res = await api.get("/quiz");

      if (Array.isArray(res.data)) {
        setQuizzes(res.data);
      } else if (Array.isArray(res.data.data)) {
        setQuizzes(res.data.data);
      } else {
        setQuizzes([]);
      }
    } catch (err) {
      setError("Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  // ============================
  // DELETE QUIZ
  // ============================
  const deleteQuiz = async (quizId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quiz?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/quiz/${quizId}`);
      alert("Quiz deleted successfully");

      // update UI immediately
      setQuizzes((prev) => prev.filter((q) => q.id !== quizId));
    } catch (err) {
      alert("Failed to delete quiz");
    }
  };

  if (loading)
    return <p className="admin-msg">Loading admin dashboard...</p>;

  if (error)
    return <p className="admin-msg error">{error}</p>;

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      {/* ========================
          CREATE QUIZ
      ======================== */}
      <section className="admin-section">
        <h3>Create Quiz</h3>
        <CreateQuiz />
      </section>

      {/* ========================
          MANAGE QUIZZES
      ======================== */}
      <section className="admin-section">
        <h3>Manage Quizzes</h3>

        {quizzes.length === 0 && <p>No quizzes available</p>}

        {quizzes.map((quiz) => (
          <div key={quiz.id} className="admin-quiz-card">
            <div>
              <strong>{quiz.title}</strong>
              <p className="muted">{quiz.description}</p>
            </div>

            <button
              className="btn danger"
              onClick={() => deleteQuiz(quiz.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
