import React from 'react';

/**
 * SummaryCompletionOptions_Renderer
 * Renders the dropdown selection widget for summary completion items using phrase banks (A–J).
 */
const SummaryCompletionOptions_Renderer = ({ question, value, onChange }) => {
  const phraseBank = question.phraseBank || [
    { id: "A", text: "user churn" },
    { id: "B", text: "cognitive stretch" },
    { id: "C", text: "unpredictable innovation" },
    { id: "D", text: "financial stability" },
    { id: "E", text: "familiar comfort" },
    { id: "F", text: "radical transparency" },
    { id: "G", text: "creative originality" },
    { id: "H", text: "behavioral tracking" },
    { id: "I", text: "automated efficiency" },
    { id: "J", text: "cognitive autonomy" }
  ];

  return (
    <div className="summary-completion-options-widget" style={{ marginTop: '8px' }}>
      {/* Dropdown Selection Box for A-J */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '300px',
          padding: '8px 12px',
          fontSize: '0.95rem',
          border: '1px solid #cbd5e1',
          borderRadius: '4px',
          backgroundColor: '#fff',
          cursor: 'pointer',
          color: '#0f172a'
        }}
      >
        <option value="">-- Select option (A–J) --</option>
        {phraseBank.map((item) => (
          <option key={item.id} value={item.id}>
            {item.id}. {item.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SummaryCompletionOptions_Renderer;