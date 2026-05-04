// components/crypto/Sparkline.jsx
import React from 'react';

/**
 * Mini sparkline chart for crypto price trends
 * Shows 7-day price movement as a simple line
 */
const Sparkline = ({ data = [], positive = true, width = 80, height = 36 }) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;

  // Create fill area
  const fillD = `M 0,${height} L ${points.join(' L ')} L ${width},${height} Z`;

  const color = positive ? '#05b169' : '#df3030';
  const fillColor = positive ? 'rgba(5, 177, 105, 0.1)' : 'rgba(223, 48, 48, 0.1)';

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Fill area */}
      <path d={fillD} fill={fillColor} />
      {/* Line */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Sparkline;
