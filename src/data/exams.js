// src/data/exams.js

export const exams = {
  "examMetadata": {
    "examId": "IELTS-L-MOCK-001",
    "version": "1.0",
    "createdDate": "2026-07-09",
    "updatedDate": "2026-07-09",
    "author": "Mrs. Shahd Abulila",
    "source": "Official IELTS-style Practice",
    "title": "IELTS Listening Mock Test 1",
    "skill": "Listening",
    "CEFRLevel": "B2",
    "IELTSBandTarget": "6.5-7.0",
    "totalDurationMinutes": 30,
    "instructions": "You will hear a number of different recordings...",
    "scoringRules": { "autoScore": true, "passingScore": 6.5 }
  },
  "examSettings": {
    "allowBackwardNavigation": false,
    "allowPause": true,
    "allowReplay": false,
    "showFeedbackImmediately": false,
    "isTimed": true,
    "autoSubmit": true,
    "shuffleQuestions": false
  },
  "audioMetadata": {
    "audioUrl": "/audio/mock001.mp3",
    "duration": "04:12",
    "accent": "British",
    "speakerCount": 2,
    "playLimit": 1,
    "transcript": "Full transcript text here..."
  },
  "sections": [
    {
      "sectionId": 1,
      "title": "Part 1: Everyday Conversations",
      "questions": [
        {
          "questionId": "Q1",
          "type": "multiple-choice",
          "text": "What is the primary reason for the call?",
          "options": ["Booking a hotel", "Ordering food", "Changing a flight"],
          "correctAnswer": "Ordering food",
          "marks": 1,
          "difficulty": "Easy",
          "audioTimestamp": "00:35",
          "tags": ["reservation", "detail"],
          "learningObjective": "Identifying main idea",
          "explanation": "The caller states they are calling about dinner."
        },
        {
          "questionId": "Q2",
          "type": "note-completion",
          "text": "The reservation is for ______ people.",
          "correctAnswer": "four",
          "marks": 1,
          "difficulty": "Easy",
          "audioTimestamp": "00:45",
          "tags": ["numbers"],
          "learningObjective": "Identifying numerical detail",
          "explanation": "The caller says: 'I'd like a table for four'."
        }
      ]
    }
  ]
};