// src/components/IeltsDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionCard from './ActionCard';

const IeltsDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>IELTS Programme</h1>
      <p>Select a skill area to begin:</p>

      {/* Each navigation route now leads to the Skill-Specific Hub (the LMS Dashboard) */}
      <ActionCard title="🎧 Listening" color="#007bff" onClick={() => navigate('/ielts/listening')} />
      <ActionCard title="📖 Reading" color="#007bff" onClick={() => navigate('/ielts/reading')} />
      <ActionCard title="✍️ Writing" color="#007bff" onClick={() => navigate('/ielts/writing')} />
      <ActionCard title="🎤 Speaking" color="#007bff" onClick={() => navigate('/ielts/speaking')} />
      <ActionCard title="📝 Grammar" color="#007bff" onClick={() => navigate('/ielts/grammar')} />
      <ActionCard title="📚 Vocabulary" color="#007bff" onClick={() => navigate('/ielts/vocabulary')} />

      <button 
        type="button"
        onClick={() => navigate('/dashboard')} 
        style={{ 
          marginTop: '20px', 
          padding: '10px 20px', 
          cursor: 'pointer' 
        }}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default IeltsDashboard;