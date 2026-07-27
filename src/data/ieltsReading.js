// src/data/ieltsReading.js

// Exported as 'readingLessons' to synchronize with LessonLayout.jsx imports
export const readingLessons = {
  // Lesson objects for direct access by ID (used by LessonLayout)
  "1": {
    lessonId: "IELTS-R-001",
    title: "Skimming",
    objectives: ["Understand main ideas", "Identify topic sentences"],
    vocabulary: ["Skim", "Main idea", "Gist", "Topic sentence"],
    transcript: "Skimming is reading quickly to get a general idea...",
  },
  "2": {
    lessonId: "IELTS-R-002",
    title: "Scanning",
    objectives: ["Locate specific information", "Keywords identification"],
    vocabulary: ["Scan", "Keyword", "Detail", "Locate"],
    transcript: "Scanning is reading to find specific facts...",
  },

  // Module structure for the LessonsOverview dashboard
  modules: {
    "module1": {
      title: "Reading Strategies",
      lessons: [
        { id: 1, title: "Skimming" },
        { id: 2, title: "Scanning" }
      ]
    }
  }
};