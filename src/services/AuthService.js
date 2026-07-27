const API_URL = 'https://api.yourdomain.com/api';

/**
 * AuthService: Manages user authentication, role validation, and local registration persistence.
 */
export const AuthService = {
  /**
   * Securely login the user
   * @param {Object} credentials - { username, password }
   */
  async login({ username, password }) {
    // 1. Testing Flow: Default Student Authentication
    if (username === "student@llap.com" && password === "student123") {
      return { 
        success: true, 
        user: { username: "student@llap.com", role: "student" } 
      };
    }

    // 2. Testing Flow: Teacher Authentication (Kept strictly as requested)
    if (username === "teacher@llap.com" && password === "teacher123") {
      return { 
        success: true, 
        user: { username: "teacher@llap.com", role: "teacher" } 
      };
    }

    // 3. Dynamic Flow: Check locally registered student accounts (from StudentRegistration)
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('llap_registered_users') || '[]');
      const matchedUser = registeredUsers.find(
        (u) => (u.email === username || u.username === username) && u.password === password
      );

      if (matchedUser) {
        return {
          success: true,
          user: {
            username: matchedUser.email || matchedUser.username,
            role: 'student',
            fullName: matchedUser.fullName
          }
        };
      }
    } catch (localErr) {
      console.warn('Local registry check skipped:', localErr);
    }

    // 4. Production Flow: Communicate with backend API if local match not found
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      
      return { 
        success: true, 
        user: {
          username: data.user.username,
          role: data.user.role // 'student' or 'teacher'
        } 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: "Invalid credentials or server error" };
    }
  },

  /**
   * Register a new student account locally so they can log in seamlessly in the frontend test environment
   * @param {Object} userData 
   */
  async register(userData) {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('llap_registered_users') || '[]');
      
      // Check if email already exists
      const existing = registeredUsers.find(u => u.email === userData.email);
      if (existing) {
        return { success: false, message: "An account with this email already exists." };
      }

      // Push new user record
      registeredUsers.push({
        ...userData,
        role: 'student',
        createdAt: new Date().toISOString()
      });

      localStorage.setItem('llap_registered_users', JSON.stringify(registeredUsers));
      return { success: true, message: "Registration successful." };
    } catch (err) {
      console.error('Registration storage error:', err);
      return { success: false, message: "Registration failed due to local storage error." };
    }
  },

  async logout() {
    localStorage.removeItem('user');
    return { success: true };
  }
};

export default AuthService;