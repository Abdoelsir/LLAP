import React from 'react';

const CohortComparison = ({ data }) => (
  <section style={styles.card}>
    <h2>Cohort Comparison</h2>
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Current Cohort</th>
          <th>Previous Cohort</th>
          <th>Trend</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.metric}</td>
            <td>{item.current}</td>
            <td>{item.previous}</td>
            <td style={{ color: item.current >= item.previous ? 'green' : 'red' }}>
              {item.current >= item.previous ? '▲' : '▼'}
            </td>
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

export default CohortComparison;