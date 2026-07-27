import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LessonsOverview = () => {
  const { skill } = useParams();
  const navigate = useNavigate();

  const modules = {
    module1: { title: "Understanding Short Conversations", lessons: [1, 2, 3, 4] },
    module2: { title: "Everyday Situations", lessons: [5, 6, 7, 8] }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>{skill ? skill.toUpperCase() : 'Skill'} Lessons</h1>
      <button onClick={() => navigate(-1)}>← Back</button>
      
      {Object.entries(modules).map(([key, mod]) => (
        <div key={key} style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px' }}>
          <h3>{mod.title}</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {mod.lessons.map(lessonId => (
              <button 
                key={lessonId} 
                onClick={() => navigate(`/lesson/ielts/${skill}/${lessonId}`)}
                style={{ padding: '10px' }}
              >
                Lesson {lessonId}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonsOverview;