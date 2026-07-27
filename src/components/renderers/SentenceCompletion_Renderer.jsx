import React from 'react';

/**
 * SentenceCompletion_Renderer
 * Handles 'Sentence Completion' and 'Short Answer' types.
 * Strictly enforces word-limit constraints by evaluating group-level instructions 
 * and truncating input beyond max words.
 */
const SentenceCompletion_Renderer = ({ question, groupInstructions, value, onChange }) => {
  if (!question) return null;

  // Determine word limit dynamically from question config or parent group instructions
  const extractWordLimit = (q, gInstructions) => {
    if (q?.maxWords) return q.maxWords;
    
    // Check all possible instruction placement levels securely
    const instructionText = (
      gInstructions ||
      q?.instructions || 
      q?.groupInstructions || 
      q?.parentInstructions || 
      q?.group?.instructions ||
      ""
    ).toUpperCase();

    if (instructionText.includes("ONE WORD ONLY") || instructionText.includes("NO MORE THAN ONE WORD")) return 1;
    if (instructionText.includes("NO MORE THAN TWO WORDS")) return 2;
    if (instructionText.includes("NO MORE THAN THREE WORDS")) return 3;
    if (instructionText.includes("NO MORE THAN FOUR WORDS")) return 4;
    return null; // Default: unconstrained unless specified
  };

  const maxWords = extractWordLimit(question, groupInstructions);

  // Calculate current word count accurately using whitespace splitting
  const countWords = (text) => {
    if (!text || typeof text !== 'string') return 0;
    const trimmed = text.trim();
    if (trimmed === '') return 0;
    return trimmed.split(/\s+/).length;
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    
    if (maxWords !== null) {
      const words = newValue.trim() === '' ? [] : newValue.trim().split(/\s+/);
      
      // Strict Enforcement: If the user types past the limit, truncate the value immediately
      if (words.length > maxWords) {
        const truncatedValue = words.slice(0, maxWords).join(' ');
        onChange(truncatedValue);
        return;
      }
    }

    onChange(newValue);
  };

  const currentWordCount = countWords(value);
  const isAtLimit = maxWords !== null && currentWordCount >= maxWords;

  return (
    <div className="sentence-completion-container" style={{ marginTop: '10px' }}>
      <label 
        htmlFor={`input-${question.questionId}`} 
        className="sr-only" 
        style={{ display: 'none' }}
      >
        Answer for: {question.text}
      </label>
      
      <input
        id={`input-${question.questionId}`}
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Type your answer here..."
        aria-label={`Answer for question ${question.questionId}`}
        aria-required="true"
        style={{ 
          width: '100%', 
          maxWidth: '450px',
          padding: '10px', 
          border: isAtLimit ? '1px solid #0284c7' : '1px solid #ccc', 
          borderRadius: '4px',
          backgroundColor: '#fff',
          color: '#0f172a',
          outline: 'none'
        }}
      />

      {maxWords !== null && (
        <div style={{ 
          fontSize: '0.8rem', 
          marginTop: '4px', 
          color: isAtLimit ? '#0284c7' : '#64748b',
          fontWeight: '400'
        }}>
          Word count: {currentWordCount} / {maxWords} max {maxWords === 1 ? 'word' : 'words'} (Strictly enforced)
        </div>
      )}
    </div>
  );
};

export default SentenceCompletion_Renderer;