import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaApple } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import './index.css';

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="create-account-page">
      <div className="create-account-card">
        <div className="create-account-left">
          <div className="create-account-logo">
            <svg className="logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M8 6L16 2L24 6V26L16 30L8 26V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 2V30M8 6L16 10L24 6M8 26L16 22L24 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="create-account-logo-text">
              <span className="logo-name">NEXA</span>
              <span className="logo-subtitle">ELECTRONICS</span>
            </div>
          </div>
          <div className="create-account-copy">
            <p className="copy-small">You can easily</p>
            <p className="copy-bold">Get access your personal hub for clarity and productivity.</p>
          </div>
        </div>
        <div className="create-account-right">
          <div className="create-account-header">
            <span className="header-icon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14 10H22L16 15L18 22L12 18L6 22L8 15L2 10H10L12 2Z"/>
              </svg>
            </span>
            <h1 className="create-account-title">Create an account</h1>
            <p className="create-account-desc">Access your tasks, notes, and projects anytime, anywhere - and keep everything flowing in one place.</p>
          </div>
          <form className="create-account-form" onSubmit={handleSubmit}>
            <label className="create-account-label" htmlFor="email">Your email</label>
            <input
              id="email"
              type="email"
              className="create-account-input"
              placeholder="natalia.brak@knmstudio.com"
              autoComplete="email"
            />
            <label className="create-account-label" htmlFor="password">Create password</label>
            <div className="create-account-password-wrap">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="create-account-input"
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="create-account-eye"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            <button type="submit" className="create-account-submit">Create account</button>
          </form>
          <div className="create-account-divider">
            <span className="divider-line" />
            <span className="divider-text">or continue with</span>
            <span className="divider-line" />
          </div>
          <div className="create-account-social">
            <button type="button" className="create-account-social-btn" aria-label="Continue with Google">
              <FcGoogle size={22} />
            </button>
            <button type="button" className="create-account-social-btn" aria-label="Continue with GitHub">
              <FaGithub size={22} />
            </button>
            <button type="button" className="create-account-social-btn" aria-label="Continue with Apple">
              <FaApple size={22} />
            </button>
          </div>
          <p className="create-account-footer">
            Already have an account? <Link to="/login" className="create-account-link">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
