import React from 'react';
import QuestionRenderer from './QuestionRenderer';

/**
 * QuestionGroupRenderer
 * Renders group instruction banners and group-level resource boxes (like phrase banks),
 * then delegates individual item rendering to QuestionRenderer.
 */
const QuestionGroupRenderer = ({ group }) => {
  // Robustly extract phrase bank from group level or first question item
  const phraseBank = group?.phraseBank || group?.questions?.[0]?.phraseBank;

  return (
    <div className="question-group" style={{ marginBottom: '25px', padding: '15px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: '#fff' }}>
      {/* Group Instructions Banner */}
      {group?.instructions && group.instructions.trim() !== "" && (
        <div className="group-instructions" style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #edf2f7' }}>
          <p style={{ fontSize: '0.95rem', fontWeight: '600', color: '#2d3748', lineHeight: '1.5', margin: 0 }}>
            {group.instructions}
          </p>
        </div>
      )}

      {/* Group-Level Phrase Bank Box for Summary Completion (Rendered above Question 31) */}
      {phraseBank && (
        <div className="phrase-bank-container" style={{ 
          background: '#f8fafc', 
          border: '1px solid #cbd5e1', 
          borderRadius: '6px', 
          padding: '14px 18px', 
          marginBottom: '20px' 
        }}>
          <p style={{ fontWeight: '700', fontSize: '0.9rem', color: '#1e293b', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            List of Phrases:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {phraseBank.map((item) => (
              <div key={item.id} style={{ fontSize: '0.88rem', color: '#334155' }}>
                <strong>{item.id}.</strong> {item.text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delegate questions rendering */}
      <QuestionRenderer group={group} />
    </div>
  );
};

export default QuestionGroupRenderer;