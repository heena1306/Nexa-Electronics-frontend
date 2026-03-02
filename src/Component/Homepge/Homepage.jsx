import React, { useState, useEffect } from 'react';
import BackgroundVideoComponent from '../Backgroundvideo/BackgroundVideoComponent';
import MobBackgroundVideoComponent from '../Mobilebackground/Mobilebackground';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter, FaArrowRightLong } from 'react-icons/fa6';
import './index.css';

const MOBILE_BREAKPOINT = 480;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

const Homepage = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="homepage-container">
      {isMobile ? (
        <MobBackgroundVideoComponent onLoad={() => setVideoLoaded(true)} />
      ) : (
        <BackgroundVideoComponent onLoad={() => setVideoLoaded(true)} />
      )}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: videoLoaded ? 'transparent' : '#1a1a1a',
          zIndex: -1,
        }}
        aria-hidden
      />
      <div className="logo">
        <h1 className="logoname">NEXA</h1>
        <h2 className="subtitle">ELECTRONICS</h2>
      </div>
      <div className="homepage-content">
        <div className="homepage-inner">
          <div className="contact-con">
            <button type="button" className="contactbtn">Contact Us</button>
          </div>
          <div className="main-home-content">
            <h1 className="head1">YOUR<br /></h1>
            <h1 className="head">ELECTRONICS<br /></h1>
            <h1 className="head2">HUB<br /></h1>
            <p className="head-para">Discover the latest gadgets and premium devices <br /> and smart tech for your modern lifestyle</p>
          </div>
          <div className="fallowsection">
            <h1 className="fallowtitle">FOLLOW US</h1>
            <p className="fallowpara">By reaching to connect<br /> with us.You're taking the first <br />step forward unlocking the<br /> potential of your online<br /> presence</p>
            <div className="icons">
              <FaLinkedinIn size={20} />
              <FaInstagram size={20} />
              <FaXTwitter size={20} />
            </div>
            <div className="shopnowbtn">
              <p className="shopnowtext">Shop Now</p>
              <button type="button" className="shopbtn"><FaArrowRightLong size={22} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
