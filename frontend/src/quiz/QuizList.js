import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./quiz.css";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // ✅ hook at top level

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const res = await api.get("/quiz");

        // 🔥 DEFENSIVE RESPONSE HANDLING
        if (Array.isArray(res.data)) {
          setQuizzes(res.data);
        } else if (Array.isArray(res.data.data)) {
          setQuizzes(res.data.data);
        } else if (Array.isArray(res.data.quizzes)) {
          setQuizzes(res.data.quizzes);
        } else {
          setQuizzes([]);
        }
      } catch (err) {
        setError("Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    }

    fetchQuizzes();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading quizzes...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;
  if (quizzes.length === 0)
    return <p style={{ padding: 20 }}>No quizzes available</p>;

  return (
    <div className="quiz-grid">
      {quizzes.map((q) => (
        <div key={q.id} className="quiz-card">
          <h3>{q.title}</h3>
          <p>{q.description}</p>

          <button
            className="btn"
            onClick={() => navigate(`/quiz/${q.id}`)}
          >
            Start Quiz
          </button>
        </div>
      ))}
    </div>
  );
}
