import React, { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ExamProvider } from './components/ExamContext';
import { AppRouter } from './Router'; // Importing the consolidated router
import { initSocket } from './services/socket'; // Importing our WebSocket manager

/**
 * App.js: The Central Application Host
 * Initializes global services like WebSockets, state providers, and delegates routing.
 */
function App() {
  // Initialize WebSocket connection gracefully on app mount with error suppression
  useEffect(() => {
    const socket = initSocket();
    return () => {
      if (socket && typeof socket.close === 'function') {
        socket.close();
      }
    };
  }, []);

  return (
    <AuthProvider>
      <ExamProvider>
        <AppRouter />
      </ExamProvider>
    </AuthProvider>
  );
}

export default App;