import React from 'react';

const TeachingPriorityPanel = ({ heatmapData }) => {
  // Filter for priority items
  const priorityItems = heatmapData.filter(q => q.status !== 'Excellent');

  return (
    <section style={styles.card}>
      <h2 style={{ color: '#d32f2f' }}>Teaching Priority Panel</h2>
      {priorityItems.length > 0 ? (
        <ul style={styles.list}>
          {priorityItems.map((item) => (
            <li key={item.id} style={styles.listItem}>
              <strong>{item.type} ({item.skill})</strong>: 
              Need reinforcement in <em>{item.subSkill}</em>. 
              <br/>
              <span style={styles.recommendation}>→ Recommended: {item.objective} Module</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>All learning objectives are currently meeting performance targets.</p>
      )}
    </section>
  );
};

const styles = {
  card: { border: '1px solid #d32f2f', padding: '15px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#fff5f5' },
  list: { paddingLeft: '20px' },
  listItem: { marginBottom: '10px' },
  recommendation: { color: '#1976d2', fontWeight: 'bold' }
};

export default TeachingPriorityPanel;