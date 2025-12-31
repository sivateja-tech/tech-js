import { useState } from "react";
import api from "../api/api";

export default function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", options: ["", "", "", ""], correctIndex: 0 }
    ]);
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].text = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const createQuiz = async () => {
  try {
    const quizRes = await api.post("/quiz", {
      title,
      description
    });

    const quizId = quizRes.data.data?.id || quizRes.data.id;
    if (!quizId) throw new Error("Quiz ID missing");

    for (const q of questions) {
      await api.post("/questions", {
        quizId,
        questionText: q.text,
        options: q.options.map((opt, i) => ({
          option_text: opt,
          is_correct: i === q.correctIndex
        }))
      });
    }

    alert("Quiz created successfully ✅");
    setTitle("");
    setDescription("");
    setQuestions([]);
  } catch (err) {
    console.error(err);
    alert("Failed to create quiz");
  }
};

  return (
    <div>
      

      <input
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Quiz Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={addQuestion}>Add Question</button>

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="question-box">
          <input
            placeholder={`Question ${qIndex + 1}`}
            value={q.text}
            onChange={(e) =>
              handleQuestionChange(qIndex, e.target.value)
            }
          />

          {q.options.map((opt, oIndex) => (
            <div key={oIndex}>
              <input
                placeholder={`Option ${oIndex + 1}`}
                value={opt}
                onChange={(e) =>
                  handleOptionChange(qIndex, oIndex, e.target.value)
                }
              />
              <input
                type="radio"
                name={`correct-${qIndex}`}
                checked={q.correctIndex === oIndex}
                onChange={() => {
                  const updated = [...questions];
                  updated[qIndex].correctIndex = oIndex;
                  setQuestions(updated);
                }}
              /> Correct
            </div>
          ))}
        </div>
      ))}

      <button onClick={createQuiz} className="btn">
        Create Quiz
      </button>
    </div>
  );
}
