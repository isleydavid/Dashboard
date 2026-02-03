
import React, { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  formatter?: (val: number) => string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  target, 
  duration = 2000, 
  formatter = (val) => val.toLocaleString('pt-BR') 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startCount = count;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * (target - startCount) + startCount);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target]);

  return <span>{formatter(count)}</span>;
};

export default AnimatedCounter;
