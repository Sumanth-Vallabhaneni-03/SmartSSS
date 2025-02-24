import React, { useState, useEffect, useRef } from "react";
import "./AboutUs.css";
import flow from '../../assets/flow.png';

const AboutUs = () => {
  const [isBenefitsPopupVisible, setIsBenefitsPopupVisible] = useState(false);
  const [isOutcomesPopupVisible, setIsOutcomesPopupVisible] = useState(false);
  const [isProfitsPopupVisible, setIsProfitsPopupVisible] = useState(false);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const scrollContainer = scrollRef.current;
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
          // Reset scroll position to create a continuous loop
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 1;
        }
      }
    }, 10); // Adjust speed by changing the interval time

    return () => clearInterval(interval);
  }, []);

  // Toggle popup visibility functions
  const toggleBenefitsPopup = () => setIsBenefitsPopupVisible(!isBenefitsPopupVisible);
  const toggleOutcomesPopup = () => setIsOutcomesPopupVisible(!isOutcomesPopupVisible);
  const toggleProfitsPopup = () => setIsProfitsPopupVisible(!isProfitsPopupVisible);

  return (
    <div className="about-container">
      <h1 className="title"><strong>About SmartBridge</strong></h1>
      
      {/* Image and Benefits Card Section */}
      <div className="about-content">
        <img
          src={flow}
          alt="Smart Bridge"
          className="about-image"
        />
        <div className="info-card">
          <h2>Benefits to Students</h2>
          <ul>
            <li>Access to resources and tools that enhance learning.</li>
            <li>Opportunities to network with industry experts.</li>
            <li>Get lessons explained by their peers when  absent.</li>
            <li>Increased academic success and career growth.</li>
          </ul>
        </div>
      </div>

<br/>
      {/* Scroll Section */}
      <div className="content">
        <div className="scroll-container" ref={scrollRef}>
          <div className="text-card">
            <h2>Learners</h2>
            <p>
              Smart Bridge provides resources and <br/>opportunities for developers to learn,<br/> grow, and innovate with cutting-edge <br/>technology.
            </p>
          </div>
          <div className="text-card">
            <h2>Students</h2>
            <p>
              Students engage with peers to enhance <br/>their understanding of concepts, which <br/>makes them cope with studies when <br/>they are absent.
            </p>
          </div>
          <div className="text-card">
            <h2>Motivation</h2>
            <p>
              This platform inspires individuals <br/>by fostering a growth mindset, encouraging <br/>both personal and professional development.
            </p>
          </div>
          <div className="text-card">
            <h2>Industry Experts</h2>
            <p>
              Even industry leaders can join <br/>to provide mentorship, insights, <br/>and the latest technological advancements.
            </p>
          </div>
        </div>
      </div>

      {/* Buttons to Trigger Popups */}
      <div className="info-buttons">
        <button onClick={toggleBenefitsPopup} className="popup-trigger">
          Learn More About Benefits
        </button>
        <button onClick={toggleOutcomesPopup} className="popup-trigger">
          Learn More About Outcomes
        </button>
        <button onClick={toggleProfitsPopup} className="popup-trigger">
          Learn More About Profits
        </button>
      </div>

      {/* Benefits Popup */}
      {isBenefitsPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-envelope">
            <button onClick={toggleBenefitsPopup} className="close-popup">
              &times;
            </button>
            <div className="smartbridge-info">
              <h2>Benefits</h2>
              <ul>
                <li>Access to cutting-edge resources and tools.</li>
                <li>Networking opportunities with industry leaders.</li>
                <li>Get Lessons explained by their peers when absent.</li>
                <li>Collaborative environment for growth and innovation.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Outcomes Popup */}
      {isOutcomesPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-envelope">
            <button onClick={toggleOutcomesPopup} className="close-popup">
              &times;
            </button>
            <div className="smartbridge-info">
              <h2>Outcomes</h2>
              <ul>
                <li>Improved technical skills and knowledge.</li>
                <li>Enhanced problem-solving abilities and project management skills.</li>
                <li>Increased employability and industry connections.</li>
                <li>Confidence in tackling real-world challenges.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Profits Popup */}
      {isProfitsPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-envelope">
            <button onClick={toggleProfitsPopup} className="close-popup">
              &times;
            </button>
            <div className="smartbridge-info">
              <h2>Profits</h2>
              <ul>
                <li>Industry experts can build their personal brand.</li>
                <li>Businesses can scout for fresh talent and ideas.</li>
                <li>Increased exposure and opportunities for collaboration.</li>
                <li>Access to a pool of skilled developers and students.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
