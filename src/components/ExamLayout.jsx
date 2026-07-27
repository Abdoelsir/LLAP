import React from 'react';
import { useExam } from './ExamContext';
import './cbt-layout.css'; // Importing mandatory styles for grid foundation

/**
 * ExamLayout: Universal Examination Shell
 * Refactored for IELTS CBT Grid Foundation:
 * - 45/55 Split-screen layout
 * - Independent scrollable regions
 * - Sticky header and footer
 */
const ExamLayout = ({ children, title, onExit, onNext, onPrevious, onSubmit }) => {
  const { timeLeft } = useExam();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // children[0] = Passage, children[1] = Question content
  return (
    <div className="cbt-container">
      <header className="cbt-header">
        <div>
          <strong>LLAP</strong> | IELTS Academic Mock Examination
          <h3 style={{ margin: '5px 0' }}>{title}</h3>
        </div>
        <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: timeLeft < 300 ? 'red' : 'black' }}>
          Time Remaining: {formatTime(timeLeft || 0)}
        </div>
        <button onClick={onExit} className="btn-exit">Exit Exam</button>
      </header>

      <div className="cbt-content">
        {/* Independent scrollable region for Passage */}
        <main className="passage-panel">
          {children[0]}
        </main>
        
        {/* Independent scrollable region for Questions */}
        <aside className="question-panel">
          <div className="questions-scrollable">
            {children[1]}
          </div>
        </aside>
      </div>

      <footer className="cbt-footer">
        <button 
          disabled={!onPrevious} 
          onClick={onPrevious} 
          className="nav-btn"
        >
          ◀ Previous
        </button>
        <button 
          disabled={!onNext} 
          onClick={onNext} 
          className="nav-btn"
        >
          Next ▶
        </button>
        <button onClick={onSubmit} className="btn-submit">Submit Exam</button>
      </footer>
    </div>
  );
};

export default ExamLayout;