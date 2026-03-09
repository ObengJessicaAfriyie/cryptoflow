// pages/AssetDetail.jsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../components/common/Button';
import { cryptoData } from '../data/cryptoData';

// Generate mock historical price data
const generateChartData = (basePrice, change, days = 30) => {
  const data = [];
  let price = basePrice * (1 - change / 100);
  const labels = ['1H', '1D', '1W', '1M', '1Y', 'ALL'];
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const volatility = (Math.random() - 0.5) * 0.04;
    price = price * (1 + volatility);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: Math.max(price, 0.001),
    });
  }
  // Make the last point match actual price
  if (data.length > 0) data[data.length - 1].price = basePrice;
  return data;
};

const TIME_RANGES = ['1H', '1D', '1W', '1M', '1Y', 'ALL'];

const AssetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('1M');
  const [buyAmount, setBuyAmount] = useState('');
  const [tab, setTab] = useState('buy');

  const crypto = cryptoData.find(c => c.id === id);

  if (!crypto) {
    return (
      <div className="pt-24 text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Asset not found</h2>
        <Link to="/explore" className="text-cb-blue font-semibold hover:underline">← Back to prices</Link>
      </div>
    );
  }

  const isPositive = crypto.change24h >= 0;
  const chartData = generateChartData(crypto.price, crypto.change7d, timeRange === '1H' ? 1 : timeRange === '1D' ? 7 : timeRange === '1W' ? 14 : timeRange === '1M' ? 30 : 365);

  const formatPrice = (price) => {
    if (price >= 1000) return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(4)}`;
  };

  const formatMarketCap = (cap) => {
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`;
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(2)}B`;
    return `$${cap.toLocaleString()}`;
  };

  const estimatedAmount = buyAmount ? (parseFloat(buyAmount) / crypto.price).toFixed(6) : '0.000000';

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white px-3 py-2 rounded-xl text-xs">
          <p className="font-semibold">{formatPrice(payload[0].value)}</p>
          <p className="text-gray-400">{label}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/explore" className="hover:text-gray-700">Prices</Link>
          <span>›</span>
          <span className="text-gray-900 font-medium">{crypto.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main - Chart Column */}
          <div className="lg:col-span-2">
            {/* Asset Header */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: crypto.color }}
              >
                {crypto.symbol.substring(0, 2)}
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900">{crypto.name}</h1>
                <span className="text-gray-500 text-sm">{crypto.symbol}</span>
              </div>
              <div className="ml-auto text-right">
                <p className="text-3xl font-extrabold text-gray-900">{formatPrice(crypto.price)}</p>
                <p className={`text-sm font-semibold ${isPositive ? 'text-cb-green' : 'text-cb-red'}`}>
                  {isPositive ? '▲' : '▼'} {Math.abs(crypto.change24h).toFixed(2)}% today
                </p>
              </div>
            </div>

            {/* Time Range Tabs */}
            <div className="flex gap-1 mb-4">
              {TIME_RANGES.map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    timeRange === range
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            {/* Price Chart */}
            <div className="h-72 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isPositive ? '#05b169' : '#df3030'} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={isPositive ? '#05b169' : '#df3030'} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => formatPrice(v)}
                    width={80}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={isPositive ? '#05b169' : '#df3030'}
                    strokeWidth={2}
                    fill="url(#colorPrice)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* About Section */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">About {crypto.name}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{crypto.description}</p>
              <button className="text-cb-blue text-sm font-medium mt-2 hover:underline">
                Read more →
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Market cap', value: formatMarketCap(crypto.marketCap) },
                { label: '24h Volume', value: formatMarketCap(crypto.volume24h) },
                { label: 'Circulating supply', value: `${(crypto.circulatingSupply / 1e6).toFixed(2)}M ${crypto.symbol}` },
                { label: '24h High', value: formatPrice(crypto.price * 1.02) },
                { label: '24h Low', value: formatPrice(crypto.price * 0.97) },
                { label: '7d Change', value: `${crypto.change7d > 0 ? '+' : ''}${crypto.change7d.toFixed(2)}%` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white border border-gray-200 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">{label}</p>
                  <p className="text-sm font-semibold text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Buy/Sell Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-20">
              {/* Tab */}
              <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
                {['buy', 'sell'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg capitalize transition-all ${
                      tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Amount (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <input
                      type="number"
                      value={buyAmount}
                      onChange={e => setBuyAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full border border-gray-300 rounded-xl pl-8 pr-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-cb-blue focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Quick amounts */}
                <div className="flex gap-2">
                  {['$25', '$50', '$100', '$200'].map(amt => (
                    <button
                      key={amt}
                      onClick={() => setBuyAmount(amt.replace('$', ''))}
                      className="flex-1 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      {amt}
                    </button>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">You'll {tab}</span>
                    <span className="font-semibold text-gray-900">{estimatedAmount} {crypto.symbol}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">Price per coin</span>
                    <span className="font-semibold text-gray-900">{formatPrice(crypto.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">Transaction fee</span>
                    <span className="font-semibold text-gray-900">$0.99</span>
                  </div>
                </div>

                <Link to="/signup">
                  <Button
                    variant={tab === 'buy' ? 'primary' : 'dark'}
                    size="lg"
                    fullWidth
                    className="rounded-xl"
                  >
                    {tab === 'buy' ? `Buy ${crypto.symbol}` : `Sell ${crypto.symbol}`}
                  </Button>
                </Link>

                <p className="text-xs text-gray-400 text-center">
                  Sign in or create a free account to start trading.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;
