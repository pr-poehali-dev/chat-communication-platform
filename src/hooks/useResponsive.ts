
import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showServerSidebar, setShowServerSidebar] = useState(!isMobile);
  const [showChannelSidebar, setShowChannelSidebar] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowServerSidebar(true);
        setShowChannelSidebar(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleServerSidebar = () => {
    setShowServerSidebar(prev => !prev);
  };

  const toggleChannelSidebar = () => {
    setShowChannelSidebar(prev => !prev);
  };

  return {
    isMobile,
    showServerSidebar,
    showChannelSidebar,
    toggleServerSidebar,
    toggleChannelSidebar,
    setShowServerSidebar,
    setShowChannelSidebar
  };
};
