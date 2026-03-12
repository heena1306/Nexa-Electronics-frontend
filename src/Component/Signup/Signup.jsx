import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGithub, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import './index.css';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <div className="auth-logo">
            <h1 className="auth-logoname">NEXA</h1>
            <h2 className="auth-logo-subtitle">ELECTRONICS</h2>
          </div>
          <div className="auth-copy">
            <p className="auth-copy-small">You can easily</p>
            <p className="auth-copy-bold">Get access your personal hub for clarity and productivity.</p>
          </div>
        </div>
        <div className="auth-right auth-right-signup">
          <div className="auth-right-inner">
          <div className="auth-form-header">
            <span className="auth-header-icon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14 10H22L16 15L18 22L12 18L6 22L8 15L2 10H10L12 2Z"/>
              </svg>
            </span>
            <h1 className="auth-form-title">Create an account</h1>
          </div>
          <p className="auth-form-subtitle">Access your tasks, notes, and projects anytime, anywhere – and keep everything flowing in one place.</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-label" htmlFor="signup-email">Your email</label>
            <div className="auth-input-wrap auth-input-wrap--no-icon">
              <input
                id="signup-email"
                type="email"
                className="auth-input"
                placeholder="natalia.brak@knmstudio.com"
                autoComplete="email"
              />
            </div>
            <label className="auth-label" htmlFor="signup-password">Create password</label>
            <div className="auth-input-wrap auth-input-wrap--no-icon">
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                className="auth-input"
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-input-eye"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            <button type="submit" className="auth-btn">Create account</button>
          </form>
          <div className="auth-divider">
            <span className="auth-divider-line" />
            <span className="auth-divider-text">or continue with</span>
            <span className="auth-divider-line" />
          </div>
          <div className="auth-social">
            <button type="button" className="auth-social-btn" aria-label="Continue with Google">
              <span className="auth-social-btn-icon"><FcGoogle size={20} /></span>
            </button>
            <button type="button" className="auth-social-btn" aria-label="Continue with GitHub">
              <span className="auth-social-btn-icon"><FaGithub size={20} /></span>
            </button>
            <button type="button" className="auth-social-btn" aria-label="Continue with Apple">
              <span className="auth-social-btn-icon"><FaApple size={20} /></span>
            </button>
          </div>
          <p className="auth-footer">
            Already have an account? <Link to="/login" className="auth-link">Register</Link>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
