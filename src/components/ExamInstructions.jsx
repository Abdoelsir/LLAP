import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExam } from './ExamContext'; // Import context to access exam state

const ExamInstructions = () => {
  const { skill, examId } = useParams();
  const navigate = useNavigate();
  const { setIsExamStarted } = useExam(); // Extract the starter function

  // EQA Requirement: Multi-step confirmation state
  const [confirmations, setConfirmations] = useState({
    readInstructions: false,
    timerUnderstand: false,
    autoSubmitUnderstand: false
  });

  // Verify all acknowledgments are checked
  const allConfirmed = Object.values(confirmations).every(Boolean);

  const startExam = () => {
    // Audit Note: Initialize exam timer state before navigation
    setIsExamStarted(true); 

    if (skill === 'writing') {
      navigate(`/ielts/writing/editor/${examId}`);
    } else {
      navigate(`/ielts/${skill}/exams/active/${examId}`);
    }
  };

  const config = {
    listening: {
      time: "30 mins",
      tasks: "40 Questions",
      instructions: [
        'The timer will begin immediately when you click "Start Test".',
        'You will hear each recording ONLY ONCE.',
        'Read the questions before and while listening.',
        'Click "Submit Test" before the timer reaches zero.'
      ],
      preCheck: ['Headphones required']
    },
    reading: {
      time: "60 minutes",
      tasks: "40 Questions",
      instructions: [
        'The Reading test contains THREE passages.',
        'Read each passage carefully before answering.',
        'You may move freely between passages and questions.',
        'Click "Submit Test" before the timer expires.'
      ],
      preCheck: []
    },
    writing: {
      time: "60 minutes",
      tasks: "2 Tasks",
      instructions: [
        'Complete BOTH Task 1 and Task 2.',
        'Spend approx. 20 mins on Task 1 and 40 mins on Task 2.',
        'Your work is automatically saved during the test.',
        'Click "Submit Test" before the timer expires.'
      ],
      preCheck: []
    },
    speaking: {
      time: "11–14 minutes",
      tasks: "3 Parts",
      instructions: [
        'The test contains THREE parts: Introduction, Long Turn, and Discussion.',
        'Speak naturally and clearly.',
        'Your responses will be recorded automatically.',
        'Click "Submit Test" after completing Part 3.'
      ],
      preCheck: ['Microphone required']
    }
  };

  const currentConfig = config[skill] || { time: "N/A", tasks: "N/A", instructions: [], preCheck: [] };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif', border: '1px solid #ddd', borderRadius: '8px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: '0' }}>LLAP</h1>
        <h3 style={{ margin: '5px 0' }}>IELTS Academic Mock Examination</h3>
      </div>
      <hr />
      
      <div style={{ margin: '20px 0' }}>
        <h4 style={{ marginBottom: '10px' }}>📘 Test Information</h4>
        <p><strong>Skill:</strong> {skill.charAt(0).toUpperCase() + skill.slice(1)}</p>
        <p><strong>Time:</strong> {currentConfig.time}</p>
        <p><strong>Number of Questions/Tasks:</strong> {currentConfig.tasks}</p>
      </div>
      <hr />

      <div style={{ margin: '20px 0' }}>
        <h4 style={{ marginBottom: '10px' }}>📋 Instructions</h4>
        <ul style={{ paddingLeft: '20px' }}>
          {currentConfig.instructions.map((item, idx) => <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>)}
        </ul>
      </div>

      <div style={{ margin: '20px 0', backgroundColor: '#fff3cd', padding: '15px', borderRadius: '5px' }}>
        <h4 style={{ marginTop: '0', color: '#856404' }}>⚠ Before You Begin</h4>
        <ul style={{ paddingLeft: '20px', margin: '0' }}>
          <li>✔ Stable internet connection</li>
          <li>✔ Do not refresh the browser</li>
          <li>✔ Full-screen mode recommended</li>
          {currentConfig.preCheck.map((check, idx) => <li key={idx}>✔ {check}</li>)}
        </ul>
      </div>

      <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #007bff', borderRadius: '5px', backgroundColor: '#e7f1ff' }}>
        <h4 style={{ marginTop: 0 }}>Candidate Certification</h4>
        {[
          { key: 'readInstructions', label: 'I have read and understood the examination instructions.' },
          { key: 'timerUnderstand', label: 'I understand that the timer begins immediately upon clicking "Start Test".' },
          { key: 'autoSubmitUnderstand', label: 'I understand that my answers will be submitted automatically when time expires.' }
        ].map((item) => (
          <label key={item.key} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }}>
            <input 
              type="checkbox" 
              checked={confirmations[item.key]} 
              onChange={(e) => setConfirmations(prev => ({ ...prev, [item.key]: e.target.checked }))} 
              style={{ marginRight: '10px', transform: 'scale(1.2)' }}
            />
            {item.label}
          </label>
        ))}
      </div>

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button onClick={() => navigate(`/ielts/${skill}/exams`)} style={{ padding: '10px 20px', cursor: 'pointer' }}>Back to Exam List</button>
        <button 
          onClick={startExam} 
          disabled={!allConfirmed}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: allConfirmed ? '#007bff' : '#ccc', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: allConfirmed ? 'pointer' : 'not-allowed', 
            fontWeight: 'bold' 
          }}
        >
          Start Test
        </button>
      </div>
    </div>
  );
};

export default ExamInstructions;