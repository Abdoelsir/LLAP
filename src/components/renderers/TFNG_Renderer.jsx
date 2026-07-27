import React from 'react';

/**
 * TFNG_Renderer: True/False/Not Given component
 * Updated to use standard prop signature { question, value, onChange }.
 */
const TFNG_Renderer = ({ question, value, onChange }) => {
  const options = ['TRUE', 'FALSE', 'NOT GIVEN'];

  return (
    <div 
      role="radiogroup" 
      aria-labelledby={`label-${question.questionId}`}
      style={{ display: 'flex', gap: '15px', marginTop: '10px' }}
    >
      <span id={`label-${question.questionId}`} className="sr-only" style={{ display: 'none' }}>
        Question {question.questionId}: {question.text}
      </span>

      {options.map((option) => (
        <label 
          key={option} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <input
            type="radio"
            name={`q-${question.questionId}`}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            role="radio"
            aria-checked={value === option}
            style={{ marginRight: '8px' }}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default TFNG_Renderer;