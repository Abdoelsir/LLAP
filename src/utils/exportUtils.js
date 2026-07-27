import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Refined PDF Generator for LLAP Institutional Reports
 * Exports branded academic reports with conditional formatting.
 */
export const generateTeacherReportPDF = (classData) => {
  const doc = new jsPDF();
  const dateGenerated = new Date().toLocaleDateString();

  // 1. Header & Institutional Branding
  doc.setFontSize(20);
  doc.text("LLAP", 14, 20);
  doc.setFontSize(12);
  doc.text("Language Learning Academy Platform", 14, 28);
  doc.text("Professional IELTS Preparation System", 14, 34);
  doc.text("Learn • Communicate • Succeed", 14, 40);
  
  // Header Meta
  doc.setFontSize(10);
  doc.text(`Teacher: Mrs. Shahd Abulila`, 150, 20);
  doc.text(`Date Generated: ${dateGenerated}`, 150, 26);
  doc.line(14, 45, 196, 45); // Decorative separator

  // 2. Class Overview Section
  doc.setFontSize(16);
  doc.text("Teacher Analytics Report", 14, 55);
  doc.autoTable({
    startY: 60,
    head: [['Metric', 'Value']],
    body: [
      ['Class Average Band', classData.averageBand],
      ['Completion Rate', `${classData.completionRate}%`],
      ['Top Weakness', classData.topWeakness]
    ],
    theme: 'striped'
  });

  // 3. Student Performance Section
  doc.addPage();
  doc.text("Student Performance Analysis", 14, 20);
  doc.autoTable({
    startY: 25,
    head: [['Student', 'Band', 'Progression']],
    body: classData.students.map(s => [s.name, s.band, `${s.progression}%`]),
    didParseCell: (data) => {
      // Color Indicator Logic (Red/Yellow/Green analysis)
      if (data.column.index === 1 && data.cell.section === 'body') {
        const band = parseFloat(data.cell.raw);
        if (band < 5.0) data.cell.styles.textColor = [255, 0, 0]; // Red
        else if (band < 6.5) data.cell.styles.textColor = [204, 204, 0]; // Yellow
        else data.cell.styles.textColor = [0, 128, 0]; // Green
      }
    }
  });

  // 4. Footer & Confidentiality
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text("Confidential Academic Report | Page " + i + " of " + pageCount, 14, 290);
  }

  doc.save(`LLAP_TeacherAnalytics_Report_${dateGenerated.replace(/\//g, '-')}.pdf`);
};