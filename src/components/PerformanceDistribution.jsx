import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const PerformanceDistribution = ({ bandDistribution, skillAverages }) => {
  const bandData = Object.entries(bandDistribution).map(([band, count]) => ({ band, count }));
  const skillData = Object.entries(skillAverages).map(([skill, average]) => ({ skill, average }));

  return (
    <div style={styles.wrapper}>
      <section style={styles.card}>
        <h2>Band Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={bandData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="band" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#2196f3" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      <section style={styles.card}>
        <h2>Skill Proficiency</h2>
        <ResponsiveContainer width="100%" height={250}>
          <RadarChart outerRadius={90} data={skillData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" />
            <PolarRadiusAxis angle={30} domain={[0, 9]} />
            <Radar name="Band" dataKey="average" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

const styles = {
  wrapper: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  card: { border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '20px' }
};

export default PerformanceDistribution;