import { useEffect } from 'react';

function useDebouncedResize(callback, delay) {
  useEffect(() => {
    let timeoutId;

    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback();
      }, delay);
    };

    // Set up the event listener
    window.addEventListener('resize', resizeListener);

    // Clean up
    return () => {
      window.removeEventListener('resize', resizeListener);
      clearTimeout(timeoutId);
    };
  }, [callback, delay]);
}

export default useDebouncedResize;