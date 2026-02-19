import React, { useState } from "react";
import "./index.css";
import { FaGoogle, FaTwitter, FaFacebook } from "react-icons/fa";
import Galaxy from "../Galaxy/Galaxybg";

const Loginpage = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="login-wrapper">

      {/* 🌌 GALAXY BACKGROUND */}
      <div className="galaxy-bg">
  <Galaxy
    mouseRepulsion={true}
    mouseInteraction={true}
    density={1.5}
    glowIntensity={0.6}
    saturation={0.0}
    hueShift={0} /* not used heavily for b/w style, safe to keep */
    transparent={true}
    repulsionStrength={2.2}
    twinkleIntensity={0.4}
    rotationSpeed={0.08}
  />
      </div>

      {/* LOGO */}
      <div className="logo-login">
        <h1 className="logonamelogin">NEXᐱ</h1>
        <h2 className="subtitle-login">ELECTORNICS</h2>
      </div>

      {/* CARD */}
      <div className="login-card">
        <h1 className="login-title">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h1>

        {isSignup && (
          <div className="input-group">
            <label>Username</label>
            <input className="username-input" type="text" placeholder="Enter your username" />
          </div>
        )}

        <div className="input-group">
          <label>Email Address</label>
          <input className="email-input" type="email" placeholder="Enter your email" />
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="password-field">
            <input className="password-input" type="password" placeholder="Enter your password" />
            <span className="eye-icon">👁️</span>
          </div>
        </div>

        {!isSignup && (
          <div className="forgot-row">
            <a href="/">Forgot Password?</a>
          </div>
        )}

        <button className="signin-btn">
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p className="signup-text">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsSignup(false)}>Login</span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span onClick={() => setIsSignup(true)}>Sign Up</span>
            </>
          )}
        </p>

        <div className="divider">
          <span>Or Continue With</span>
        </div>

        <div className="social-icons">
          <div><FaGoogle size={20} /></div>
          <div><FaTwitter size={20} /></div>
          <div><FaFacebook size={20} /></div>
        </div>
      </div>

      <footer className="login-footer">
        <p>© 2024 ELECTRONIX. All rights reserved.</p>
        <div className="footer-links">
          <a href="/">About Us</a>
          <a href="/">Contact</a>
          <a href="/">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default Loginpage;
