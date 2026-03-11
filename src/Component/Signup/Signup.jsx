import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaGithub, FaApple, FaStar } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import './index.css';

const ShoppingBagIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="luxemart-auth">
      <div className="luxemart-auth-left">
        <div className="luxemart-logo-main">
          <span className="luxemart-logo-icon-wrap">
            <ShoppingBagIcon className="luxemart-logo-icon" />
          </span>
          <div>
            <div className="luxemart-logo-title">LUXEMART</div>
            <div className="luxemart-logo-sub">PREMIUM E-COMMERCE</div>
          </div>
        </div>
        <div className="luxemart-hero">
          <div className="luxemart-hero-lines" aria-hidden />
          <h1 className="luxemart-hero-title">Shop Without</h1>
          <h1 className="luxemart-hero-title-accent">Limits.</h1>
          <p className="luxemart-hero-desc">Discover premium products, exclusive drops, and seamless checkout — crafted for the modern shopper.</p>
          <div className="luxemart-trust">
            <span className="luxemart-stars">★★★★★</span>
            <span className="luxemart-trust-text">Trusted by 50,000+ shoppers</span>
          </div>
        </div>
        <div className="luxemart-stats">
          <div className="luxemart-stat">
            <span className="luxemart-stat-value">50K+</span>
            <span className="luxemart-stat-label">Products</span>
          </div>
          <div className="luxemart-stat-divider" />
          <div className="luxemart-stat">
            <span className="luxemart-stat-value">200+</span>
            <span className="luxemart-stat-label">Brands</span>
          </div>
          <div className="luxemart-stat-divider" />
          <div className="luxemart-stat">
            <span className="luxemart-stat-value">4.9★</span>
            <span className="luxemart-stat-label">Rating</span>
          </div>
        </div>
      </div>
      <div className="luxemart-auth-right luxemart-auth-right-signup">
        <div className="luxemart-form-panel luxemart-form-panel-signup">
          <div className="luxemart-form-icon" aria-hidden>
            <FaStar className="luxemart-form-star" />
          </div>
          <h2 className="luxemart-form-title">Join LuxeMart</h2>
          <p className="luxemart-form-subtitle">Create your premium account today</p>
          <form className="luxemart-form" onSubmit={handleSubmit}>
            <label className="luxemart-label" htmlFor="signup-username">USERNAME</label>
            <div className="luxemart-input-wrap">
              <FaUser className="luxemart-input-icon" size={18} />
              <input
                id="signup-username"
                type="text"
                className="luxemart-input"
                placeholder="choose_username"
                autoComplete="username"
              />
            </div>
            <label className="luxemart-label" htmlFor="signup-email">EMAIL ADDRESS</label>
            <div className="luxemart-input-wrap">
              <FaEnvelope className="luxemart-input-icon" size={18} />
              <input
                id="signup-email"
                type="email"
                className="luxemart-input"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <label className="luxemart-label" htmlFor="signup-password">PASSWORD</label>
            <div className="luxemart-input-wrap">
              <FaLock className="luxemart-input-icon" size={18} />
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                className="luxemart-input"
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="luxemart-input-eye"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            <button type="submit" className="luxemart-btn">CREATE ACCOUNT</button>
          </form>
          <p className="luxemart-terms">
            By signing up, you agree to our <Link to="#" className="luxemart-link">Terms & Privacy Policy</Link>
          </p>
          <div className="luxemart-divider">
            <span className="luxemart-divider-line" />
            <span className="luxemart-divider-text">or continue with</span>
            <span className="luxemart-divider-line" />
          </div>
          <div className="luxemart-social">
            <button type="button" className="luxemart-social-btn">
              <FcGoogle size={22} />
              <span>Google</span>
            </button>
            <button type="button" className="luxemart-social-btn">
              <FaGithub size={22} />
              <span>GitHub</span>
            </button>
            <button type="button" className="luxemart-social-btn">
              <FaApple size={22} />
              <span>Apple</span>
            </button>
          </div>
          <p className="luxemart-footer">
            Already have an account? <Link to="/login" className="luxemart-link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
