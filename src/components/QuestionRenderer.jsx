import React from 'react';
import { useExam } from './ExamContext';
import RendererRegistry from './RendererRegistry';

/**
 * QuestionRenderer: Universal Component Factory
 * Dynamically resolves renderers based on group.questionType.
 * Maps individual questions to their respective interactive components.
 */
const QuestionRenderer = ({ group }) => {
  const { answers, updateAnswer } = useExam();

  // Defensive check: Stops rendering if no valid group data exists
  if (!group || !group.questionType) return null;

  // Registry Lookup: Matches exact label from data to the configured component
  const Component = RendererRegistry[group.questionType];

  // Fallback for missing/unconfigured types: Helpful for debugging new question types
  if (!Component) {
    console.warn(`Renderer received unconfigured question type: "${group.questionType}"`);
    return (
      <div style={{ color: 'red', fontSize: '0.8em', padding: '10px', border: '1px solid red' }}>
        Warning: Component for '{group.questionType}' is not configured.
      </div>
    );
  }

  // Maps individual questions within the group to the resolved component
  return (
    <div id={`q-${group.groupId}`} className="question-group-container">
      {group.questions.map((q) => (
        <div key={q.questionId} className="question-item" style={{ marginBottom: '15px' }}>
          <p style={{ fontWeight: '500', color: '#1a202c', marginBottom: '8px' }}>
            <strong>{q.questionId}.</strong> {q.text}
          </p>
          <Component 
            question={q}
            groupInstructions={group.instructions}
            value={answers[q.questionId] || ''}
            onChange={(val) => updateAnswer(q.questionId, val)}
          />
        </div>
      ))}
    </div>
  );
};

export default QuestionRenderer;