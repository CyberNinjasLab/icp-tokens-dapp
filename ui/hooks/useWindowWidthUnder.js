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

      // Set up the resize event listener
      window.addEventListener('resize', handleResize);

      // Set up MutationObserver to monitor changes to the body element
      const observer = new MutationObserver(() => {
        // Trigger resize logic when body changes
        handleResize();
      });

      // Observe changes in the body element
      observer.observe(document.body, { attributes: true, childList: true, subtree: true });

      // Cleanup function to remove event listener and observer when component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
        observer.disconnect(); // Disconnect the observer
      };
    }
  }, [threshold, isBrowser]); // Depend on the threshold and isBrowser to re-run the effect if they change

  return isWindowUnderThreshold;
}

export default useWindowWidthUnder;
