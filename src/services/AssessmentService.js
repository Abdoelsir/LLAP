import { exams } from '../data/exams';
import { writingSubmissions } from '../data/writingSubmissions';
import { readingExams } from '../data/readingExams';
import { speakingExams } from '../data/speakingExams';
import { scoringTables } from '../data/scoringTables';

// Simulated database state for lock validation
const examDatabase = new Map();

/**
 * AssessmentService: The Unified Data Pipeline for LLAP
 */
export const AssessmentService = {
  
  secureSubmit: async (submissionData) => {
    const existingStatus = examDatabase.get(submissionData.examId)?.status;

    if (existingStatus === 'SUBMITTED') {
      const error = new Error("Duplicate submission or exam already locked.");
      error.response = { status: 409 };
      throw error;
    }

    examDatabase.set(submissionData.examId, {
      ...submissionData,
      status: 'SUBMITTED'
    });

    console.log(`Exam ${submissionData.examId} permanently locked.`);

    return { status: 200, message: "Submission successful and locked." };
  },

  // 1. Objective Assessment Engine
  getMockExam: (examId) => exams,

  // 2. Writing Assessment Engine
  getWritingAssessment: (submissionId) => writingSubmissions[submissionId] || null,

  // 3. Reading Assessment Engine
  getReadingExam: (examId) => readingExams[examId],

  // 4. Speaking Assessment Engine
  getSpeakingExam: (examId) => speakingExams[examId],

  // 5. Listening Assessment Engine
  getListeningMetadata: (examId) => ({
    examId: examId,
    title: "IELTS Listening Mock Test 1",
    audioFile: "/assets/audio/mock001_part1.mp3",
    questions: [
      { id: 1, text: "What is the name of the hotel?" },
      { id: 2, text: "How many guests are staying?" },
      { id: 3, text: "What is the primary request?" },
      { id: 4, text: "What date is requested?" },
      { id: 5, text: "How will the guest pay?" }
    ]
  }),

  // 6. Exam Metadata for Instructional Bridge
  getExamMetadata: (skill, examId) => ({
    title: `${skill.charAt(0).toUpperCase() + skill.slice(1)} Academic Mock Test ${examId}`,
    duration: skill === 'listening' ? '30 Minutes' : '60 Minutes',
    tasks: skill === 'writing' ? 'Task 1 & Task 2' : '40 Questions',
    description: `Prepare for your ${skill} assessment with this official mock exam.`
  }),

  /**
   * 7. Analytics: Scoring & Performance
   */
  calculateBandScore: (rawScore, skill) => {
    if (skill === 'writing' || skill === 'speaking') {
      return { band: null, descriptor: "Criterion-based assessment required." };
    }

    const table = scoringTables[skill];
    if (!table || !table.conversion) return { band: 0, descriptor: "N/A" };
    
    const sortedConversion = [...table.conversion].sort((a, b) => b.raw - a.raw);
    const result = sortedConversion.find(item => rawScore >= item.raw);
    
    const band = result ? result.band : 0;
    
    return {
      band: band,
      descriptor: scoringTables.bandDescriptors[String(band)] || "No descriptor available."
    };
  },

  calculateOverallBand: (rubric) => {
    const scores = Object.values(rubric).map(item => item.band);
    const sum = scores.reduce((a, b) => a + b, 0);
    return (sum / scores.length).toFixed(1);
  },

  calculateReadingAccuracy: (userResults) => {
    return userResults.reduce((acc, res) => {
      acc[res.type] = (acc[res.type] || 0) + (res.isCorrect ? 1 : 0);
      return acc;
    }, {});
  },

  // 8. Speaking Assessment Rubric
  storeSpeakingEvaluation: (examId, studentId, rubric) => {
    console.log(`Saving Speaking evaluation for Exam ${examId}:`, rubric);
    return true;
  },

  // 9. Pipeline Validation: Submission Audit Log
  recordSubmissionAudit: (data) => {
    const logEntry = {
      submissionId: Date.now(),
      studentId: data.studentId || "anonymous",
      skill: data.skill,
      timestamp: new Date().toISOString(),
      rawScore: data.rawScore,
      calculatedBand: data.band,
      mode: data.mode || 'MockExam',
      status: 'Success'
    };
    console.log("Assessment Pipeline Audit Entry:", logEntry);
    return logEntry;
  },

  // 10. Teacher Analytics Engine (Fully Integrated Phase 2.5)
  getClassAnalytics: () => {
    return {
      averageBand: "6.5",
      completionRate: 85,
      topWeakness: "Writing Task 2",
      students: [
        { id: 1, name: "Student A", band: 6.0, progression: 10 },
        { id: 2, name: "Student B", band: 7.0, progression: 15 }
      ],
      // Heatmap Metadata
      heatmapData: [
        {
          id: "Q7",
          type: "Matching Headings",
          skill: "Reading",
          subSkill: "Skimming",
          objective: "Main Idea Identification",
          difficulty: "Hard",
          correctRate: 34,
          status: "Critical"
        },
        {
          id: "Q18",
          type: "True / False / Not Given",
          skill: "Reading",
          subSkill: "Detail Reading",
          objective: "Factual Verification",
          difficulty: "Medium",
          correctRate: 58,
          status: "Needs Review"
        }
      ],
      // Distribution Data
      bandDistribution: {
        "8-9": 2,
        "7": 5,
        "6": 8,
        "5": 3
      },
      skillAverages: {
        Listening: 7.0,
        Reading: 6.5,
        Writing: 6.0,
        Speaking: 6.5
      },
      // Learning Objective Analytics
      objectiveAnalytics: [
        { objective: "Skimming", accuracy: 48, recommendation: "Review Module 3" },
        { objective: "Scanning", accuracy: 72, recommendation: "Practice Set 2" },
        { objective: "Identifying Writer's Opinion", accuracy: 41, recommendation: "Module 5" }
      ],
      // Phase 2.5: Cohort Comparison
      cohortComparisonData: [
        { metric: "Average Band", current: 6.5, previous: 6.2 },
        { metric: "Completion Rate", current: 85, previous: 78 },
        { metric: "Writing Proficiency", current: 6.0, previous: 5.8 }
      ]
    };
  }
};