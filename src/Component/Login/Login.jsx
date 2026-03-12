import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaGithub, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import './index.css';

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
            <h1 className="auth-logoname">NEXA</h1>
            <h2 className="auth-logo-subtitle">ELECTRONICS</h2>
          </div>
          <div className="auth-copy">
            <p className="auth-copy-small">You can easily</p>
            <p className="auth-copy-bold">Get access your personal hub for clarity and productivity.</p>
          </div>
        </div>
        <div className="auth-right">
          <div className="auth-right-inner">
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
            <button type="submit" className="auth-btn">Login</button>
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
            Don&apos;t have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
