import { useState, useEffect } from 'react';

// Custom hook that accepts a width threshold and returns if window is under that width
function useWindowWidthUnder(threshold) {
  const [isWindowUnderThreshold, setIsWindowUnderThreshold] = useState(window.innerWidth < threshold);

  useEffect(() => {
    const handleResize = () => {
      setIsWindowUnderThreshold(window.innerWidth < threshold);
    };

    // Initial check in case the initial window size is under the threshold
    handleResize();

    // Set up event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [threshold]); // Depend on the threshold to re-run the effect if it changes

  return isWindowUnderThreshold;
}

export default useWindowWidthUnder;