import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaGithub, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import SilkBackground from '../SilkBackground/SilkBackground';
import './index.css';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left relative w-full h-full overflow-hidden">
          <SilkBackground
            speed={5}
            scale={1}
            color="#7B7481"
            noiseIntensity={1.5}
            rotation={0}
          />
          <div className="absolute inset-0 bg-black/10 z-[1]" aria-hidden />
          <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 z-10 pointer-events-none">
            <div className="auth-logo text-white">
              <h1 className="auth-logoname">NEXA</h1>
              <h2 className="auth-logo-subtitle">ELECTRONICS</h2>
            </div>
            <div className="absolute bottom-10 left-10 text-white z-10 max-w-[380px]">
              <h2 className="text-2xl font-semibold leading-tight mb-2">
                Shop smarter with Nexa Electronics
              </h2>
              <p className="text-sm opacity-90 mb-2">
                Discover the latest gadgets, smart devices, and cutting-edge technology — all in one place.
              </p>
              <p className="text-xs opacity-80">
                From smartphones to smart homes, experience the future of electronics.
              </p>
            </div>
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
          <p className="auth-form-subtitle">Create an account to browse the latest electronics, track orders, and get exclusive deals.</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-label" htmlFor="signup-email">Your email</label>
            <div className="auth-input-wrap auth-input-wrap--no-icon">
              <input
                id="signup-email"
                type="email"
                className="auth-input"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <label className="auth-label" htmlFor="signup-username">Username</label>
            <div className="auth-input-wrap auth-input-wrap--no-icon">
              <input
                id="signup-username"
                type="text"
                className="auth-input"
                placeholder="your_username"
                autoComplete="username"
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
            <p className="auth-secure-tagline">Secure access to your orders, wishlist, and exclusive tech deals.</p>
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
            Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
