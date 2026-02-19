import React, { useState } from 'react';
import BackgroundVideoComponent from '../Backgroundvideo/BackgroundVideoComponent';
import { FaInstagram,FaLinkedinIn   } from "react-icons/fa";
import { FaXTwitter,FaArrowRightLong } from "react-icons/fa6";
import MobBackgroundVideoComponent from '../Mobilebackground/Mobilebackground';





import './index.css';

const Homepage = (name) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  console.log("Homepage rendered",name);
  return (
    <div className="homepage-container">
      {/* Background Video */}
      <div className='screening'>
      <BackgroundVideoComponent onLoad={() => setVideoLoaded(true)} />
      </div>
      <div className='screening-mobile'>
      <MobBackgroundVideoComponent onLoad={() => setVideoLoaded(true)} />
      </div>
      {/* Fallback background color if video fails */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: videoLoaded ? 'transparent' : '#1a1a1a',
        zIndex: -1
      }}></div>
      
      {/* Content Overlay */}
      <div className="homepage-content">
        <div className='logo'>
        <h1 className='logoname'>NEXᐱ</h1>    
        <h2 className="subtitle">ELECTORNICS</h2></div>
        </div>
        <div className='contact-con'>
          <button className='contactbtn'>Contact Us</button>
        </div>
        <div className='main-home-content'>
          

          <h1 className='head1'>
            YOUR<br/></h1>
                      <h1 className='head'>

            ELECTRONICS<br/>
            </h1>
            <h1 className='head2'>
            HUB<br/>
          </h1>
          <p className='head-para'>Discover the latest gadgets and premium devices <br/> and smart tech for your modern lifestyle</p>
        </div>
        <div className='fallowsection'>
          <h1 className='fallowtitle'>FOLLOW US</h1>
          <p className='fallowpara'>By reaching to connect<br/> with us.You're taking the first <br/>step forward unlocking the<br/> potential of your online<br/> presence</p>
         <div className='icons'>
          <FaLinkedinIn size={20} />
<FaInstagram size={20} />
<FaXTwitter size={20} />

         </div>
        <div className='shopnowbtn'>
          <p className='shopnowtext'>Shop Now</p>
          <button className='shopbtn'><FaArrowRightLong size={20} /></button>
        </div>

        </div>
    </div>
  );
};

export default Homepage;