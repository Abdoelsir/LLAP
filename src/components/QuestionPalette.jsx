import React from 'react';
import { useExam } from './ExamContext';

const QuestionPalette = ({ questions, onJumpToQuestion }) => {
  const { answers, flags } = useExam();

  if (!questions || questions.length === 0) return null;

  return (
    <div className="question-palette-container" style={{ marginBottom: '20px' }}>
      <h5 style={{ marginBottom: '8px', fontSize: '0.9rem', color: '#333' }}>Question Navigation</h5>
      <div 
        className="question-palette" 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(5, 1fr)', 
          gap: '6px', 
          padding: '10px', 
          background: '#fcfcfc', 
          border: '1px solid #e0e0e0',
          borderRadius: '4px'
        }}
      >
        {questions.map((q) => {
          const isAnswered = !!answers[q.questionId];
          const isFlagged = flags.includes(q.questionId);
          
          return (
            <button
              key={q.questionId}
              onClick={() => onJumpToQuestion(q.questionId)}
              style={{
                padding: '8px 4px',
                fontSize: '0.85rem',
                fontWeight: 'bold',
                backgroundColor: isAnswered ? '#28a745' : '#f8f9fa',
                color: isAnswered ? '#fff' : '#333',
                border: isFlagged ? '2px solid #ffc107' : '1px solid #ccc',
                borderRadius: '3px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              title={`Question ${q.questionId}${isAnswered ? ' (Answered)' : ''}${isFlagged ? ' (Flagged)' : ''}`}
            >
              {q.questionId}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionPalette;