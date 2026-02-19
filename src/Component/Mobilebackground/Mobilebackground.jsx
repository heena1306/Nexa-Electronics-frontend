import React, { useRef, useEffect } from 'react';
import '../Backgroundvideo/index.css';

const MobBackgroundVideoComponent = ({ onLoad }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // Ensure it is muted to allow autoplay
      videoRef.current.muted = true;
      
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
    // This logs the specific error from the source
    console.error('Video loading error. Check file format or URL access:', e.nativeEvent);
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
        {/* CORRECTED LINK BELOW: Direct .mp4 link instead of Embed Player */}
        <source 
          src="https://res.cloudinary.com/dwatnpdcy/video/upload/v1/Iphone_16_Pro_Reveal_4K_70Gcxctpvbg_pnjebb.mp4" 
          type="video/mp4" 
        />
        
        Your browser does not support the video tag.
      </video>
      
      <div className="content-overlay"></div>
    </div>
  );
};

export default MobBackgroundVideoComponent;