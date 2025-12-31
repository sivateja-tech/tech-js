import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../api/api";
import "./quiz.css";

const QUIZ_TIME_SECONDS = 1 * 60; // 5 minutes

export default function QuizAttempt() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_SECONDS);
  const [submitting, setSubmitting] = useState(false);

  const timerRef = useRef(null);

  /* =========================
     FETCH QUESTIONS
  ========================= */
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await api.get(`/questions/${quizId}`);

        if (Array.isArray(res.data)) {
          setQuestions(res.data);
        } else if (Array.isArray(res.data.data)) {
          setQuestions(res.data.data);
        } else if (Array.isArray(res.data.questions)) {
          setQuestions(res.data.questions);
        } else {
          setQuestions([]);
        }
      } catch (err) {
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [quizId]);

  /* =========================
     START TIMER
  ========================= */
  useEffect(() => {
    if (questions.length === 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          submitQuiz(true); // 🔥 auto submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [questions]);

  /* =========================
     FORMAT TIME
  ========================= */
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  /* =========================
     SUBMIT QUIZ
  ========================= */
  const submitQuiz = async (autoSubmit = false) => {
    if (submitting) return;
    setSubmitting(true);
    clearInterval(timerRef.current);

    try {
      // 1️⃣ Create submission
      const submissionRes = await api.post("/submissions", {
        quizId: Number(quizId)
      });

      const submissionId =
        submissionRes.data?.data?.id ||
        submissionRes.data?.id;

      if (!submissionId) {
        throw new Error("Submission ID missing");
      }

      // 2️⃣ Save answers (skip unanswered)
      for (const questionId in answers) {
        const selectedOptionId = answers[questionId];
        if (!selectedOptionId) continue;

        await api.post("/answers", {
          submissionId: Number(submissionId),
          questionId: Number(questionId),
          selectedOptionId: Number(selectedOptionId)
        });
      }

      // 3️⃣ Redirect to result
      navigate(`/result/${submissionId}`);
    } catch (err) {
      console.error("SUBMIT QUIZ ERROR:", err.response?.data || err.message);
      if (!autoSubmit) {
        alert("Failed to submit quiz");
      }
    }
  };

  /* =========================
     UI STATES
  ========================= */
  if (loading) return <p style={{ padding: 20 }}>Loading questions...</p>;
  if (error) return <p style={{ padding: 20, color: "red" }}>{error}</p>;
  if (questions.length === 0)
    return <p style={{ padding: 20 }}>No questions available</p>;

  return (
    <div className="quiz-attempt">
      {/* TIMER */}
      <div className={`timer ${timeLeft <= 30 ? "danger" : ""}`}>
        Time Left: {formatTime(timeLeft)}
      </div>

      {/* QUESTIONS */}
      {questions.map((q) => (
        <div key={q.id} className="question-card">
          <h4>{q.question_text}</h4>

          {q.options?.map((o) => (
            <label key={o.id}>
              <input
                type="radio"
                name={`question-${q.id}`}
                checked={answers[q.id] === o.id}
                onChange={() =>
                  setAnswers((prev) => ({
                    ...prev,
                    [q.id]: o.id
                  }))
                }
                disabled={submitting}
              />
              {o.option_text}
            </label>
          ))}
        </div>
      ))}

      {/* SUBMIT BUTTON */}
      <button
        className="btn"
        onClick={() => submitQuiz(false)}
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit Quiz"}
      </button>
    </div>
  );
}
