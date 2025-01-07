import React from 'react';
import { useMetricsAnimation } from '../../hooks/useMetricsAnimation';

const metrics = [
  { label: 'BioNFTs Minted', value: 15000, suffix: '+' },
  { label: 'Trading Volume', value: 25, prefix: '$', suffix: 'M+' },
  { label: 'Active Users', value: 8000, suffix: '+' },
  { label: 'Research Institutions', value: 100, suffix: '+' }
];

const Metrics = () => {
  const animatedMetrics = useMetricsAnimation(metrics);

  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {animatedMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-white">
                {metric.prefix}{metric.displayValue}{metric.suffix}
              </p>
              <p className="mt-2 text-white/80">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Metrics