/**
 * AuthService: Manages user authentication, role validation, and local registration persistence
 * completely self-contained to prevent external network or SSL errors in frontend deployments.
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

    // 4. Controlled Failure Response (No network calls to invalid domains)
    return { 
      success: false, 
      message: "Invalid email/username or password. Please check your credentials or create a student account." 
    };
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