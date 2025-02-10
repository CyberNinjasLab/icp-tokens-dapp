import { useState, useEffect, useCallback, useRef } from 'react';

// Custom hook that accepts a width threshold and returns if window is under that width
function useWindowWidthUnder(threshold) {
  const isBrowser = typeof window !== 'undefined';
  const observerRef = useRef(null);
  
  const [isWindowUnderThreshold, setIsWindowUnderThreshold] = useState(
    isBrowser ? window.innerWidth < threshold : false
  );

  const handleResize = useCallback(() => {
    setIsWindowUnderThreshold(window.innerWidth < threshold);
  }, [threshold]);

  useEffect(() => {
    if (!isBrowser) return;

    // Create observer only once
    if (!observerRef.current) {
      observerRef.current = new MutationObserver(handleResize);
    }

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize, { passive: true });

    // Observe body changes
    observerRef.current.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isBrowser, handleResize]); // Only re-run if these dependencies change

  return isWindowUnderThreshold;
}

export default useWindowWidthUnder;
