import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AssessmentService } from '../services/AssessmentService';
import ExamLayout from './ExamLayout';
import { useExam } from './ExamContext';

const WritingEditor = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  // Connect to Global Exam State
  const { answers, updateAnswer, currentTask, setCurrentTask } = useExam();
  
  const [examData, setExamData] = useState(null);

  useEffect(() => {
    // Fetch data via the service layer
    const data = AssessmentService.getWritingAssessment(examId);
    setExamData(data || { title: "Academic Writing Mock Test" });
    
    // Ensure we start at task 1 when component mounts
    setCurrentTask(1);
  }, [examId, setCurrentTask]);

  const handleExit = () => {
    if (window.confirm("Leave Exam? Unsaved progress may be lost.")) {
      navigate('/ielts/writing/exams');
    }
  };

  const handleSubmit = () => {
    const auditData = {
      studentId: "student-123",
      skill: "writing",
      rawScore: null,
      band: null,
      mode: "MockExam"
    };
    
    AssessmentService.recordSubmissionAudit(auditData);
    alert("Writing test submitted for evaluation.");
    navigate('/dashboard');
  };

  if (!examData) return <div>Loading Writing Exam...</div>;

  const currentTaskId = `writing-t${currentTask}`;
  const wordLimit = currentTask === 1 ? 150 : 250;
  const text = answers[currentTaskId] || '';
  const wordCount = text.trim() ? text.trim().split(/\s+/).filter(w => w).length : 0;

  return (
    <ExamLayout 
      title={`IELTS Writing | ${examData.title}`} 
      onExit={handleExit}
      onNext={() => setCurrentTask(2)}
      onPrevious={() => setCurrentTask(1)}
      onSubmit={handleSubmit}
    >
      <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
        {/* Question Panel */}
        <div style={{ backgroundColor: '#f4f4f4', padding: '15px', marginBottom: '20px', borderLeft: '5px solid #007bff' }}>
          <strong>Task {currentTask} Question:</strong>
          <p>{currentTask === 1 ? "The graph below shows..." : "Some people believe that..."}</p>
          <small>Write at least {wordLimit} words.</small>
        </div>

        {/* Unified Essay Editor */}
        <textarea 
          style={{ width: '100%', height: '300px', padding: '15px', fontSize: '16px' }}
          placeholder="Type your essay here..."
          value={text}
          onChange={(e) => updateAnswer(currentTaskId, e.target.value)}
        />

        {/* Word Count */}
        <div style={{ margin: '10px 0', fontWeight: 'bold' }}>
          Word Count: {wordCount} / {wordLimit}
        </div>
      </div>
    </ExamLayout>
  );
};

export default WritingEditor;