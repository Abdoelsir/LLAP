import React from 'react';

const LearningObjectiveAnalytics = ({ data }) => (
  <section style={styles.card}>
    <h2>Learning Objective Analytics</h2>
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Objective</th>
          <th>Accuracy</th>
          <th>Recommendation</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.objective}</td>
            <td>{item.accuracy}%</td>
            <td style={{ color: '#1976d2', fontWeight: 'bold' }}>{item.recommendation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

const styles = {
  card: { border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '20px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' }
};

export default LearningObjectiveAnalytics;