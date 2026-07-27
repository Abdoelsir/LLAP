// src/data/writingSubmissions.js

export const writingSubmissions = {
  "WR-001-ST-2026": {
    taskDetails: {
      taskType: "Writing Task 2",
      prompt: "Some people believe that...",
      minWordCount: 250,
      timeLimit: 40
    },
    content: {
      studentText: "The impact of technology on education is profound...", // Student input
      wordCount: 265
    },
    assessment: {
      rubric: {
        taskResponse: { band: 7.0, feedback: "Clear position, but needs more supporting evidence." },
        coherence: { band: 6.5, feedback: "Good paragraphing, but linking words are repetitive." },
        lexicalResource: { band: 7.5, feedback: "Excellent range of academic vocabulary." },
        grammar: { band: 6.5, feedback: "Mostly accurate, but limited sentence variety." }
      },
      overallBand: 6.9,
      teacherComments: "Well done, focus on using more complex sentence structures.",
      recommendedLessons: ["Grammar-L4", "Writing-L2"]
    }
  }
};