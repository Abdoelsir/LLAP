import React from 'react';

const Heatmap = ({ data }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Critical': return '#ff4d4f';
      case 'Needs Review': return '#faad14';
      default: return '#52c41a';
    }
  };

  return (
    <section style={styles.card}>
      <h2>Question Difficulty Heatmap</h2>
      <div style={styles.grid}>
        {data.map((q) => (
          <div key={q.id} style={{ ...styles.heatBox, backgroundColor: getStatusColor(q.status) }}>
            <strong style={{ display: 'block', fontSize: '14px' }}>{q.id}</strong>
            <span style={{ fontSize: '10px' }}>{q.type}</span>
            <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>{q.correctRate}%</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  card: { border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '20px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' },
  heatBox: { padding: '10px', borderRadius: '4px', textAlign: 'center', color: '#fff' }
};

export default Heatmap;