import React, { createContext, useContext, useState, useEffect } from 'react';
import { AssessmentService } from '../services/AssessmentService';
import { v4 as generateUUID } from 'uuid';

const ExamContext = createContext(null);

export const ExamProvider = ({ children }) => {
  // Initialize state with data from localStorage
  const [answers, setAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem('llap_exam_answers') || localStorage.getItem('exam_answers');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Failed to parse answers from storage", e);
      return {};
    }
  });

  const [flags, setFlags] = useState(() => {
    try {
      const saved = localStorage.getItem('exam_flags');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse flags from storage", e);
      return [];
    }
  });

  // 60 minutes = 3600 seconds. Check localStorage for persistence across page refreshes.
  // Fix: If savedTime is 0 or invalid while restarting, fallback safely or handle expiration.
  const [timeLeft, setTimeLeft] = useState(() => {
    try {
      const savedTime = localStorage.getItem('llap_exam_time_left') || localStorage.getItem('exam_time');
      const parsed = savedTime !== null ? parseInt(savedTime, 10) : 3600;
      return parsed > 0 ? parsed : 3600;
    } catch {
      return 3600;
    }
  });

  const [currentTask, setCurrentTask] = useState(() => {
    try {
      const saved = localStorage.getItem('exam_task');
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  const [isExamStarted, setIsExamStarted] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState(null);

  // Persist exam states to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('llap_exam_answers', JSON.stringify(answers));
      localStorage.setItem('exam_answers', JSON.stringify(answers));
      localStorage.setItem('exam_flags', JSON.stringify(flags));
      localStorage.setItem('llap_exam_time_left', timeLeft.toString());
      localStorage.setItem('exam_time', timeLeft.toString());
      localStorage.setItem('exam_task', currentTask.toString());
    } catch (err) {
      console.error("Failed to persist exam state:", err);
    }
  }, [answers, flags, timeLeft, currentTask]);

  // Timer Countdown Effect with rigorous interval management
  useEffect(() => {
    if (!isExamStarted || isSubmitted) return;
    
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isExamStarted, isSubmitted, timeLeft]);

  // Trigger auto-submit separately when timeLeft hits 0 to prevent state race conditions
  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted && isExamStarted) {
      handleAutoSubmit();
    }
  }, [timeLeft, isSubmitted, isExamStarted]);

  // Deterministic Auto-Submission when timer reaches 00:00
  const handleAutoSubmit = async () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    setIsExamStarted(false);

    try {
      const submissionData = {
        submissionId: generateUUID(),
        examId: "Reading-01",
        answers: answers,
        status: "AUTO_SUBMITTED_TIME_EXPIRED"
      };
      
      await AssessmentService.secureSubmit(submissionData);
      localStorage.clear();
      alert("Time is up! Your examination has been automatically submitted.");
      window.location.href = `/dashboard/results/${submissionData.submissionId}`;
    } catch (error) {
      console.error("Auto-submission error:", error);
      alert("Time expired, but automatic submission failed. Please contact your proctor.");
    }
  };

  // Handler for updating answers in state (locked if submitted)
  const updateAnswer = (questionId, value) => {
    if (isSubmitted || timeLeft <= 0) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Handler for toggling question flags
  const toggleFlag = (questionId) => {
    if (isSubmitted) return;
    setFlags(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId) 
        : [...prev, questionId]
    );
  };

  return (
    <ExamContext.Provider 
      value={{
        answers,
        updateAnswer,
        flags,
        toggleFlag,
        timeLeft,
        setTimeLeft,
        currentTask,
        setCurrentTask,
        isExamStarted,
        setIsExamStarted,
        activeQuestionId,
        setActiveQuestionId,
        isSubmitted
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
};