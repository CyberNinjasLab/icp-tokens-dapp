import { useState, useEffect } from 'react';

// Custom hook that accepts a width threshold and returns if window is under that width
function useWindowWidthUnder(threshold) {
  // Check if window is defined
  const isBrowser = typeof window !== 'undefined';

  const [isWindowUnderThreshold, setIsWindowUnderThreshold] = useState(
    isBrowser ? window.innerWidth < threshold : false
  );

  useEffect(() => {
    if (isBrowser) {
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
    }
  }, [threshold, isBrowser]); // Depend on the threshold and isBrowser to re-run the effect if they change

  return isWindowUnderThreshold;
}

export default useWindowWidthUnder;
