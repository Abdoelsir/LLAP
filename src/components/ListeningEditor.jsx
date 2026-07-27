import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AssessmentService } from '../services/AssessmentService';
import ExamLayout from './ExamLayout';
import { useExam } from './ExamContext';

const ListeningEditor = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const audioRef = useRef(null);
  
  // Access global state for persistent answers
  const { answers, updateAnswer } = useExam();
  
  const [examData, setExamData] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    // Fetch data via the centralized Service Layer
    if (typeof AssessmentService.getListeningMetadata === 'function') {
      const data = AssessmentService.getListeningMetadata(examId);
      setExamData(data);
    } else {
      console.error("AssessmentService.getListeningMetadata is not defined.");
    }
  }, [examId]);

  // DEFENSIVE FIX: Safeguard against premature rendering
  if (!examData) {
    return (
      <ExamLayout title="IELTS Listening | Loading...">
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h3>Loading examination data...</h3>
        </div>
      </ExamLayout>
    );
  }

  const handleExit = () => {
    if (window.confirm("Leave Exam? Progress will be saved automatically.")) {
      navigate(`/ielts/listening/exams`);
    }
  };

  return (
    <ExamLayout 
      title={`IELTS Listening | ${examData.title}`} 
      onExit={handleExit}
    >
      <div style={{ display: 'flex', flex: 1, gap: '20px', padding: '20px' }}>
        {/* Audio Engine Area */}
        <div style={{ flex: 1, borderRight: '1px solid #ddd', paddingRight: '20px' }}>
          <h4>Audio Section</h4>
          <audio 
            ref={audioRef}
            src={examData.audioFile}
            controls={true}
            onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          />
          <p>Time: {Math.floor(currentTime)}s</p>
        </div>

        {/* Question Engine Area */}
        <div style={{ flex: 1, overflowY: 'scroll', paddingLeft: '20px' }}>
          <h4>Questions</h4>
          {examData.questions?.map((q) => (
            <div key={q.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #eee' }}>
              <p>{q.id}. {q.text}</p>
              <input 
                type="text" 
                value={answers[q.id] || ''}
                onChange={(e) => updateAnswer(q.id, e.target.value)}
                placeholder="Type answer..." 
              />
            </div>
          ))}
        </div>
      </div>
    </ExamLayout>
  );
};

export default ListeningEditor;