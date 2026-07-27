import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AuthService } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import StudentRegistration from './StudentRegistration';
import ForgotPassword from './ForgotPassword';

/**
 * Login Component: Centered secure login card with structured information area
 * matching the approved layout specifications.
 */
export const Login = () => {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email/username and password.');
      return;
    }

    try {
      const result = await AuthService.login({ username: email, password });
      
      if (result.success) {
        login(result.user);
        if (result.user.role === 'teacher') {
          navigate('/teacher/analytics');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(result.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during authentication. Please try again.');
    }
  };

  if (currentView === 'register') {
    return (
      <StudentRegistration 
        onSwitchToLogin={() => setCurrentView('login')} 
        onRegistrationSuccess={() => setCurrentView('login')}
      />
    );
  }

  if (currentView === 'forgot') {
    return (
      <ForgotPassword onBackToLogin={() => setCurrentView('login')} />
    );
  }

  return (
    <main className="login-page font-sans">

      {/* LOGIN CARD */}
      <section className="login-card" aria-labelledby="login-title">
        
        {/* Section 1 — Secure Login Header */}
        <header className="login-header">
          <div className="security-icon" aria-hidden="true">🔒</div>
          <h1 id="login-title">Secure Login</h1>
          <p className="security-message">Your information is encrypted and protected.</p>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded mb-4" role="alert">
            {error}
          </div>
        )}

        {/* Section 2 — Authentication Form */}
        <form onSubmit={handleLogin} className="login-form" noValidate>
          <div className="form-group">
            <label htmlFor="username">Email Address or Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              placeholder="Enter your email or username"
              required
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                aria-required="true"
              />
              <button
                type="button"
                id="togglePassword"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-option">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => setCurrentView('forgot')}
              className="text-link bg-transparent border-none cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            id="signInButton"
            className="primary-button"
          >
            SIGN IN
          </button>
        </form>

        {/* Section 3 — Student Registration */}
        <div className="registration-section">
          <p>New to LLAP?</p>
          <button
            type="button"
            onClick={() => setCurrentView('register')}
            className="secondary-button"
          >
            Create Student Account
          </button>
        </div>

        {/* Section 4 — Teacher Profile CTA */}
        <div className="teacher-profile-cta">
          <button
            type="button"
            onClick={() => navigate('/teacher-profile')}
            className="profile-button w-full"
          >
            Meet Your Instructor →
          </button>
        </div>

      </section>

      {/* Section 5 — Information Area */}
      <section className="information-area">
        
        <div className="info-section">
          <h2>Our Mission</h2>
          <p>Helping learners improve their English through interactive, engaging, and learner-centred education.</p>
        </div>

        <div className="info-section">
          <h2>Powered by</h2>
          <h3>Mrs. Shahd Abulila</h3>
          <p>English Language Educator</p>
          <p className="expertise">Cambridge • IELTS • Curriculum Design</p>
        </div>

        <div className="info-section">
          <h2>Need Help?</h2>
          <address>
            <p><a href="mailto:shahdabulila03@gmail.com">📧 shahdabulila03@gmail.com</a></p>
            <p><a href="tel:+601111556245">📞 +60 1111 556245</a></p>
            <p>📍 Kuala Lumpur, Malaysia</p>
          </address>
        </div>

      </section>

      <footer className="site-footer">
        © 2026 LLAP Learning Academy
      </footer>

    </main>
  );
};

export default Login;