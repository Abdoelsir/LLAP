import React, { useState, useEffect } from 'react';
import { AssessmentService } from '../services/AssessmentService';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import Heatmap from './Heatmap';
import TeachingPriorityPanel from './TeachingPriorityPanel';
import PerformanceDistribution from './PerformanceDistribution';
import LearningObjectiveAnalytics from './LearningObjectiveAnalytics';
import CohortComparison from './CohortComparison'; // Ensure this file exists in src/components/

/**
 * Branded PDF Generator with Institutional Logo/Symbols
 */
export const generateTeacherReportPDF = (classData) => {
  const doc = new jsPDF();
  const dateGenerated = new Date().toLocaleDateString();

  const renderLogo = () => {
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("LLAP | ACADEMY", 14, 20);
    doc.setFont("helvetica", "normal");
  };

  renderLogo();
  
  doc.setFontSize(12);
  doc.text("Language Learning Academy Platform", 14, 30);
  doc.setFontSize(10);
  doc.text("Professional IELTS Preparation System", 14, 36);
  doc.text("Learn • Communicate • Succeed", 14, 42);
  
  doc.setFontSize(10);
  doc.text(`Teacher: Mrs. Shahd Abulila`, 150, 20);
  doc.text(`Date Generated: ${dateGenerated}`, 150, 26);
  doc.line(14, 48, 196, 48);

  doc.setFontSize(16);
  doc.text("Teacher Analytics Report", 14, 60);
  autoTable(doc, {
    startY: 65,
    head: [['Metric', 'Value']],
    body: [
      ['Class Average Band', classData.averageBand],
      ['Completion Rate', `${classData.completionRate}%`],
      ['Top Weakness', classData.topWeakness]
    ],
    theme: 'striped'
  });

  doc.addPage();
  doc.text("Student Performance Analysis", 14, 20);
  autoTable(doc, {
    startY: 25,
    head: [['Student', 'Band', 'Progression']],
    body: classData.students.map(s => [s.name, s.band, `${s.progression}%`]),
    didParseCell: (data) => {
      if (data.column.index === 1 && data.cell.section === 'body') {
        const band = parseFloat(data.cell.raw);
        if (band < 5.0) data.cell.styles.textColor = [255, 0, 0];
        else if (band < 6.5) data.cell.styles.textColor = [204, 204, 0];
        else data.cell.styles.textColor = [0, 128, 0];
      }
    }
  });

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text("Confidential Academic Report | Page " + i + " of " + pageCount, 14, 290);
  }

  doc.save(`LLAP_TeacherAnalytics_Report_${dateGenerated.replace(/\//g, '-')}.pdf`);
};

const TeacherDashboard = () => {
  const [classData, setClassData] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null); // State for individual student report drill-down

  useEffect(() => {
    const data = AssessmentService.getClassAnalytics();
    setClassData(data);
  }, []);

  const exportExcel = () => {
    const overviewData = [
      { Metric: "Teacher", Value: "Mrs. Shahd Abulila" },
      { Metric: "Average Band", Value: classData.averageBand },
      { Metric: "Participation", Value: `${classData.completionRate}%` },
      { Metric: "Top Weakness", Value: classData.topWeakness }
    ];
    
    const studentData = classData.students.map(s => ({
      Student: s.name,
      Band: s.band,
      Progression: `${s.progression}%`
    }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(overviewData), "Overview");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(studentData), "Student Performance");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([]), "Question Analysis");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([]), "Skill Analysis");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([]), "Recommendations");

    XLSX.writeFile(workbook, `LLAP_ClassAnalytics_${new Date().getFullYear()}.xlsx`);
  };

  if (!classData) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1>Teacher Analytics Dashboard</h1>
      
      <div style={styles.actions}>
        <button onClick={() => generateTeacherReportPDF(classData)} style={styles.btn}>Export PDF</button>
        <button onClick={exportExcel} style={styles.btn}>Export Excel</button>
      </div>

      <section style={styles.card}>
        <h2>Class Performance Overview</h2>
        <div style={styles.grid}>
          <div style={styles.metric}><h3>Class Average</h3><p>{classData.averageBand}</p></div>
          <div style={styles.metric}><h3>Participation</h3><p>{classData.completionRate}%</p></div>
          <div style={styles.metric}><h3>Top Weakness</h3><p>{classData.topWeakness}</p></div>
        </div>
      </section>

      {/* Analytics Suite - Phase 2 Finalized */}
      <TeachingPriorityPanel heatmapData={classData.heatmapData} />
      <Heatmap data={classData.heatmapData} />
      <PerformanceDistribution 
        bandDistribution={classData.bandDistribution} 
        skillAverages={classData.skillAverages} 
      />
      <LearningObjectiveAnalytics data={classData.objectiveAnalytics} />
      <CohortComparison data={classData.cohortComparisonData} />

      {/* Student Roster & Individual Report Drill-Down Trigger */}
      <section style={styles.card}>
        <h2>Student Comparison & Individual Reports</h2>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
          Click on any student row to inspect their individual Reading results, passage breakdown, and instructions.
        </p>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Student</th>
              <th style={styles.th}>Estimated Band</th>
              <th style={styles.th}>Progression</th>
              <th style={styles.th, { textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {classData.students.map(student => (
              <tr 
                key={student.id} 
                onClick={() => setSelectedStudent(student)}
                style={{ cursor: 'pointer' }}
                className="hover:bg-gray-50"
              >
                <td style={{ ...styles.td, color: '#2196f3', fontWeight: 'bold', textDecoration: 'underline' }}>{student.name}</td>
                <td style={styles.td}>{student.band}</td>
                <td style={styles.td}>{student.progression}%</td>
                <td style={{ ...styles.td, textAlign: 'right' }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedStudent(student); }}
                    style={{ ...styles.btn, padding: '5px 12px', fontSize: '12px' }}
                  >
                    View Reading Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Individual Student Reading Report Modal with Passage No & Instructions */}
      {selectedStudent && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '15px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '18px' }}>Individual Reading Report: {selectedStudent.name}</h2>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>IELTS Academic Reading Mock Test 1 - Student Performance Breakdown</p>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                &times;
              </button>
            </div>

            {/* Score Overview */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              <div style={{ background: '#e3f2fd', padding: '12px', borderRadius: '6px' }}>
                <p style={{ margin: 0, fontSize: '11px', color: '#1565c0', fontWeight: 'bold' }}>ESTIMATED READING BAND</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '22px', fontWeight: 'bold', color: '#0d47a1' }}>{selectedStudent.band}.0</p>
              </div>
              <div style={{ background: '#e8f5e9', padding: '12px', borderRadius: '6px' }}>
                <p style={{ margin: 0, fontSize: '11px', color: '#2e7d32', fontWeight: 'bold' }}>RAW SCORE ACHIEVED</p>
                <p style={{ margin: '5px 0 0 0', fontSize: '22px', fontWeight: 'bold', color: '#1b5e20' }}>32 / 40</p>
              </div>
            </div>

            {/* Passage Breakdown with Passage No & Instructions */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '15px', marginBottom: '10px', color: '#333' }}>Passage-Level Breakdown & Instructions</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ border: '1px solid #e0e0e0', padding: '10px', borderRadius: '6px', background: '#fafafa' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>
                    <span>Passage No: 1 (Questions 1–13)</span>
                    <span style={{ color: '#2e7d32' }}>11 / 13 Correct (84%)</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '12px', color: '#555', fontStyle: 'italic' }}>
                    <strong>Passage Instructions:</strong> Read the text below and answer Questions 1–13. Choose TRUE, FALSE, or NOT GIVEN.
                  </p>
                </div>

                <div style={{ border: '1px solid #e0e0e0', padding: '10px', borderRadius: '6px', background: '#fafafa' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>
                    <span>Passage No: 2 (Questions 14–26)</span>
                    <span style={{ color: '#1565c0' }}>10 / 13 Correct (77%)</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '12px', color: '#555', fontStyle: 'italic' }}>
                    <strong>Passage Instructions:</strong> Read Passage 2 and answer Questions 14–26. Match headings to the appropriate paragraphs.
                  </p>
                </div>

                <div style={{ border: '1px solid #e0e0e0', padding: '10px', borderRadius: '6px', background: '#fafafa' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '13px', marginBottom: '4px' }}>
                    <span>Passage No: 3 (Questions 27–40)</span>
                    <span style={{ color: '#e65100' }}>11 / 14 Correct (78%)</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '12px', color: '#555', fontStyle: 'italic' }}>
                    <strong>Passage Instructions:</strong> Read Passage 3 and answer Questions 27–40. Complete sentences using NO MORE THAN TWO WORDS.
                  </p>
                </div>
              </div>
            </div>

            {/* Question-Level Sample Audit */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '15px', marginBottom: '8px', color: '#333' }}>Question-Level Item Audit (Sample)</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ background: '#f5f5f5' }}>
                    <th style={{ padding: '6px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Q#</th>
                    <th style={{ padding: '6px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Type</th>
                    <th style={{ padding: '6px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Student Answer</th>
                    <th style={{ padding: '6px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Correct Answer</th>
                    <th style={{ padding: '6px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '6px', borderBottom: '1px solid #eee' }}>Q7</td>
                    <td style={{ padding: '6px', borderBottom: '1px solid #eee' }}>Matching Headings</td>
                    <td style={{ padding: '6px', borderBottom: '1px solid #eee', color: 'red' }}>C</td>
                    <td style={{ padding: '6px', borderBottom: '1px solid #eee', color: 'green' }}>B</td>
                    <td style={{ padding: '6px', borderBottom: '1px solid #eee' }}><span style={{ background: '#ffebee', color: '#c62828', padding: '2px 6px', borderRadius: '4px' }}>Incorrect</span></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px', borderBottom: '1px solid #eee' }}>Q18</td>
                    <td style={{ padding: '6px', borderBottom: '1px solid #eee' }}>TFNG</td>
                    <td style={{ padding: '6px', borderBottom: '1px solid #eee', color: 'green' }}>TRUE</td>
                    <td style={{ padding: '6px', borderBottom: '1px solid #eee', color: 'green' }}>TRUE</td>
                    <td style={{ padding: '6px', borderBottom: '1px solid #eee' }}><span style={{ background: '#e8f5e9', color: '#2e7d32', padding: '2px 6px', borderRadius: '4px' }}>Correct</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setSelectedStudent(null)}
                style={{ ...styles.btn, backgroundColor: '#424242' }}
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif' },
  card: { border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#fff' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  th: { borderBottom: '2px solid #ddd', padding: '8px', textAlign: 'left' },
  td: { borderBottom: '1px solid #eee', padding: '8px' },
  metric: { textAlign: 'center' },
  actions: { marginBottom: '20px', display: 'flex', gap: '10px' },
  btn: { padding: '10px 20px', cursor: 'pointer', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: '4px' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' },
  modalContent: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '650px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }
};

export default TeacherDashboard;