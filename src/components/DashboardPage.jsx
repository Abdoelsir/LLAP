import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ActionCard from './ActionCard';

const DashboardPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Welcome to LLAP</h1>
      <p>Choose Your Programme</p>
      
      {/* Updated Buttons: These now link to the routes we created in Router.jsx */}
      <ActionCard title="IELTS" color="#007bff" icon="📖" onClick={() => navigate('/ielts')} />
      <ActionCard title="Cambridge IG" color="#28a745" icon="🎓" onClick={() => navigate('/cambridge')} />
      <ActionCard title="Linguaskill" color="#fd7e14" icon="✍️" status="coming-soon" />

      <hr style={{ margin: '30px 0' }} />
      
      <button 
        onClick={handleLogout}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;