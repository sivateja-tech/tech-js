import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import "./result.css";

export default function ResultPage() {
  const { submissionId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchResult() {
      try {
        const res = await api.get(`/submissions/${submissionId}`);
        setResult(res.data.data);
      } catch (err) {
        setError("Failed to load result");
      } finally {
        setLoading(false);
      }
    }

    fetchResult();
  }, [submissionId]);

  if (loading) return <p className="result-msg">Loading result...</p>;
  if (error) return <p className="result-error">{error}</p>;

  const total = result.answers.length;
  const score = result.score;

  return (
    <div className="result-container">
      <h2>{result.quizzes.title} – Result</h2>

      <div className="score-card">
        <p>
          Score: <strong>{score}</strong> / {total}
        </p>
        <p>
          Percentage:{" "}
          <strong>{Math.round((score / total) * 100)}%</strong>
        </p>
      </div>

      <div className="answers-section">
        {result.answers.map((a, index) => (
          <div
            key={a.id}
            className={`answer-card ${
              a.is_correct ? "correct" : "wrong"
            }`}
          >
            <h4>
              Q{index + 1}. {a.questions.question_text}
            </h4>

            <p>
              Your Answer:{" "}
              <strong>{a.options.option_text}</strong>
            </p>

            {!a.is_correct && (
              <p className="wrong-text">❌ Incorrect</p>
            )}

            {a.is_correct && (
              <p className="correct-text">✅ Correct</p>
            )}
          </div>
        ))}
      </div>

    
      <Link to="/quizzes" className="back-btn">
  Back to Quizzes
</Link>

    </div>
  );
}
