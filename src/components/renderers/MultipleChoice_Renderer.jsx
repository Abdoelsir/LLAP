import React from 'react';

/**
 * MultipleChoice_Renderer: MCQ component
 * Updated to use standard prop signature { question, value, onChange }.
 */
const MultipleChoice_Renderer = ({ question, value, onChange }) => {
  return (
    <div 
      role="radiogroup" 
      aria-labelledby={`label-${question.questionId}`}
      style={{ marginTop: '10px' }}
    >
      <span id={`label-${question.questionId}`} className="sr-only" style={{ display: 'none' }}>
        Question {question.questionId}: {question.text}
      </span>

      {question.options?.map((option) => (
        <label 
          key={option} 
          style={{ 
            display: 'block', 
            margin: '10px 0', 
            padding: '8px 12px', 
            border: '1px solid #eee', 
            borderRadius: '4px',
            cursor: 'pointer' 
          }}
        >
          <input
            type="radio"
            name={`q-${question.questionId}`}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            role="radio"
            aria-checked={value === option}
            style={{ marginRight: '10px' }}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default MultipleChoice_Renderer;