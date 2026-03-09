// components/crypto/CryptoRow.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sparkline from './Sparkline';

/**
 * Single row in the crypto prices table
 * Shows rank, name, price, change, market cap, sparkline
 */
const CryptoRow = ({ crypto, showRank = true }) => {
  const navigate = useNavigate();
  const isPositive = crypto.change24h >= 0;

  const formatPrice = (price) => {
    if (price >= 1000) return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(4)}`;
  };

  const formatMarketCap = (cap) => {
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`;
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(2)}B`;
    if (cap >= 1e6) return `$${(cap / 1e6).toFixed(2)}M`;
    return `$${cap.toLocaleString()}`;
  };

  const formatVolume = (vol) => {
    if (vol >= 1e9) return `$${(vol / 1e9).toFixed(2)}B`;
    if (vol >= 1e6) return `$${(vol / 1e6).toFixed(2)}M`;
    return `$${vol.toLocaleString()}`;
  };

  return (
    <tr
      className="hover:bg-gray-50 cursor-pointer transition-colors duration-150 border-b border-gray-100"
      onClick={() => navigate(`/asset/${crypto.id}`)}
    >
      {showRank && (
        <td className="py-4 pl-4 pr-2 text-sm text-gray-500 font-medium w-10">
          {crypto.rank}
        </td>
      )}
      {/* Name + Symbol */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: crypto.color }}
          >
            {crypto.symbol.substring(0, 2)}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{crypto.name}</p>
            <p className="text-xs text-gray-500">{crypto.symbol}</p>
          </div>
        </div>
      </td>
      {/* Price */}
      <td className="py-4 px-4 text-sm font-semibold text-gray-900 text-right">
        {formatPrice(crypto.price)}
      </td>
      {/* 24h Change */}
      <td className="py-4 px-4 text-right">
        <span className={`text-sm font-medium ${isPositive ? 'text-cb-green' : 'text-cb-red'}`}>
          {isPositive ? '+' : ''}{crypto.change24h.toFixed(2)}%
        </span>
      </td>
      {/* Market Cap - hidden on mobile */}
      <td className="py-4 px-4 text-sm text-gray-600 text-right hidden md:table-cell">
        {formatMarketCap(crypto.marketCap)}
      </td>
      {/* Volume - hidden on smaller screens */}
      <td className="py-4 px-4 text-sm text-gray-600 text-right hidden lg:table-cell">
        {formatVolume(crypto.volume24h)}
      </td>
      {/* Sparkline */}
      <td className="py-4 px-4 hidden sm:table-cell">
        <Sparkline data={crypto.sparkline} positive={isPositive} />
      </td>
      {/* Buy button */}
      <td className="py-4 pr-4 pl-2">
        <button
          className="text-cb-blue text-sm font-semibold hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/asset/${crypto.id}`);
          }}
        >
          Buy
        </button>
      </td>
    </tr>
  );
};

export default CryptoRow;
