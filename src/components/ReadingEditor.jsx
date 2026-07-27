import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AssessmentService } from '../services/AssessmentService';
import ExamLayout from './ExamLayout';
import { useExam } from './ExamContext';
import { v4 as generateUUID } from 'uuid';
import QuestionGroupRenderer from './QuestionGroupRenderer';
import QuestionPalette from './QuestionPalette';
import { useAutoScroll } from '../hooks/useAutoScroll';
import { useKeyboardNav } from '../hooks/useKeyboardNav';

// Data Imports
import R1metadata from '../data/Reading1/R1metadata.json';
import R1passage1 from '../data/Reading1/R1passage1.json';
import R1passage2 from '../data/Reading1/R1passage2.json';
import R1passage3 from '../data/Reading1/R1passage3.json';
import R1answerKey from '../data/Reading1/R1answerKey.json';
import R1validation from '../data/Reading1/validation.json'; 

const ReadingEditor = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  const { answers, setTimeLeft, setIsExamStarted, activeQuestionId, setActiveQuestionId } = useExam();
  
  useAutoScroll(activeQuestionId);
  
  const [exam, setExam] = useState(null);
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [examStatus, setExamStatus] = useState("IN_PROGRESS");

  const handlePrevious = () => {
    if (examStatus === "IN_PROGRESS" && currentPassageIndex > 0) {
      setCurrentPassageIndex(currentPassageIndex - 1);
    }
  };

  const handleNext = () => {
    if (examStatus !== "IN_PROGRESS") return;
    if (exam && currentPassageIndex < exam.passages.length - 1) {
      setCurrentPassageIndex(currentPassageIndex + 1);
    } else {
      alert("You are on the final passage.");
    }
  };

  const handleJumpTo = (id) => {
    setActiveQuestionId(id); 
  };

  useKeyboardNav(
    exam && currentPassageIndex < exam.passages.length - 1 ? handleNext : null,
    currentPassageIndex > 0 ? handlePrevious : null
  );

  useEffect(() => {
    try {
      if (R1validation && R1validation.status === "PASS") {
        setExam({
          ...R1metadata,
          passages: [R1passage1, R1passage2, R1passage3],
          answerKey: R1answerKey
        });
      } else {
        console.error("Exam package integrity check failed.");
        alert("System Error: Exam content validation failed.");
      }
    } catch (err) {
      console.error("Failed to load R1 data modules:", err);
    }
  }, []);

  const handleSubmit = async () => {
    if (examStatus === "SUBMITTED") return;
    if (!window.confirm("Submit Examination? This cannot be undone.")) return;

    try {
      setIsExamStarted(false);
      setTimeLeft(0);
      const submissionData = {
        submissionId: generateUUID(),
        examId: exam.examId,
        answers: answers,
        status: "SUBMITTED"
      };
      await AssessmentService.secureSubmit(submissionData);
      localStorage.clear();
      setExamStatus("SUBMITTED");
      navigate(`/dashboard/results/${submissionData.submissionId}`);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed.");
    }
  };

  const handleExit = () => {
    if (window.confirm("Are you sure? Your progress is saved, but you will be returned to the dashboard.")) {
      navigate('/dashboard');
    }
  };

  if (!exam) return <div>Loading and Validating Reading Exam content...</div>;

  const passage = exam.passages[currentPassageIndex];

  // Scoped calculation: Extract ONLY questions for the active passage
  const currentPassageQuestions = passage?.groups?.flatMap(g => g.questions) || [];

  return (
    <ExamLayout 
      title={`IELTS Academic | ${exam.title}`} 
      onExit={handleExit}
      onNext={currentPassageIndex < exam.passages.length - 1 ? handleNext : null}
      onPrevious={currentPassageIndex > 0 ? handlePrevious : null}
      onSubmit={handleSubmit}
    >
      <div style={{ padding: '20px' }}>
        {/* Render Official IELTS CBT Headings and Instruction Banners */}
        {passage?.heading && (
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333', marginBottom: '8px', textTransform: 'uppercase' }}>
            {passage.heading}
          </h2>
        )}
        {passage?.instructionBanner && (
          <p style={{ fontStyle: 'italic', color: '#555', marginBottom: '15px', fontSize: '0.95rem' }}>
            {passage.instructionBanner}
          </p>
        )}

        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px' }}>
          {passage?.title || "Loading..."}
        </h3>
        <p style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
          {passage?.text || ""}
        </p>
      </div>

      <div style={{ padding: '20px' }}>
        <h4>Questions</h4>
        <QuestionPalette 
          questions={currentPassageQuestions} 
          onJumpToQuestion={handleJumpTo} 
        />
        {passage?.groups?.map((group) => (
          <QuestionGroupRenderer key={group.groupId} group={group} />
        ))}
      </div>
    </ExamLayout>
  );
};

export default ReadingEditor;