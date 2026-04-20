import React, { useState, useEffect } from 'react';

const OrientationLock: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  if (!isPortrait) return null;

  return (
    <div className="orientation-warning">
      <div className="warning-content">
        <div className="phone-icon">
          <svg viewBox="0 0 24 24" width="64" height="64" fill="white">
            <path d="M17,1.01L7,1C5.9,1,5,1.9,5,3v18c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V3C19,1.9,18.1,1.01,17,1.01z M17,19H7V5h10V19z"/>
          </svg>
        </div>
        <h2>En iyi deneyim için lütfen cihazınızı yan çevirin</h2>
      </div>
    </div>
  );
};

export default OrientationLock;
