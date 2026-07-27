// src/components/MockExamLayout.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { exams } from '../data/exams'; // Dynamic data source

const MockExamLayout = () => {
  const { skill } = useParams();
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
    // In future phases, this will trigger the AssessmentService to grade the exam
    alert("Exam submitted successfully!");
    navigate(`/ielts/${skill}/performance`);
  };

  const section = exams.sections[currentSection];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
        <h2>{exams.examMetadata.title}</h2>
        <div style={{ color: timeLeft < 60 ? 'red' : 'black', fontWeight: 'bold' }}>
          Time: {formatTime(timeLeft)}
        </div>
      </header>

      {/* Instructional Section */}
      <div style={{ marginTop: '20px', backgroundColor: '#f0f0f0', padding: '15px' }}>
        <p>{exams.examMetadata.instructions}</p>
      </div>

      {/* Questions Section */}
      <section style={{ margin: '20px 0' }}>
        <h3>{section.title}</h3>
        {section.questions.map((q) => (
          <div key={q.questionId} style={{ marginBottom: '25px', padding: '15px', border: '1px solid #eee' }}>
            <p><strong>{q.questionId}:</strong> {q.text}</p>
            
            {/* Dynamic Input Renderer */}
            {q.type === 'multiple-choice' ? (
              q.options.map((opt) => (
                <label key={opt} style={{ display: 'block', margin: '5px 0' }}>
                  <input 
                    type="radio" 
                    name={q.questionId} 
                    value={opt}
                    onChange={() => handleAnswer(q.questionId, opt)} 
                  /> {opt}
                </label>
              ))
            ) : (
              <input 
                type="text" 
                placeholder="Type your answer..."
                style={{ width: '100%', padding: '8px' }}
                onChange={(e) => handleAnswer(q.questionId, e.target.value)} 
              />
            )}
          </div>
        ))}
      </section>

      {/* Navigation Controls */}
      <footer style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => navigate(-1)}>Exit Exam</button>
        {currentSection < exams.sections.length - 1 ? (
          <button onClick={() => setCurrentSection(currentSection + 1)}>Next Section</button>
        ) : (
          <button onClick={handleSubmit} style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 20px' }}>
            Submit Exam
          </button>
        )}
      </footer>
    </div>
  );
};

export default MockExamLayout;