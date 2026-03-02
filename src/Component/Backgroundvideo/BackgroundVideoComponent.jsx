import React, { useRef, useEffect } from 'react';
import './index.css';

const DESKTOP_VIDEO_URL = 'https://res.cloudinary.com/dwatnpdcy/video/upload/v1/Introducing_iPhone_17_Pro_Apple__-AS5DtDeqs_yb7tcp.mp4';

const BackgroundVideoComponent = ({ onLoad }) => {
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
        <source src={DESKTOP_VIDEO_URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content-overlay" />
    </div>
  );
};

export default BackgroundVideoComponent;
