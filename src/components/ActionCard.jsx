import React from 'react';

// The ActionCard component now serves only as a UI element for dashboards
const ActionCard = ({ title, color, icon, onClick, status }) => {
  return (
    <div 
      className="action-card" 
      onClick={onClick} 
      style={{ backgroundColor: color, padding: '20px', margin: '10px', borderRadius: '8px', cursor: 'pointer', color: 'white' }}
    >
      <h3>{icon} {title}</h3>
      {status && <span className="status-badge">{status}</span>}
    </div>
  );
};

export default ActionCard;