import { useEffect, useState } from 'react';

const MAX_HEIGHT = 1500;
const MAX_WIDTH = 2000;

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let _timeout;

    const handleResize = () => {
      if (_timeout) {
        clearTimeout(_timeout);
      }

      _timeout = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 500);
    };

    window.addEventListener('resize', handleResize);

    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    maxWidth: MAX_WIDTH,
    maxHeight: MAX_HEIGHT,
    width: Math.min(windowSize.width, MAX_WIDTH),
    height: Math.min(windowSize.height, MAX_HEIGHT),
  };
}
