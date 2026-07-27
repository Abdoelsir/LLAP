// src/components/MockExamLayout.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { exams } from '../data/exams';

const MockExamLayout = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(exams.examMetadata.totalDurationMinutes * 60);
  const [submitted, setSubmitted] = useState(false);

  // Timer Logic
  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft, submitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswer = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    alert("Exam submitted successfully!");
    navigate(`/ielts/listening/performance`); // Redirect to performance
  };

  const section = exams.sections[currentSection];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
        <h2>{exams.examMetadata.title}</h2>
        <div style={{ color: timeLeft < 60 ? 'red' : 'black', fontWeight: 'bold' }}>
          Time Remaining: {formatTime(timeLeft)}
        </div>
      </header>

      <section style={{ margin: '20px 0' }}>
        <h3>{section.title}</h3>
        {section.questions.map((q) => (
          <div key={q.questionId} style={{ marginBottom: '20px' }}>
            <p>{q.text}</p>
            {q.type === 'multiple-choice' ? (
              q.options.map((opt) => (
                <label key={opt} style={{ display: 'block' }}>
                  <input type="radio" name={q.questionId} onChange={() => handleAnswer(q.questionId, opt)} /> {opt}
                </label>
              ))
            ) : (
              <input type="text" onChange={(e) => handleAnswer(q.questionId, e.target.value)} />
            )}
          </div>
        ))}
      </section>

      <footer style={{ marginTop: '20px' }}>
        {currentSection < exams.sections.length - 1 ? (
          <button onClick={() => setCurrentSection(currentSection + 1)}>Next Section</button>
        ) : (
          <button onClick={handleSubmit} style={{ backgroundColor: '#28a745', color: 'white' }}>Submit Exam</button>
        )}
      </footer>
    </div>
  );
};

export default MockExamLayout;