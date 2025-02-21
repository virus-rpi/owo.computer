"use client";
import React, { useEffect, useState } from 'react';
import './CRTEffect.css';

const CRTEffect = () => {
  const [isCRTEnabled, setIsCRTEnabled] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'c' || event.key === 'C') {
        setIsCRTEnabled(!isCRTEnabled);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCRTEnabled]);


  if ( !isCRTEnabled) {
    return null;
  }

  return (
    <>
     <style>
      {`
        body > div > main > * {
          animation: vibrate 0.1s infinite, chromatic 24s infinite;
        }
      `}
    </style>
    <div className="crt-overlay">
      <div className="crt-scanlines"></div>
      <div className="crt-static-lines"></div>
      <div className="crt-curvature"></div>
      <div className="crt-flicker"></div>
      <div className="crt-noise"></div>
      <div className="crt-curvature-cover"></div>
    </div>
      </>
  );
};

export default CRTEffect;
