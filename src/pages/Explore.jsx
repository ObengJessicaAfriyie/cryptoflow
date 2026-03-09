// src/pages/Explore.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { cryptoData } from '../data/cryptoData';

// ── Sparkline ──
const Sparkline = ({ data = [], positive = true }) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80, h = 36;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`);
  const color = positive ? '#22c55e' : '#ef4444';
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={`M ${points.join(' L ')}`} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ── Mini area chart for market stat cards ──
const MiniChart = ({ positive = false }) => {
  const points = positive
    ? [30,28,32,27,29,25,28,24,26,22,25,20,23,18,21]
    : [20,22,19,24,21,26,23,28,22,30,25,32,27,35,30];
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const w = 160, h = 60;
  const pts = points.map((v, i) => `${(i / (points.length - 1)) * w},${h - ((v - min) / range) * (h - 10) - 5}`);
  const color = positive ? '#22c55e' : '#ef4444';
  const fillPts = `0,${h} ${pts.join(' ')} ${w},${h}`;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <polygon points={fillPts} fill={color} opacity="0.1" />
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
};

const FILTERS = ['All assets', 'Gainers', 'Losers', 'New on Coinbase', 'Tradable'];
const TIME_FILTERS = ['1D', '1W', '1M', '1Y'];
const CURRENCIES = ['USD', 'GHS', 'EUR', 'GBP'];
const ROW_OPTIONS = ['10 rows', '20 rows', '50 rows'];

const marketStats = [
  { label: 'Total market cap',  value: 'GHS 24.35T', change: '↘ 0.22%', positive: false },
  { label: 'Trade volume',      value: 'GHS 1.26T',  change: '↘ 38.29%', positive: false },
  { label: 'Buy-sell ratio',    value: 'GHS 0.79',   change: '↘ 4.42%',  positive: false },
  { label: 'BTC dominance',     value: '60.17%',     change: '↗ 0.55%',  positive: true  },
];

const newOnCoinbase = [
  { symbol: 'HYPE',    name: 'Hyperliquid', added: 'Added Feb 5',  color: '#1a1a2e' },
  { symbol: 'JUPITER', name: 'Jupiter',     added: 'Added Dec 9',  color: '#16213e' },
];

const topMovers = [
  { symbol: 'ALCX', name: 'Alchemix',  change: '+59.77%', price: 'GHS 75.64',  positive: true,  color: '#2d2d2d' },
  { symbol: 'PERP', name: 'Perpetual', change: '+26.31%', price: 'GHS 0.46',   positive: true,  color: '#10b981' },
];

const Explore = () => {
  const navigate = useNavigate();
  const [search, setSearch]           = useState('');
  const [activeFilter, setActiveFilter] = useState('All assets');
  const [timeFilter, setTimeFilter]   = useState('1D');
  const [currency, setCurrency]       = useState('USD');
  const [rowCount, setRowCount]       = useState('10 rows');
  const [sortBy, setSortBy]           = useState('marketCap');
  const [sortDir, setSortDir]         = useState('desc');
  const [page, setPage]               = useState(1);
  const [favorites, setFavorites]     = useState(new Set());

  const toggleFav = (e, id) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('desc'); }
  };

  const filtered = useMemo(() => {
    let data = [...cryptoData];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(c => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q));
    }
    if (activeFilter === 'Gainers') data = data.filter(c => c.change24h > 0);
    if (activeFilter === 'Losers')  data = data.filter(c => c.change24h < 0);
    data.sort((a, b) => {
      const aV = a[sortBy], bV = b[sortBy];
      return sortDir === 'asc' ? aV - bV : bV - aV;
    });
    return data;
  }, [search, activeFilter, sortBy, sortDir]);

  const formatPrice  = (p) => p >= 1000 ? `$${p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : p >= 1 ? `$${p.toFixed(2)}` : `$${p.toFixed(4)}`;
  const formatLarge  = (n) => n >= 1e12 ? `$${(n/1e12).toFixed(2)}T` : n >= 1e9 ? `$${(n/1e9).toFixed(2)}B` : `$${n.toLocaleString()}`;
  const SortArrow    = ({ col }) => sortBy === col ? <span className="text-[#0052ff] ml-0.5">{sortDir === 'asc' ? '↑' : '↓'}</span> : <span className="text-gray-300 ml-0.5">↕</span>;

  return (
    <div className="pt-[64px] min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row gap-6 py-8">
          {/* Left */}
          <div className="flex-1">
            <h1 className="text-[32px] font-bold text-gray-900 mb-1">Explore crypto</h1>
            <p className="text-[14px] text-gray-500 flex items-center gap-1 mb-6">
              Coinbase 50 Index is down
              <span className="text-red-500 font-medium">↘ 1.00% (24hrs)</span>
              <span className="w-4 h-4 rounded-full bg-gray-200 inline-flex items-center justify-center text-[10px] text-gray-500 cursor-help">?</span>
            </p>
            {/* Search */}
            <div className="relative max-w-[500px]">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search for an asset"
                className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-full text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0052ff] focus:bg-white transition-all"
              />
            </div>

            {/* ── Market Stats ── */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[20px] font-bold text-gray-900">Market stats</h2>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-500">←</button>
                  <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-gray-500">→</button>
                </div>
              </div>
              <p className="text-[13px] text-gray-500 mb-1">
                The overall crypto market is growing this week. As of today, the total crypto market capitalization is 24.35 trillion, representing a 4.76% increase from last week.
              </p>
              <button className="text-[13px] text-[#0052ff] font-medium mb-4">Read more</button>

              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {marketStats.map(({ label, value, change, positive }) => (
                  <div key={label} className="bg-gray-50 rounded-2xl p-4 overflow-hidden">
                    <p className="text-[12px] text-gray-500 mb-1">{label}</p>
                    <p className="text-[14px] font-bold text-gray-900">{value}</p>
                    <p className={`text-[12px] font-medium ${positive ? 'text-green-500' : 'text-red-500'}`}>{change}</p>
                    <div className="mt-2 -mx-4 -mb-4">
                      <MiniChart positive={positive} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="lg:w-[300px] space-y-4">
            {/* Get started card */}
            <div className="bg-[#0052ff] rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute right-4 top-4 w-16 h-16 opacity-80">
                <svg viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="28" fill="#fbbf24" opacity="0.9" />
                  <circle cx="32" cy="32" r="20" fill="#0052ff" />
                  <path d="M32 12C20.954 12 12 20.954 12 32s8.954 20 20 20 20-8.954 20-20S43.046 12 32 12zm0 8a12 12 0 110 24 12 12 0 010-24zm-5 7a5 5 0 000 10h10a5 5 0 000-10H27z" fill="white" />
                  <circle cx="48" cy="20" r="8" fill="#10b981" opacity="0.8" />
                  <circle cx="14" cy="42" r="6" fill="#6366f1" opacity="0.7" />
                </svg>
              </div>
              <p className="text-white font-bold text-[16px] mb-1">Get started</p>
              <p className="text-blue-200 text-[13px] mb-4">Create your account today</p>
              <button
                onClick={() => navigate('/signup')}
                className="bg-white text-gray-900 font-semibold text-[13px] px-5 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                Sign up
              </button>
            </div>

            {/* Top movers */}
            <div className="border border-gray-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-[15px]">Top movers</h3>
                <div className="flex gap-1">
                  <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400 text-xs">←</button>
                  <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400 text-xs">→</button>
                </div>
              </div>
              <p className="text-[12px] text-gray-400 mb-3">24hr change</p>
              <div className="grid grid-cols-2 gap-3">
                {topMovers.map(({ symbol, name, change, price, positive, color }) => (
                  <div key={symbol} className="bg-gray-50 rounded-xl p-3">
                    <div className="w-8 h-8 rounded-full mb-2 flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: color }}>
                      {symbol.substring(0, 2)}
                    </div>
                    <p className="text-[11px] text-gray-500">{symbol}</p>
                    <p className={`text-[16px] font-bold ${positive ? 'text-green-500' : 'text-red-500'}`}>
                      {positive ? '↗' : '↘'} {change}
                    </p>
                    <p className="text-[12px] text-gray-500">{price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Crypto Market Prices Table ── */}
        <div className="flex flex-col lg:flex-row gap-6 pb-12">
          {/* Main table */}
          <div className="flex-1">
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="text-[24px] font-bold text-gray-900">Crypto market prices</h2>
              <span className="text-[14px] text-gray-400">18,591 assets</span>
            </div>
            <p className="text-[13px] text-gray-500 mb-1">
              The overall crypto market is growing this week. As of today, the total crypto market capitalization is 24.35 trillion, representing a 4.76% increase from last week.
            </p>
            <button className="text-[13px] text-[#0052ff] font-medium mb-4">Read more</button>

            {/* Filter row */}
            <div className="flex flex-wrap gap-2 mb-4">
              {/* Asset filter */}
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full text-[13px] font-medium text-gray-700 hover:bg-gray-50">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                All assets <span className="text-gray-400">▾</span>
              </button>
              {/* Time filter */}
              <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-full text-[13px] font-medium text-gray-700 hover:bg-gray-50">
                {timeFilter} <span className="text-gray-400">▾</span>
              </button>
              {/* Currency */}
              <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-full text-[13px] font-medium text-gray-700 hover:bg-gray-50">
                {currency} <span className="text-gray-400">▾</span>
              </button>
              {/* Rows */}
              <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-full text-[13px] font-medium text-gray-700 hover:bg-gray-50">
                {rowCount} <span className="text-gray-400">▾</span>
              </button>
            </div>

            {/* Table */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 pl-4 w-8"></th>
                    <th className="text-left py-3 px-3 cursor-pointer" onClick={() => handleSort('name')}>
                      <span className="text-[13px] font-semibold text-gray-600">Asset <SortArrow col="name" /></span>
                    </th>
                    <th className="text-left py-3 px-3 cursor-pointer" onClick={() => handleSort('price')}>
                      <span className="text-[13px] font-semibold text-gray-600">Market price <SortArrow col="price" /></span>
                    </th>
                    <th className="text-left py-3 px-3 hidden sm:table-cell">
                      <span className="text-[13px] font-semibold text-gray-600">Chart</span>
                    </th>
                    <th className="text-left py-3 px-3 cursor-pointer" onClick={() => handleSort('change24h')}>
                      <span className="text-[13px] font-semibold text-gray-600">Change <SortArrow col="change24h" /></span>
                    </th>
                    <th className="text-left py-3 px-3 cursor-pointer hidden md:table-cell" onClick={() => handleSort('marketCap')}>
                      <span className={`text-[13px] font-semibold ${sortBy === 'marketCap' ? 'text-[#0052ff]' : 'text-gray-600'}`}>Mkt cap <SortArrow col="marketCap" /></span>
                    </th>
                    <th className="text-left py-3 px-3 cursor-pointer hidden lg:table-cell" onClick={() => handleSort('volume24h')}>
                      <span className="text-[13px] font-semibold text-gray-600">Volume <SortArrow col="volume24h" /></span>
                    </th>
                    <th className="text-right py-3 pr-4">
                      <span className="text-[13px] font-semibold text-gray-600">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((crypto) => {
                    const isPos = crypto.change24h >= 0;
                    return (
                      <tr
                        key={crypto.id}
                        className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => navigate(`/asset/${crypto.id}`)}
                      >
                        {/* Star */}
                        <td className="py-4 pl-4">
                          <button
                            onClick={(e) => toggleFav(e, crypto.id)}
                            className={`text-[16px] transition-colors ${favorites.has(crypto.id) ? 'text-yellow-400' : 'text-gray-300 hover:text-gray-400'}`}
                          >
                            ☆
                          </button>
                        </td>
                        {/* Asset */}
                        <td className="py-4 px-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: crypto.color }}>
                              {crypto.symbol.substring(0, 2)}
                            </div>
                            <div>
                              <p className="text-[14px] font-bold text-gray-900">{crypto.name}</p>
                              <p className="text-[12px] text-gray-400">{crypto.symbol}</p>
                            </div>
                          </div>
                        </td>
                        {/* Price */}
                        <td className="py-4 px-3">
                          <p className="text-[14px] font-medium text-gray-900">{formatPrice(crypto.price)}</p>
                        </td>
                        {/* Chart */}
                        <td className="py-4 px-3 hidden sm:table-cell">
                          <Sparkline data={crypto.sparkline} positive={isPos} />
                        </td>
                        {/* Change */}
                        <td className="py-4 px-3">
                          <span className={`text-[14px] font-medium flex items-center gap-0.5 ${isPos ? 'text-green-500' : 'text-red-500'}`}>
                            {isPos ? '↗' : '↘'} {Math.abs(crypto.change24h).toFixed(2)}%
                          </span>
                        </td>
                        {/* Market cap */}
                        <td className="py-4 px-3 hidden md:table-cell">
                          <p className="text-[14px] text-gray-600">{formatLarge(crypto.marketCap)}</p>
                        </td>
                        {/* Volume */}
                        <td className="py-4 px-3 hidden lg:table-cell">
                          <p className="text-[14px] text-gray-600">{formatLarge(crypto.volume24h)}</p>
                        </td>
                        {/* Trade button */}
                        <td className="py-4 pr-4 text-right">
                          <button
                            onClick={(e) => { e.stopPropagation(); navigate(`/asset/${crypto.id}`); }}
                            className="bg-[#0052ff] text-white text-[13px] font-semibold px-4 py-2 rounded-full hover:bg-[#0039b3] transition-colors"
                          >
                            Trade
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col items-center mt-6 gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, '...', 1860].map((p, i) => (
                  <button
                    key={i}
                    onClick={() => typeof p === 'number' && p !== 1860 && setPage(p)}
                    className={`w-9 h-9 rounded-full text-[14px] font-medium transition-colors ${
                      page === p ? 'bg-[#0052ff] text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button className="w-9 h-9 rounded-full text-[14px] text-gray-600 hover:bg-gray-100 flex items-center justify-center">›</button>
              </div>
              <p className="text-[13px] text-gray-400">1-10 of 18,591 assets</p>
            </div>

            {/* ── Blue CTA Banner ── */}
            <div className="mt-8 bg-[#0052ff] rounded-2xl p-8 flex items-center justify-between overflow-hidden relative">
              <div className="relative z-10">
                <p className="text-white text-[22px] font-bold leading-snug max-w-[320px]">
                  Create a Coinbase account to trade crypto. It's quick, easy, and secure.
                </p>
                <button
                  onClick={() => navigate('/signup')}
                  className="mt-4 bg-white text-gray-900 font-semibold text-[14px] px-6 py-3 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  Start Trading →
                </button>
              </div>
              {/* Candlestick illustration */}
              <div className="hidden md:flex items-end gap-2 h-32 pr-4 relative z-10">
                {[
                  { h: 60, color: '#ef4444', up: false },
                  { h: 45, color: '#1e40af', up: false },
                  { h: 80, color: '#22c55e', up: true  },
                  { h: 95, color: '#22c55e', up: true  },
                ].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5">
                    <div className="w-0.5 h-3 rounded" style={{ backgroundColor: bar.color }} />
                    <div className="w-8 rounded" style={{ height: `${bar.h * 0.7}px`, backgroundColor: bar.color }} />
                    <div className="w-0.5 h-3 rounded" style={{ backgroundColor: bar.color }} />
                  </div>
                ))}
                {/* Arrow */}
                <svg className="absolute -bottom-2 right-0" width="80" height="60" viewBox="0 0 80 60" fill="none">
                  <path d="M10 50 L60 10 L70 20" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M60 10 L75 15 L70 20" fill="black" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="lg:w-[300px] space-y-4 mt-[52px]">
            {/* New on Coinbase */}
            <div className="border border-gray-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-[15px]">New on Coinbase</h3>
                <div className="flex gap-1">
                  <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400 text-xs">←</button>
                  <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400 text-xs">→</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {newOnCoinbase.map(({ symbol, name, added, color }) => (
                  <div key={symbol} className="bg-gray-50 rounded-xl p-3">
                    <div className="w-10 h-10 rounded-full mb-2 flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: color }}>
                      {symbol.substring(0, 2)}
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">{symbol}</p>
                    <p className="text-[13px] font-bold text-gray-900">{name}</p>
                    <p className="text-[11px] text-gray-400">{added}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;