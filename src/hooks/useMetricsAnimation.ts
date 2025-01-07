import { useState, useEffect } from 'react';

interface Metric {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

interface AnimatedMetric extends Metric {
  displayValue: number;
}

export const useMetricsAnimation = (metrics: Metric[]): AnimatedMetric[] => {
  const [animatedMetrics, setAnimatedMetrics] = useState<AnimatedMetric[]>(
    metrics.map(metric => ({ ...metric, displayValue: 0 }))
  );

  useEffect(() => {
    const duration = 2000; // Animation duration in milliseconds
    const steps = 60; // Number of steps in the animation
    const interval = duration / steps;

    const animations = metrics.map((metric, index) => {
      let currentStep = 0;
      
      return setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const currentValue = Math.round(metric.value * progress);

        setAnimatedMetrics(prev => 
          prev.map((m, i) => 
            i === index ? { ...m, displayValue: currentValue } : m
          )
        );

        if (currentStep === steps) {
          clearInterval(animations[index]);
        }
      }, interval);
    });

    return () => animations.forEach(clearInterval);
  }, [metrics]);

  return animatedMetrics;
};