// src/components/CambridgeDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionCard from './ActionCard';

const CambridgeDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Cambridge English</h1>
      <hr />
      <h3>Choose Your Stage</h3>
      
      {/* Stages */}
      <ActionCard title="🌱 Primary" color="#28a745" onClick={() => navigate('/lesson/cambridge/primary/1')} />
      <ActionCard title="📘 Checkpoint" color="#28a745" onClick={() => navigate('/lesson/cambridge/checkpoint/1')} />
      <ActionCard title="🎓 IGCSE Foundation" color="#28a745" onClick={() => navigate('/lesson/cambridge/igcse/1')} />

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Continue Learning</h3>
        <p><strong>Last Lesson:</strong> Primary Reading Unit 5</p>
        
        <p><strong>Progress:</strong></p>
        <div style={{ width: '100%', backgroundColor: '#e9ecef', borderRadius: '10px', height: '20px' }}>
          <div style={{ width: '80%', backgroundColor: '#28a745', height: '100%', borderRadius: '10px' }}></div>
        </div>
      </div>

      <button 
        type="button"
        onClick={() => navigate('/dashboard')} 
        style={{ 
          marginTop: '30px', 
          padding: '12px 24px', 
          cursor: 'pointer',
          border: '1px solid #333',
          backgroundColor: 'white'
        }}
      >
        ← Back to Home
      </button>
    </div>
  );
};

export default CambridgeDashboard;