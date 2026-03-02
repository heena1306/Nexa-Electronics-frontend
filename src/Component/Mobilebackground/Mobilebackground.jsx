import React, { useRef, useEffect } from 'react';
import '../Backgroundvideo/index.css';

const MOBILE_VIDEO_URL = 'https://res.cloudinary.com/dwatnpdcy/video/upload/v1/Iphone_16_Pro_Reveal_4K_70Gcxctpvbg_pnjebb.mp4';

const MobBackgroundVideoComponent = ({ onLoad }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, []);

  const handleVideoLoad = () => {
    if (onLoad) onLoad();
  };

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={handleVideoLoad}
      >
        <source src={MOBILE_VIDEO_URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content-overlay" />
    </div>
  );
};

export default MobBackgroundVideoComponent;
