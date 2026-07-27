import React, { useState } from 'react';
import { AuthService } from '../../services/AuthService';

/**
 * StudentRegistration Component: Enhanced professional student registration interface
 * structured into logical sections with robust validation, security, and verification flow.
 */
export const StudentRegistration = ({ onSwitchToLogin, onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneCode: '+60',
    phoneNumber: '',
    country: 'MY',
    studentId: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptConsent: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  // Complete international country dataset
  const countries = [
    { code: 'MY', name: 'Malaysia' },
    { code: 'SG', name: 'Singapore' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'VN', name: 'Vietnam' },
    { code: 'TH', name: 'Thailand' },
    { code: 'PH', name: 'Philippines' },
    { code: 'BN', name: 'Brunei' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'US', name: 'United States' },
    { code: 'AU', name: 'Australia' },
    { code: 'SD', name: 'Sudan' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'OTHER', name: 'Other Country / Region' }
  ];

  // Evaluate password strength
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { label: '', color: 'bg-gray-200', width: 'w-0' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/4' };
    if (score === 3) return { label: 'Fair', color: 'bg-yellow-500', width: 'w-2/4' };
    if (score === 4) return { label: 'Good', color: 'bg-blue-500', width: 'w-3/4' };
    return { label: 'Strong', color: 'bg-green-500', width: 'w-full' };
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Personal email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid personal email address.';
    }
    if (!formData.country) newErrors.country = 'Country / Region is required.';
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must agree to the LLAP Terms of Use and Privacy Policy.';
    if (!formData.acceptConsent) newErrors.acceptConsent = 'Assessment data processing consent is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const result = await AuthService.register({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber ? `${formData.phoneCode} ${formData.phoneNumber}` : '',
        country: formData.country,
        studentId: formData.studentId,
        password: formData.password
      });

      if (result.success) {
        setIsSubmitted(true);
        if (onRegistrationSuccess) {
          onRegistrationSuccess(formData.email);
        }
      } else {
        setServerError(result.message || 'Registration failed. Please try again.');
      }
    }
  };

  if (isSubmitted) {
    return (
      <main className="login-page font-sans">
        <div className="login-card text-center space-y-4">
          <div className="text-green-600 text-5xl font-bold">✓</div>
          <h2 className="text-2xl font-bold text-gray-900">Account Created Successfully</h2>
          <p className="text-sm text-gray-600">
            We have sent a verification link to <span className="font-semibold text-gray-800">{formData.email}</span>. Please check your inbox to verify your account and activate your profile before signing in.
          </p>
          <button 
            onClick={onSwitchToLogin}
            className="primary-button mt-4"
          >
            Return to Sign In
          </button>
        </div>
      </main>
    );
  }

  const strength = getPasswordStrength(formData.password);

  return (
    <main className="login-page font-sans">
      <div className="login-card max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">LLAP</h1>
          <h2 className="text-xl font-bold text-gray-800 mt-1">Create Your Student Account</h2>
          <p className="text-sm text-gray-500 mt-1">Begin your English journey with LLAP.</p>
        </div>

        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded mb-4" role="alert">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form" noValidate>

          {/* Section A — Personal Information */}
          <section className="form-section">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-4 pb-2 border-b">
              Personal Information
            </h3>

            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange}
                placeholder="Enter your full name"
                className={errors.fullName ? 'border-red-500' : ''}
              />
              {errors.fullName && <span className="form-error" role="alert">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Personal Email Address *</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                placeholder="Enter your personal email address"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <span className="form-error" role="alert">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number <span className="optional">(Optional)</span></label>
              <div className="flex gap-2">
                <select 
                  name="phoneCode" 
                  value={formData.phoneCode} 
                  onChange={handleChange}
                  className="w-28 p-2.5 border border-gray-300 rounded-lg text-sm bg-white"
                >
                  <option value="+60">+60 (MY)</option>
                  <option value="+65">+65 (SG)</option>
                  <option value="+62">+62 (ID)</option>
                  <option value="+84">+84 (VN)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+1">+1 (US)</option>
                </select>
                <input 
                  type="tel" 
                  id="phoneNumber" 
                  name="phoneNumber" 
                  value={formData.phoneNumber} 
                  onChange={handleChange}
                  placeholder="12 345 6789"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="country">Country / Region *</label>
              <select 
                id="country" 
                name="country" 
                value={formData.country} 
                onChange={handleChange}
                className={errors.country ? 'border-red-500' : ''}
              >
                <option value="">Search or select your country</option>
                {countries.map(c => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
              {errors.country && <span className="form-error" role="alert">{errors.country}</span>}
            </div>
          </section>

          {/* Section B — Student Information */}
          <section className="form-section">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-4 pb-2 border-b">
              Student Information
            </h3>

            <div className="form-group">
              <label htmlFor="studentId">Student ID <span className="optional">(Optional)</span></label>
              <input 
                type="text" 
                id="studentId" 
                name="studentId" 
                value={formData.studentId} 
                onChange={handleChange}
                placeholder="Institutional ID, if applicable"
              />
            </div>
          </section>

          {/* Section C — Account Security */}
          <section className="form-section">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-4 pb-2 border-b">
              Account Security
            </h3>

            <div className="form-group">
              <label htmlFor="password">Create Password *</label>
              <div className="password-wrapper">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  id="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange}
                  placeholder="Enter password"
                  className={errors.password ? 'border-red-500' : ''}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="w-full bg-gray-200 h-1.5 rounded overflow-hidden">
                    <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`}></div>
                  </div>
                  <p className="text-xs text-gray-500">Password strength: <span className="font-semibold">{strength.label}</span></p>
                </div>
              )}
              {errors.password && <span className="form-error" role="alert">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={errors.confirmPassword ? 'border-red-500' : ''}
              />
              {errors.confirmPassword && <span className="form-error" role="alert">{errors.confirmPassword}</span>}
            </div>
          </section>

          {/* Section D — Consent & Account Creation */}
          <section className="form-section space-y-3 pt-2">
            <label className="checkbox-row text-xs text-gray-700 cursor-pointer flex items-start gap-2">
              <input 
                type="checkbox" 
                id="acceptTerms" 
                name="acceptTerms" 
                checked={formData.acceptTerms} 
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span>I agree to the LLAP Terms of Use and Privacy Policy. *</span>
            </label>
            {errors.acceptTerms && <span className="form-error block" role="alert">{errors.acceptTerms}</span>}

            <label className="checkbox-row text-xs text-gray-700 cursor-pointer flex items-start gap-2">
              <input 
                type="checkbox" 
                id="acceptConsent" 
                name="acceptConsent" 
                checked={formData.acceptConsent} 
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span>I consent to LLAP storing and processing my assessment results and learning progress for educational, reporting, and analytics purposes. *</span>
            </label>
            {errors.acceptConsent && <span className="form-error block" role="alert">{errors.acceptConsent}</span>}
          </section>

          <button 
            type="submit"
            className="primary-button mt-4"
          >
            Create Student Account
          </button>

          <p className="login-link text-center text-sm text-gray-600 pt-2">
            Already have an account?{' '}
            <button 
              type="button"
              onClick={onSwitchToLogin}
              className="text-blue-600 font-bold hover:underline bg-transparent border-none cursor-pointer p-0"
            >
              Sign In
            </button>
          </p>

        </form>
      </div>

      <footer className="site-footer mt-8 text-center text-xs text-gray-400">
        🔒 Your information is protected.
      </footer>
    </main>
  );
};

export default StudentRegistration;