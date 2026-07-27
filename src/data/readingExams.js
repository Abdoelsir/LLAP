// src/data/readingExams.js

export const readingExams = {
  "R-001": {
    title: "Academic Reading Mock Test 1",
    passages: [
      {
        id: "p1",
        title: "Passage 1: Human Interest",
        content: "Content for passage 1 (Approximately 850 words)...",
        questions: [
          {
            questionId: "P1Q1",
            type: "MULTIPLE_CHOICE",
            learningObjective: "Identify main idea",
            difficulty: "B2",
            question: "What is the main purpose of the text?",
            options: ["A. To inform", "B. To persuade", "C. To entertain", "D. To criticize"],
            correctAnswer: "A"
          }
        ]
      },
      {
        id: "p2",
        title: "Passage 2: Technology",
        content: "Content for passage 2 (Approximately 950 words)...",
        questions: [
          {
            questionId: "P2Q1",
            type: "TRUE_FALSE_NOT_GIVEN",
            learningObjective: "Scanning",
            difficulty: "B2",
            question: "The new technology is cost-effective.",
            correctAnswer: "TRUE"
          }
        ]
      },
      {
        id: "p3",
        title: "Passage 3: Psychology",
        content: "Content for passage 3 (Approximately 1100 words)...",
        questions: [
          {
            questionId: "P3Q1",
            type: "MATCHING_HEADINGS",
            learningObjective: "Inference",
            difficulty: "C1",
            question: "Which heading best describes paragraph 1?",
            options: ["i. The impact", "ii. The history", "iii. The results"],
            correctAnswer: "iii"
          }
        ]
      }
    ]
  }
};