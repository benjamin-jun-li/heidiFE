import { useState, useEffect } from 'react';

const useLoadingDots = (delay = 500) => {
  const [loadingDots, setLoadingDots] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingDots((prevDots) => {
        if (prevDots.length === 3) {
          return '';
        } else {
          return prevDots + '.';
        }
      });
    }, delay);

    return () => {
      clearInterval(timer);
    };
  }, [delay]);

  return loadingDots;
};

export default useLoadingDots;