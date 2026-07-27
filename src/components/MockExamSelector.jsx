import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MockExamSelector = () => {
  const { skill } = useParams();
  const navigate = useNavigate();

  const exams = [
    { id: '1', title: 'Academic Mock Test 1', duration: '60 Minutes' },
    { id: '2', title: 'Academic Mock Test 2', duration: '60 Minutes' },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>IELTS {skill.charAt(0).toUpperCase() + skill.slice(1)} Mock Exams</h2>
      {exams.map((exam) => (
        <div key={exam.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '8px' }}>
          <h3>{exam.title}</h3>
          <p>Duration: {exam.duration}</p>
          <button onClick={() => navigate(`/ielts/${skill}/instructions/${exam.id}`)}>Start Exam</button>
        </div>
      ))}
      
      {/* Updated Back button to navigate directly to the Reading Dashboard */}
      <button 
        onClick={() => navigate(`/ielts/${skill}`)} 
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
      >
        Back
      </button>
    </div>
  );
};

export default MockExamSelector;