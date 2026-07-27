// src/components/LessonLayout.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Importing with standardized names to match your data files
import { listeningLessons } from '../data/ieltsListening';
import { readingLessons } from '../data/ieltsReading';
import { writingLessons } from '../data/ieltsWriting';
import { speakingLessons } from '../data/ieltsSpeaking';
import { grammarLessons } from '../data/ieltsGrammar';
import { vocabularyLessons } from '../data/ieltsVocabulary';

const LessonLayout = () => {
  const { programme, skill, lessonId } = useParams();
  const navigate = useNavigate();

  const dataMap = {
    listening: listeningLessons,
    reading: readingLessons,
    writing: writingLessons,
    speaking: speakingLessons,
    grammar: grammarLessons,
    vocabulary: vocabularyLessons
  };

  const skillData = dataMap[skill];
  const lesson = skillData ? skillData[lessonId] : null;

  if (!lesson) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Lesson not found</h2>
        <button onClick={() => navigate(-1)}>← Back</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ borderBottom: '2px solid #eee', marginBottom: '20px' }}>
        <button onClick={() => navigate(-1)}>← Back</button>
        <h2>{programme.toUpperCase()} | {skill.toUpperCase()}</h2>
        <h1>{lesson.title}</h1>
      </header>
      
      {/* Content renders here */}
      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Lesson Content</h3>
        <p>Title: {lesson.title}</p>
      </div>
    </div>
  );
};

export default LessonLayout;