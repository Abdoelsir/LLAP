// src/components/ExamSecurity.jsx
import React, { useEffect } from 'react';
import { AuditService } from '../services/AuditService';

/**
 * ExamSecurity Wrapper
 * Monitors candidate session integrity by tracking tab navigation and network status.
 * Offloads security concerns from individual exam editors to a centralized wrapper.
 */
const ExamSecurity = ({ children }) => {
  useEffect(() => {
    // 1. Monitor Tab Switching (Visibility Change)
    const handleVisibility = () => {
      AuditService.logEvent('TAB_SWITCHED', { 
        status: document.hidden ? 'away' : 'back' 
      });
    };

    // 2. Monitor Network Connectivity
    const handleOffline = () => 
      AuditService.logEvent('NETWORK_STATUS', { status: 'offline' });
    
    const handleOnline = () => 
      AuditService.logEvent('NETWORK_STATUS', { status: 'online' });

    // Attach Event Listeners
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Cleanup Event Listeners on unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  // Return children wrapped in the security monitor
  return <>{children}</>;
};

export default ExamSecurity;