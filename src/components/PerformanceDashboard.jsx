import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AssessmentService } from '../services/AssessmentService';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PerformanceDashboard = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('summary');
  const [submission, setSubmission] = useState(null);

  // Diagnostic useEffect to fetch and log performance data
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await AssessmentService.getWritingAssessment(submissionId);
        console.log("Dashboard Data Received:", data);
        setSubmission(data);
      } catch (err) {
        console.error("Data Fetch Error:", err);
      }
    };

    fetchResults();
  }, [submissionId]);

  if (!submission) return <div>Loading Advanced Analytics...</div>;

  // Diagnostic Metrics
  const correct = submission.results.filter(q => q.isCorrect).length;
  const incorrect = submission.results.filter(q => !q.isCorrect).length;
  const unanswered = submission.totalQuestions - (correct + incorrect);
  const avgTimePerQuestion = (submission.duration / (submission.totalQuestions || 1)).toFixed(1);

  // Skill Breakdown Engine
  const getSkillAnalysis = (results) => {
    if (!results || !Array.isArray(results)) return [];
    const breakdown = results.reduce((acc, q) => {
      if (!acc[q.subSkill]) acc[q.subSkill] = { total: 0, correct: 0 };
      acc[q.subSkill].total += 1;
      if (q.isCorrect) acc[q.subSkill].correct += 1;
      return acc;
    }, {});
    
    return Object.keys(breakdown).map(skill => {
      const accuracy = (breakdown[skill].correct / breakdown[skill].total) * 100;
      let status = "Needs Practice";
      if (accuracy >= 85) status = "Excellent";
      else if (accuracy >= 70) status = "Good";
      else if (accuracy >= 50) status = "Developing";
      return { skill, accuracy: accuracy.toFixed(0), status };
    });
  };

  const skillData = getSkillAnalysis(submission.results || []);
  const bandPercentage = (submission.band / 9) * 100;

  // Phase 4.4: PDF Export Utility
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Performance Report: ${submission.studentName}`, 14, 20);
    doc.setFontSize(12);
    doc.text(`Exam: ${submission.examTitle} | Band: ${submission.band}`, 14, 30);
    
    const tableData = skillData.map(s => [s.skill, `${s.accuracy}%`, s.status]);
    doc.autoTable({
      startY: 40,
      head: [['Skill', 'Accuracy', 'Status']],
      body: tableData,
    });
    
    doc.save(`${submission.studentName}_Performance_Report.pdf`);
  };

  return (
    <div style={styles.container}>
      <h1>Performance Report</h1>

      {/* Navigation Tabs */}
      <div style={styles.tabs}>
        <button style={activeTab === 'summary' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('summary')}>Summary</button>
        <button style={activeTab === 'review' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('review')}>Review Incorrect Answers</button>
        <button style={styles.exportBtn} onClick={generatePDF}>Download PDF Report</button>
      </div>

      {activeTab === 'summary' ? (
        <>
          <section style={styles.card}>
            <h2>Performance Overview</h2>
            <div style={styles.gaugeContainer}>
              <h3 style={{ margin: '0 0 10px 0' }}>Overall Band Score: {submission.band}</h3>
              <div style={styles.gaugeBackground}>
                <div style={{ ...styles.gaugeFill, width: `${bandPercentage}%` }} />
              </div>
            </div>
            <div style={styles.grid}>
              <p><strong>Correct:</strong> {correct}</p>
              <p><strong>Incorrect:</strong> {incorrect}</p>
              <p><strong>Unanswered:</strong> {unanswered}</p>
              <p><strong>Avg Time/Q:</strong> {avgTimePerQuestion}s</p>
            </div>
          </section>

          <section style={styles.card}>
            <h2>Skill Breakdown</h2>
            <table style={styles.table}>
              <thead><tr><th style={styles.th}>Skill</th><th style={styles.th}>Accuracy</th><th style={styles.th}>Status</th></tr></thead>
              <tbody>
                {skillData.map((data, idx) => (
                  <tr key={idx}><td style={styles.td}>{data.skill}</td><td style={styles.td}>{data.accuracy}%</td><td style={styles.td}>{data.status}</td></tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      ) : (
        <section style={styles.card}>
          <h2>Review Incorrect Answers</h2>
          {submission.results.filter(q => !q.isCorrect).map((q, idx) => (
            <div key={idx} style={styles.reviewItem}>
              <p><strong>Question {q.id}:</strong> {q.text}</p>
              <p><strong>Type:</strong> {q.questionType} | <strong>Objective:</strong> {q.objective}</p>
              <p>Your Answer: {q.userAnswer} | Correct: {q.correctAnswer}</p>
              <p><em>Explanation: {q.explanation}</em></p>
              <div style={styles.actionBox}>
                <p><strong>Recommended:</strong> {q.lessonTitle} (Module {q.lessonId})</p>
                <p><strong>Estimated Review:</strong> {q.estimatedTime} mins</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Next Step Action Panel */}
      <section style={styles.card}>
        <h2>What would you like to do next?</h2>
        <div style={styles.actionGrid}>
          <button onClick={() => setActiveTab('review')}>Review Incorrect Questions</button>
          <button onClick={() => navigate('/dashboard')}>Return to Dashboard</button>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
  card: { border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '20px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' },
  actionGrid: { display: 'flex', gap: '10px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  th: { borderBottom: '2px solid #ddd', padding: '8px', textAlign: 'left' },
  td: { borderBottom: '1px solid #eee', padding: '8px' },
  tabs: { marginBottom: '20px', display: 'flex', gap: '10px' },
  tab: { padding: '10px 20px', cursor: 'pointer' },
  activeTab: { padding: '10px 20px', cursor: 'pointer', backgroundColor: '#e0e0e0' },
  exportBtn: { padding: '10px 20px', cursor: 'pointer', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: '4px' },
  reviewItem: { borderBottom: '1px solid #eee', padding: '10px 0' },
  actionBox: { backgroundColor: '#f9f9f9', padding: '10px', marginTop: '5px' },
  gaugeContainer: { marginBottom: '20px' },
  gaugeBackground: { background: '#e0e0e0', borderRadius: '10px', height: '30px' },
  gaugeFill: { background: '#4caf50', height: '100%', borderRadius: '10px', transition: 'width 1s ease-in-out' }
};

export default PerformanceDashboard;