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
              <path d="M20 8C20 8 18 6 14 6C9 6 6 9 6 13C6 16 8 18 12 19C17 20 20 22 20 26C20 28 19 30 16 30C12 30 10 28 10 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 26C12 28 10 30 6 30C4 30 2 28 2 26C2 22 5 20 10 19C14 18 16 16 16 13C16 9 13 6 8 6C6 6 4 7 4 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="logo-text">BrightNest</span>
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
            Already have an account? <Link to="/" className="create-account-link">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
