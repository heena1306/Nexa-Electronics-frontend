import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaGithub, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import SilkBackground from '../SilkBackground/SilkBackground';
import './index.css';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home', { replace: true });
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
        <div className="auth-right">
          <div className="auth-right-inner">
          <h1 className="auth-form-title">Welcome back to Nexa Electronics</h1>
          <p className="auth-form-subtitle">Sign in to explore the latest electronics and exclusive deals.</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
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
            </div>
            <div className="auth-field">
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
            </div>
            <div className="auth-options">
              <label className="auth-checkbox-wrap">
                <input type="checkbox" className="auth-checkbox" />
                <span className="auth-checkbox-label">Remember me</span>
              </label>
              <Link to="#" className="auth-link">Forgot Password?</Link>
            </div>
            <button type="submit" className="auth-btn">Login</button>
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
            Don&apos;t have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

