import React, { useState } from 'react';

/**
 * EmailVerification Component: Handles single-use token verification for pending accounts.
 */
export const EmailVerification = ({ onVerified }) => {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState('idle'); // idle, verifying, success, error

  const handleVerify = (e) => {
    e.preventDefault();
    if (!token.trim()) return;

    setStatus('verifying');
    setTimeout(() => {
      // Simulate backend token validation success
      if (token === 'VALID-TOKEN' || token.length > 5) {
        setStatus('success');
        if (onVerified) onVerified();
      } else {
        setStatus('error');
      }
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow border border-gray-200 text-center space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Email Verification</h2>
      <p className="text-sm text-gray-600">
        Please enter your secure verification code or click the activation link sent to your email.
      </p>

      {status === 'success' ? (
        <div className="space-y-3">
          <p className="text-green-600 font-semibold">Account successfully verified!</p>
          <button 
            onClick={onVerified}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
          >
            Proceed to Sign In
          </button>
        </div>
      ) : (
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <input 
              type="text" 
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter verification code (e.g., VALID-TOKEN)"
              className="w-full p-2.5 border border-gray-300 rounded text-sm text-center"
            />
          </div>
          {status === 'error' && (
            <p className="text-xs text-red-600">Invalid or expired verification token. Please try again.</p>
          )}
          <button 
            type="submit"
            disabled={status === 'verifying'}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            {status === 'verifying' ? 'Verifying...' : 'Verify Account'}
          </button>
        </form>
      )}
    </div>
  );
};

export default EmailVerification;