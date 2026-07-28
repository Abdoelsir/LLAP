/**
 * WebSocket Client Manager
 * Handles real-time synchronization with built-in connection error suppression and safe fallbacks.
 */

let socketInstance = null;

export const initSocket = (url = 'ws://localhost:3000/ws') => {
  try {
    if (socketInstance && socketInstance.readyState === WebSocket.OPEN) {
      return socketInstance;
    }

    // Dynamically fallback from localhost to current host production secure/insecure protocol if in production
    const getDefaultWsUrl = () => {
      const { protocol, hostname } = window.location;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return url;
      }
      const wsProtocol = protocol === 'https:' ? 'wss:' : 'ws:';
      return `${wsProtocol}//${hostname}/ws`;
    };

    // Attempt connection with fallback safety
    const wsUrl = process.env.REACT_APP_WS_URL || getDefaultWsUrl();
    socketInstance = new WebSocket(wsUrl);

    socketInstance.onopen = () => {
      console.log("WebSocket connection established successfully.");
    };

    socketInstance.onerror = (error) => {
      // Suppress noisy console output if development server WS socket is offline
      console.debug("WebSocket connection unavailable. Running in offline/standalone mode.");
    };

    socketInstance.onclose = (event) => {
      console.log("WebSocket connection closed:", event.reason || "Normal closure");
    };

    return socketInstance;
  } catch (err) {
    console.warn("WebSocket initialization skipped:", err.message);
    return null;
  }
};

export const getSocket = () => socketInstance;

export default {
  initSocket,
  getSocket
};