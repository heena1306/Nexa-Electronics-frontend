import React, { useRef, useEffect } from 'react';
import './index.css';

const BackgroundVideoComponent = ({ onLoad }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      // Try to play video
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Video autoplay failed:', error);
        });
      }
    }
  }, []);

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    if (onLoad) onLoad();
  };

  const handleVideoError = (e) => {
    console.error('Video loading error:', e);
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
        onError={handleVideoError}
      >
        {/* Use direct Cloudinary video URL with /video/ endpoint */}
        <source src="https://res.cloudinary.com/dwatnpdcy/video/upload/v1/Introducing_iPhone_17_Pro_Apple__-AS5DtDeqs_yb7tcp.mp4" type="video/mp4" />
        
        {/* Fallback: You can add a second source or use a sample video */}
        {/* <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" /> */}
        
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay div if needed */}
      <div className="content-overlay"></div>
    </div>
  );
};

export default BackgroundVideoComponent;