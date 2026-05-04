// components/crypto/CryptoCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sparkline from './Sparkline';

/**
 * Card-style crypto display for grids/carousels
 */
const CryptoCard = ({ crypto }) => {
  const navigate = useNavigate();
  const isPositive = crypto.change24h >= 0;

  const formatPrice = (price) => {
    if (price >= 1000) return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(4)}`;
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-w-[160px]"
      onClick={() => navigate(`/asset/${crypto.id}`)}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
          style={{ backgroundColor: crypto.color }}
        >
          {crypto.symbol.substring(0, 2)}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{crypto.symbol}</p>
          <p className="text-xs text-gray-500">{crypto.name}</p>
        </div>
      </div>

      <Sparkline data={crypto.sparkline} positive={isPositive} width={120} height={40} />

      <div className="mt-2">
        <p className="text-base font-bold text-gray-900">{formatPrice(crypto.price)}</p>
        <p className={`text-sm font-medium ${isPositive ? 'text-cb-green' : 'text-cb-red'}`}>
          {isPositive ? '+' : ''}{crypto.change24h.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default CryptoCard;
