// components/common/CoinbaseLogo.jsx
import React from 'react';

const CoinbaseLogo = ({ size = 32, showText = true, white = false }) => {
  const color = white ? '#ffffff' : '#0052ff';
  const textColor = white ? 'text-white' : 'text-gray-900';

  return (
    <div className="flex items-center gap-2">
      {/* Coinbase "C" icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="8" fill={color} />
        <path
          d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C20.275 26 23.946 23.435 25.6 19.75H21.2C20.018 21.36 18.125 22.4 16 22.4C12.464 22.4 9.6 19.536 9.6 16C9.6 12.464 12.464 9.6 16 9.6C18.125 9.6 20.018 10.64 21.2 12.25H25.6C23.946 8.565 20.275 6 16 6Z"
          fill="white"
        />
      </svg>
      {showText && (
        <span className={`text-xl font-bold tracking-tight ${textColor}`}>
          Coinbase
        </span>
      )}
    </div>
  );
};

export default CoinbaseLogo;
