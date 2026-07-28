import React, { useState } from 'react';

/**
 * ForgotPassword Component: Professional, secure password recovery interface
 * integrated with Netlify serverless function and Mailgun API.
 */
export const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your registered personal email address.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call the Netlify serverless backend function we deployed
      const response = await fetch('/.netlify/functions/send-reset-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || 'Failed to send password reset instructions. Please try again.');
      }
    } catch (err) {
      console.error('Password reset network error:', err);
      setError('A network error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page font-sans">
      <section className="login-card max-w-md mx-auto" aria-labelledby="reset-title">
        
        {/* Header Banner */}
        <header className="login-header">
          <div className="security-icon" aria-hidden="true">🔑</div>
          <h1 id="reset-title" className="text-2xl font-bold text-gray-900">Reset Your Password</h1>
          <p className="security-message text-sm text-gray-600 mt-2">
            Enter your registered personal email address and we will send you a secure password reset link.
          </p>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded mb-4" role="alert">
            {error}
          </div>
        )}

        {submitted ? (
          <div className="space-y-5 text-center py-4">
            <div className="text-green-600 text-4xl font-bold">✓</div>
            <p className="text-sm text-gray-700 leading-relaxed">
              If an account exists for <span className="font-semibold text-gray-900">{email}</span>, password reset instructions have been securely sent to your personal email inbox.
            </p>
            <button 
              onClick={onBackToLogin}
              className="primary-button mt-4"
            >
              Return to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form space-y-4" noValidate>
            <div className="form-group">
              <label htmlFor="reset-email" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Personal Email Address *
              </label>
              <input 
                type="email" 
                id="reset-email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="student@example.com"
                required
                aria-required="true"
                disabled={loading}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="primary-button mt-2 disabled:opacity-50"
            >
              {loading ? 'Sending Request...' : 'Send Reset Link'}
            </button>

            <div className="text-center pt-3 border-t border-gray-100">
              <button 
                type="button"
                onClick={onBackToLogin}
                className="text-sm text-blue-600 hover:underline font-semibold bg-transparent border-none cursor-pointer p-0"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )}

      </section>

      <footer className="site-footer mt-8 text-center text-xs text-gray-400">
        🔒 Your information is protected and encrypted.
      </footer>
    </main>
  );
};

export default ForgotPassword;