import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AssessmentService } from '../services/AssessmentService';
import ExamLayout from './ExamLayout';
import { useExam } from './ExamContext';

const SpeakingEditor = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  const { currentTask, setCurrentTask } = useExam();
  const exam = AssessmentService.getSpeakingExam(examId);
  
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    if (!currentTask) setCurrentTask(1);
  }, [currentTask, setCurrentTask]);

  const getPrompt = () => {
    switch (currentTask) {
      case 1: return exam?.parts?.part1?.question || "General questions about yourself.";
      case 2: return exam?.parts?.part2?.cueCard || "Describe a person who has influenced you.";
      case 3: return exam?.parts?.part3?.discussion || "Discuss the influence of people in society.";
      default: return "Loading...";
    }
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  // Logic: Only provide the function if we are below Part 3
  const handleNext = currentTask < 3 ? () => setCurrentTask(prev => prev + 1) : null;
  // Logic: Only provide the function if we are above Part 1
  const handlePrevious = currentTask > 1 ? () => setCurrentTask(prev => prev - 1) : null;

  return (
    <ExamLayout 
      title={`IELTS Speaking | Part ${currentTask}`} 
      onExit={() => navigate('/ielts/speaking/exams')}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onSubmit={() => { alert("Submitting Speaking Test..."); navigate('/dashboard'); }}
    >
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
        <section style={{ backgroundColor: '#f8f9fa', padding: '15px', border: '1px solid #ddd', marginBottom: '20px' }}>
          <h4>Instructions</h4>
          <p>Read the prompt carefully, prepare your answer, and record your response.</p>
        </section>

        <section style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
          <h3>Part {currentTask} Prompt</h3>
          <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>{getPrompt()}</p>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #eee' }}>
            <h4>Preparation Timer</h4>
            <p>00:00</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #eee' }}>
            <h4>Speaking Timer</h4>
            <p>00:00</p>
          </div>
        </section>

        <section style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f1f1f1' }}>
          <button 
            onClick={isRecording ? stopRecording : startRecording} 
            style={{ padding: '15px 30px', backgroundColor: isRecording ? '#dc3545' : '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
        </section>
      </div>
    </ExamLayout>
  );
};

export default SpeakingEditor;