import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SkillDashboard = () => {
  const navigate = useNavigate();
  const { skill } = useParams();
  
  // Guard clause to handle missing skill parameter
  if (!skill) return <div>Invalid Skill Path</div>;
  
  const title = skill.charAt(0).toUpperCase() + skill.slice(1);

  // Dynamic icon selection based on the skill
  const getSkillIcon = (skillName) => {
    switch (skillName.toLowerCase()) {
      case 'reading': return '📖';
      case 'listening': return '🎧';
      case 'writing': return '✍️';
      case 'speaking': return '🗣️';
      default: return '🎯';
    }
  };

  const sectionStyle = {
    padding: '20px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  // Define navigation configuration to keep the render logic clean
  const menuOptions = [
    { title: "Lessons", desc: `Learn new ${skill} strategies.`, path: `/ielts/${skill}/lessons` },
    { title: "Practice Activities", desc: "Interactive skill exercises.", path: `/ielts/${skill}/practice` },
    { title: "Practice Quizzes", desc: "Test your understanding.", path: `/ielts/${skill}/quizzes` },
    { title: "Assignments", desc: "Teacher-assigned activities.", path: `/ielts/${skill}/assignments` },
    { title: "Mock Exams", desc: `Practice full IELTS ${title} tests.`, path: `/ielts/${skill}/exams` },
    { title: "Vocabulary Bank", desc: `Essential ${skill} terminology.`, path: `/ielts/${skill}/vocabulary-bank` },
    { title: "Performance", desc: "View progress and scores.", path: `/ielts/${skill}/performance` }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>{getSkillIcon(skill)} IELTS {title}</h1>
      <p>Develop your {skill} skills through structured learning.</p>
      <hr style={{ margin: '20px 0' }} />

      {menuOptions.map((opt, index) => (
        <div key={index} style={sectionStyle}>
          <div>
            <h3>{opt.title === "Lessons" ? "📚" : 
                 opt.title === "Practice Activities" ? "🏃" :
                 opt.title === "Practice Quizzes" ? "📝" :
                 opt.title === "Assignments" ? "📂" :
                 opt.title === "Mock Exams" ? "🎯" :
                 opt.title === "Vocabulary Bank" ? "📖" : "📊"} {opt.title}</h3>
            <p>{opt.desc}</p>
          </div>
          <button onClick={() => navigate(opt.path)}>Enter</button>
        </div>
      ))}

      <button 
        onClick={() => navigate('/ielts')} 
        style={{ marginTop: '30px', padding: '10px 20px', cursor: 'pointer' }}
      >
        ← Return to IELTS Dashboard
      </button>
    </div>
  );
};

export default SkillDashboard;