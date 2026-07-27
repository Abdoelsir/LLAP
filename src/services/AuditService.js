/**
 * src/services/AuditService.js
 * Optimized for robustness and reliability.
 * Handles logging of critical examination events for proctoring and analytics.
 */

export const AuditService = {
  /**
   * Logs an event to the audit trail with safety wrappers to prevent UI crashes.
   * @param {string} eventType - The type of event (e.g., 'TAB_SWITCHED', 'NETWORK_STATUS')
   * @param {Object} details - Additional metadata to capture
   */
  logEvent: (eventType, details = {}) => {
    try {
      const timestamp = new Date().toISOString();
      
      // Construct the event object safely
      const eventData = {
        eventType,
        timestamp,
        ...details,
        // Retrieve session identifiers; default to 'unauthenticated'/'anonymous' if not found
        examSessionId: localStorage.getItem('exam_session_id') || 'unauthenticated',
        candidateId: localStorage.getItem('candidate_id') || 'anonymous'
      };

      // Console log for development debugging
      console.log(`[AUDIT LOG] ${eventType}:`, eventData);
      
      // Persist to localStorage with error handling to avoid UI blocking
      const rawLogs = localStorage.getItem('exam_audit_logs');
      const logs = rawLogs ? JSON.parse(rawLogs) : [];
      logs.push(eventData);
      localStorage.setItem('exam_audit_logs', JSON.stringify(logs));
      
    } catch (e) {
      // Silently fail to ensure the candidate's exam experience is never interrupted
      console.warn('AuditService: Failed to log event', e);
    }
  },

  /**
   * Placeholder for backend synchronization logic.
   * Can be triggered when network connectivity is confirmed or at submission.
   */
  syncLogsToServer: async () => {
    // In production, this will POST the 'exam_audit_logs' array to your backend
    // and clear localStorage upon successful server-side confirmation.
  }
};