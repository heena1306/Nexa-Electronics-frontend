import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaGithub, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import './index.css';

const LogoIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M20 8C20 8 18 6 14 6C9 6 6 9 6 13C6 16 8 18 12 19C17 20 20 22 20 26C20 28 19 30 16 30C12 30 10 28 10 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 26C12 28 10 30 6 30C4 30 2 28 2 26C2 22 5 20 10 19C14 18 16 16 16 13C16 9 13 6 8 6C6 6 4 7 4 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <div className="auth-logo">
            <LogoIcon className="auth-logo-icon" />
            <span className="auth-logo-text">BrightNest</span>
          </div>
          <div className="auth-copy">
            <p className="auth-copy-small">You can easily</p>
            <p className="auth-copy-bold">Get access your personal hub for clarity and productivity.</p>
          </div>
        </div>
        <div className="auth-right">
          <h1 className="auth-form-title">Welcome back</h1>
          <p className="auth-form-subtitle">Sign in to continue shopping</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-label" htmlFor="login-username">USERNAME</label>
            <div className="auth-input-wrap">
              <FaUser className="auth-input-icon" size={18} />
              <input
                id="login-username"
                type="text"
                className="auth-input"
                placeholder="your_username"
                autoComplete="username"
              />
            </div>
            <label className="auth-label" htmlFor="login-password">PASSWORD</label>
            <div className="auth-input-wrap">
              <FaLock className="auth-input-icon" size={18} />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="auth-input"
                placeholder="••••••••"
                autoComplete="current-password"
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
            <div className="auth-options">
              <label className="auth-checkbox-wrap">
                <input type="checkbox" className="auth-checkbox" />
                <span className="auth-checkbox-label">Remember me</span>
              </label>
              <Link to="#" className="auth-link">Forgot Password?</Link>
            </div>
            <button type="submit" className="auth-btn">LOGIN</button>
          </form>
          <div className="auth-divider">
            <span className="auth-divider-line" />
            <span className="auth-divider-text">or continue with</span>
            <span className="auth-divider-line" />
          </div>
          <div className="auth-social">
            <button type="button" className="auth-social-btn">
              <FcGoogle size={22} />
              <span>Google</span>
            </button>
            <button type="button" className="auth-social-btn">
              <FaGithub size={22} />
              <span>GitHub</span>
            </button>
            <button type="button" className="auth-social-btn">
              <FaApple size={22} />
              <span>Apple</span>
            </button>
          </div>
          <p className="auth-footer">
            Don&apos;t have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
