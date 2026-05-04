// src/pages/Home.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cryptoData } from '../data/cryptoData';
import Text from '../components/common/Text';

// ── Mock phone app chart ──
const PhoneChart = () => {
  const points = [40,42,41,45,43,47,46,50,48,53,51,56,54,59,58,63,61,66,65,70,68,74,72,78,76,82];
  const min = Math.min(...points), max = Math.max(...points), range = max - min;
  const w = 280, h = 100;
  const pts = points.map((v, i) => `${(i / (points.length - 1)) * w},${h - ((v - min) / range) * h}`);
  const fillPts = `0,${h} ${pts.join(' ')} ${w},${h}`;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={fillPts} fill="url(#chartGrad)" />
      <polyline points={pts.join(' ')} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={w} cy={pts[pts.length-1].split(',')[1]} r="4" fill="#3b82f6" />
    </svg>
  );
};

const CoinIcon = ({ symbol, color, size = 36 }) => (
  <div className="rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
    style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.32 }}>
    {symbol.substring(0, 1)}
  </div>
);

const COIN_COLORS = {
  BTC: '#F7931A', ETH: '#627EEA', USDT: '#26A17B', BNB: '#F3BA2F',
  XRP: '#00AAE4', USDC: '#2775CA', SOL: '#9945FF', ADA: '#0033AD',
};

const homeCoins = [
  { symbol: 'BTC',  name: 'Bitcoin',  price: 'GHS 730,687.65', change: '↘ 1.66%', positive: false },
  { symbol: 'ETH',  name: 'Ethereum', price: 'GHS 21,307.36',  change: '↘ 0.93%', positive: false },
  { symbol: 'USDT', name: 'Tether',   price: 'GHS 10.77',      change: '↗ 0.01%', positive: true  },
  { symbol: 'BNB',  name: 'BNB',      price: 'GHS 6,725.19',   change: '↘ 0.81%', positive: false },
  { symbol: 'XRP',  name: 'XRP',      price: 'GHS 14.61',      change: '↘ 0.32%', positive: false },
  { symbol: 'USDC', name: 'USDC',     price: 'GHS 10.77',      change: '--',       positive: true  },
];

const CryptoCircles = () => (
  <div className="relative w-[340px] h-[280px]">
    {[
      { symbol: 'C',  color: '#0052ff', size: 72, top: '30%',  left: '25%' },
      { symbol: '₿',  color: '#F7931A', size: 68, top: '38%',  left: '40%' },
      { symbol: 'Ð',  color: '#c2a633', size: 64, top: '60%',  left: '18%' },
      { symbol: 'Ξ',  color: '#627EEA', size: 60, top: '70%',  left: '45%' },
      { symbol: 'A',  color: '#1a1a2e', size: 58, top: '5%',   left: '52%' },
      { symbol: '→',  color: '#e8c84a', size: 56, top: '20%',  left: '70%' },
      { symbol: '✦',  color: '#0033AD', size: 52, top: '55%',  left: '68%' },
    ].map(({ symbol, color, size, top, left }) => (
      <div key={symbol + top}
        className="absolute rounded-full flex items-center justify-center text-white font-bold shadow-lg"
        style={{ width: size, height: size, backgroundColor: color, top, left, fontSize: size * 0.35 }}>
        {symbol}
      </div>
    ))}
  </div>
);

const LearnCard = ({ bg, title, desc, illustration }) => (
  <div className="rounded-2xl overflow-hidden">
    <div className="h-44 w-full flex items-center justify-center" style={{ backgroundColor: bg }}>
      {illustration}
    </div>
    <div className="pt-4">
      <Text font="title3" as="h3" className="text-gray-900 mb-2">{title}</Text>
      <Text font="body" as="p" className="text-gray-500 line-clamp-2">{desc}</Text>
    </div>
  </div>
);

const DemoBadge = ({ label }) => (
  <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1.5 mb-6">
    <div className="w-4 h-4 rounded-full bg-[#0052ff] flex items-center justify-center">
      <svg width="8" height="8" viewBox="0 0 32 32">
        <path d="M16 4C9.4 4 4 9.4 4 16s5.4 12 12 12 12-5.4 12-12S22.6 4 16 4zm0 4a8 8 0 110 16A8 8 0 0116 8zm-2.5 5a2.5 2.5 0 000 5h5a2.5 2.5 0 000-5h-5z" fill="white"/>
      </svg>
    </div>
    <Text font="label2" as="span" className="text-gray-700 uppercase tracking-wider">{label}</Text>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail]   = useState('');
  const [email2, setEmail2] = useState('');
  const [activeTab, setActiveTab] = useState('Tradable');

  return (
    <div className="pt-[64px] min-h-screen bg-white">

      {/* ══ 1. HERO ══ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 flex flex-col lg:flex-row items-center gap-12">
        {/* Phone mockup */}
        <div className="lg:w-[520px] flex-shrink-0">
          <div className="relative w-full max-w-[520px] h-[420px] bg-gradient-to-br from-[#1a3a8f] to-[#0052ff] rounded-[32px] overflow-hidden flex items-end justify-center">
            <div className="w-[280px] bg-white rounded-t-[28px] shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="w-5 h-5 flex flex-col gap-1 justify-center">
                  {[0,1,2].map(i => <div key={i} className="h-0.5 bg-gray-400 rounded" />)}
                </div>
                <div className="flex-1 mx-3 bg-gray-100 rounded-full px-3 py-1.5 flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <Text font="caption" as="span" className="text-gray-400">Search</Text>
                </div>
                <div className="flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#0052ff] flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 32 32"><path d="M16 4C9.4 4 4 9.4 4 16s5.4 12 12 12 12-5.4 12-12S22.6 4 16 4zm0 4a8 8 0 110 16A8 8 0 0116 8zm-2.5 5a2.5 2.5 0 000 5h5a2.5 2.5 0 000-5h-5z" fill="white"/></svg>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                </div>
              </div>
              <div className="px-4 pt-4 pb-2">
                <Text font="title1" as="p" className="text-gray-900">$33,683.80</Text>
                <div className="flex items-center gap-1">
                  <Text font="caption" as="span" className="text-green-500 font-medium">↗ $131.36 (1.38%) 1D</Text>
                  <Text font="caption" as="span" className="text-gray-400">›</Text>
                </div>
              </div>
              <div className="px-2 pb-2"><PhoneChart /></div>
              <div className="flex justify-around px-4 pb-3">
                {['1H','1D','1W','1M','1Y','All'].map(t => (
                  <Text key={t} font="caption" as="span"
                    className={`px-1 py-0.5 rounded font-medium ${t==='1D' ? 'text-[#0052ff] border-b-2 border-[#0052ff]' : 'text-gray-400'}`}>
                    {t}
                  </Text>
                ))}
              </div>
              <div className="border-t border-gray-100">
                {[
                  { icon: '◎', label: 'Crypto', val: '$14,186.12', color: '#0052ff' },
                  { icon: '$', label: 'Cash',   val: '$9,247.18',  color: '#22c55e' },
                ].map(({ icon, label, val, color }) => (
                  <div key={label} className="flex items-center justify-between px-4 py-2.5 border-b border-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: color, fontSize: 10 }}>{icon}</div>
                      <Text font="label1" as="span" className="text-gray-700">{label}</Text>
                    </div>
                    <Text font="label1" as="span" className="text-gray-900">{val}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Headline + CTA */}
        <div className="flex-1">
          <Text font="display1" as="h1" className="text-gray-900 mb-5">
            The future of finance is here.
          </Text>
          <Text font="body" as="p" className="text-gray-600 mb-8">
            Trade crypto and more on a platform you can trust.
          </Text>
          <div className="flex gap-3 max-w-md">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="satoshi@nakamoto.com"
              className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#0052ff] cds-label1"
            />
            <button onClick={() => navigate('/signup')}
              className="bg-[#0052ff] text-white px-6 py-3 rounded-full hover:bg-[#0039b3] transition-colors whitespace-nowrap cds-label1 font-semibold">
              Sign up
            </button>
          </div>
        </div>
      </section>

      {/* ══ 2. EXPLORE CRYPTO ══ */}
      <section className="bg-[#ebebeb] py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <Text font="display2" as="h2" className="text-gray-900 mb-4">
              Explore crypto like Bitcoin, Ethereum, and Dogecoin.
            </Text>
            <Text font="body" as="p" className="text-gray-500 mb-8">
              Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
            </Text>
            <button onClick={() => navigate('/explore')}
              className="bg-gray-900 text-white px-6 py-3.5 rounded-full hover:bg-gray-700 transition-colors cds-label1">
              See more assets
            </button>
          </div>

          <div className="lg:w-[480px] flex-shrink-0">
            <div className="bg-gray-900 rounded-[24px] overflow-hidden shadow-2xl">
              <div className="flex items-center gap-3 px-6 pt-5 pb-3">
                {['Tradable', 'Top gainers', 'New Assets'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`py-1.5 transition-colors cds-label1 ${
                      activeTab === tab
                        ? 'text-white bg-gray-700 px-3 rounded-full'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}>
                    {tab}
                  </button>
                ))}
              </div>
              {homeCoins.map(({ symbol, name, price, change, positive }) => (
                <div key={symbol}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-800 cursor-pointer transition-colors border-b border-gray-800 last:border-0"
                  onClick={() => navigate(`/asset/${symbol.toLowerCase()}`)}>
                  <div className="flex items-center gap-3">
                    <CoinIcon symbol={symbol} color={COIN_COLORS[symbol] || '#666'} size={36} />
                    <Text font="headline" as="span" className="text-white">{name}</Text>
                  </div>
                  <div className="text-right">
                    <Text font="headline" as="p" className="text-white">{price}</Text>
                    <Text font="caption" as="p" className={positive ? 'text-green-400' : 'text-red-400'}>{change}</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. ADVANCED TRADER ══ */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-12">
          {/* Dark trading mockup */}
          <div className="lg:w-[520px] flex-shrink-0">
            <div className="bg-gray-900 rounded-[24px] overflow-hidden p-4 shadow-2xl">
              <div className="flex gap-3">
                <div className="flex-1 bg-gray-800 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Text font="label2" as="span" className="text-white font-bold">BTC/USDC</Text>
                    <Text font="label2" as="span" className="text-green-400">▲ 2.1%</Text>
                    <div className="ml-auto flex gap-1">
                      {['1m','5m','1H','1D'].map(t => (
                        <Text key={t} font="legal" as="span"
                          className={`px-1 rounded ${t==='1D'?'bg-blue-600 text-white':'text-gray-400'}`}>{t}</Text>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-end gap-0.5 h-28 mb-2">
                    {[
                      [0.3,0.6],[0.4,0.7],[0.2,0.5],[0.5,0.8],[0.3,0.6],
                      [0.4,0.9],[0.2,0.7],[0.6,0.85],[0.4,0.75],[0.5,0.95],
                      [0.3,0.65],[0.45,0.8],[0.35,0.7],[0.5,0.9],[0.4,0.8],
                      [0.55,0.95],[0.4,0.85],[0.6,1],[0.45,0.9],[0.5,0.95],
                    ].map(([lo, hi], i) => {
                      const isGreen = i % 3 !== 1;
                      const color = isGreen ? '#22c55e' : '#ef4444';
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center justify-end" style={{ height: '100%' }}>
                          <div className="w-px" style={{ height:`${(1-hi)*100}%`, backgroundColor: color }} />
                          <div className="w-full rounded-sm" style={{ height:`${(hi-lo)*100}%`, backgroundColor: color, minHeight: 2 }} />
                          <div className="w-px" style={{ height:`${lo*30}%`, backgroundColor: color }} />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between">
                    {['$62K','$64K','$67K'].map(l => (
                      <Text key={l} font="legal" as="span" className="text-gray-500">{l}</Text>
                    ))}
                  </div>
                </div>
                <div className="w-24 bg-gray-800 rounded-xl p-2">
                  <Text font="legal" as="p" className="text-gray-400 mb-2 font-semibold uppercase tracking-wider">Order Book</Text>
                  {[['67,421','0.12'],['67,398','0.45'],['67,380','0.23']].map(([p,s]) => (
                    <div key={p} className="flex justify-between mb-1">
                      <Text font="legal" as="span" className="text-red-400">{p}</Text>
                      <Text font="legal" as="span" className="text-gray-400">{s}</Text>
                    </div>
                  ))}
                  <div className="border-t border-gray-600 my-1.5" />
                  {[['67,350','0.34'],['67,320','0.56'],['67,290','0.18']].map(([p,s]) => (
                    <div key={p} className="flex justify-between mb-1">
                      <Text font="legal" as="span" className="text-green-400">{p}</Text>
                      <Text font="legal" as="span" className="text-gray-400">{s}</Text>
                    </div>
                  ))}
                  <button className="w-full mt-2 bg-green-500 text-white py-1 rounded cds-legal font-bold">BUY</button>
                  <button className="w-full mt-1 bg-red-500 text-white py-1 rounded cds-legal font-bold">SELL</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <Text font="display2" as="h2" className="text-gray-900 mb-5">
              Powerful tools, designed for the advanced trader.
            </Text>
            <Text font="body" as="p" className="text-gray-500 mb-8">
              Powerful analytical tools designed for secure and reliable trading. Tap into sophisticated charting capabilities, real-time order books, and deep liquidity across hundreds of markets.
            </Text>
            <button onClick={() => navigate('/signup')}
              className="bg-gray-900 text-white px-6 py-3.5 rounded-full hover:bg-gray-700 transition-colors cds-label1">
              Start trading
            </button>
          </div>
        </div>
      </section>

      {/* ══ 4. PREMIUM FEATURES ══ */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <DemoBadge label="Premium" />
            <Text font="display2" as="h2" className="text-gray-900 mb-4">
              Advanced trading features for demo users.
            </Text>
            <Text font="body" as="p" className="text-gray-500 mb-8">
              Explore premium features in this educational demo: advanced tools, detailed analytics, portfolio tracking, and more.
            </Text>
            <button onClick={() => navigate('/signup')}
              className="bg-gray-900 text-white px-6 py-3.5 rounded-full hover:bg-gray-700 transition-colors cds-label1">
              Claim free trial
            </button>
          </div>

          <div className="lg:w-[460px] flex-shrink-0">
            <div className="bg-gray-100 rounded-[32px] p-6">
              <div className="bg-white rounded-[24px] overflow-hidden shadow-xl mx-auto max-w-[260px]">
                <div className="flex items-center justify-between px-4 py-2">
                  <Text font="label1" as="span" className="font-semibold">3:57</Text>
                  <div className="flex items-center gap-1">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="#111"><rect x="0" y="2" width="2" height="6" rx="0.5"/><rect x="3" y="1" width="2" height="7" rx="0.5"/><rect x="6" y="0" width="2" height="8" rx="0.5"/><rect x="9" y="0" width="2" height="8" rx="0.5" opacity="0.3"/></svg>
                    <svg width="20" height="10" viewBox="0 0 20 10" fill="none"><rect x="0" y="1" width="17" height="8" rx="2" stroke="#111" strokeWidth="1"/><rect x="1" y="2" width="13" height="6" rx="1" fill="#111"/></svg>
                  </div>
                </div>
                <div className="px-5 py-4 text-center">
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    <div className="w-16 h-16 bg-[#0052ff] rounded-full flex items-center justify-center">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-black text-[10px] font-bold">✦</span>
                    </div>
                  </div>
                  <Text font="headline" as="p" className="text-gray-900">Trade successful!</Text>
                  <Text font="caption" as="p" className="text-gray-400 mt-1">You got 0.012423 BTC</Text>
                </div>
                <div className="mx-4 mb-3 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex items-center gap-2">
                  <Text font="caption" as="span" className="text-gray-500 line-through">$14.68</Text>
                  <div className="flex items-center gap-1 ml-1">
                    <div className="w-3 h-3 rounded-full bg-[#0052ff]" />
                    <Text font="legal" as="span" className="font-semibold text-[#0052ff]">No trading fees with Premium</Text>
                  </div>
                </div>
                <div className="mx-4 mb-4 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 flex items-center justify-between">
                  <div>
                    <Text font="label2" as="p" className="text-gray-900">Exclusive member benefits</Text>
                    <Text font="legal" as="p" className="text-gray-500 mt-0.5">Premium members get boosted staking rewards.</Text>
                    <a href="#" className="cds-legal font-medium text-[#0052ff] mt-1 block">Learn more</a>
                  </div>
                  <div className="w-10 h-10 bg-[#0052ff] rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. BASE APP ══ */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-[460px] flex-shrink-0">
            <div className="bg-gray-100 rounded-[32px] p-6">
              <div className="bg-white rounded-[24px] overflow-hidden shadow-xl mx-auto max-w-[260px]">
                <div className="flex border-b border-gray-100 px-4 py-2">
                  {['Trade','Talk'].map(t => (
                    <button key={t} className={`mr-4 pb-1 cds-headline ${t==='Trade' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400'}`}>{t}</button>
                  ))}
                  <div className="ml-auto w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                </div>
                <div className="px-3 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-purple-500" />
                    <Text font="label2" as="p" className="text-gray-900">jasmine</Text>
                    <Text font="legal" as="span" className="ml-auto text-gray-300">1g ···</Text>
                  </div>
                  <Text font="caption" as="p" className="text-gray-600 mb-2">Detail on my new painting</Text>
                  <div className="w-full h-28 rounded-xl overflow-hidden relative mb-2"
                    style={{ background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 25%, #fff 50%, #a1c4fd 75%, #c2e9fb 100%)' }}>
                    <div className="absolute bottom-2 right-2 bg-white rounded-full px-2 py-1 flex items-center gap-1 shadow">
                      <div className="w-3 h-3 rounded-full bg-[#0052ff]" />
                      <Text font="legal" as="span" className="font-bold">$1.00</Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Text font="legal" as="span" className="text-gray-400">🔁 1.5K</Text>
                    <Text font="legal" as="span" className="text-gray-400">📈 $21K</Text>
                  </div>
                </div>
                <div className="border-t border-gray-50 px-3 py-2">
                  <Text font="legal" as="p" className="text-gray-600">lilfox bought $10 of $VIRTUAL <span className="text-gray-300">15m ···</span></Text>
                </div>
                <div className="px-3 py-2 border-t border-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <Text font="legal" as="span" className="text-white font-bold">V</Text>
                      </div>
                      <div>
                        <Text font="label2" as="p" className="text-gray-900">Virtual Protocol</Text>
                        <Text font="legal" as="p" className="text-gray-400">VIRTUAL</Text>
                      </div>
                    </div>
                    <div className="text-right">
                      <Text font="label2" as="p" className="text-gray-900">$742M</Text>
                      <Text font="legal" as="p" className="text-gray-400">Market Cap</Text>
                    </div>
                  </div>
                  <svg width="100%" height="20" viewBox="0 0 200 20" preserveAspectRatio="none" className="mt-1">
                    <polyline points="0,15 20,14 40,13 60,11 80,10 100,9 120,8 140,6 160,5 180,4 200,2" fill="none" stroke="#22c55e" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div className="border-t border-gray-100 px-4 py-2 flex justify-around">
                  {['⌂','⌕','⇄','🔔','☰'].map(icon => (
                    <button key={icon} className="text-gray-400 text-base">{icon}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <DemoBadge label="Community" />
            <Text font="display2" as="h2" className="text-gray-900 mb-4">
              Connect and explore the crypto community.
            </Text>
            <Text font="body" as="p" className="text-gray-500 mb-8">
              An interactive platform to discover assets, learn, trade, and chat, all in one place. This is an educational demo.
            </Text>
            <button onClick={() => navigate('/signup')}
              className="bg-gray-900 text-white px-6 py-3.5 rounded-full hover:bg-gray-700 transition-colors cds-label1">
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* ══ 6. LEARN CRYPTO ══ */}
      <section className="py-16 bg-[#ebebeb]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
            <Text font="display2" as="h2" className="text-gray-900 max-w-xs">
              New to crypto? Learn some crypto basics
            </Text>
            <div className="md:max-w-sm">
              <Text font="body" as="p" className="text-gray-500 mb-6">
                Beginner guides, practical tips, and market updates for first-timers, experienced investors, and everyone in between
              </Text>
              <button onClick={() => navigate('/learn')}
                className="bg-gray-900 text-white px-6 py-3.5 rounded-full hover:bg-gray-700 transition-colors cds-label1">
                Read More
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <LearnCard bg="#111"
              title="USDC: The digital dollar for the global crypto economy"
              desc="We believe crypto will be part of the solution for creating an open financial system that is both more efficient and more..."
              illustration={
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-[#0052ff] flex items-center justify-center relative">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                    {['#ef4444','#22c55e','#f59e0b','#3b82f6'].map((c, i) => (
                      <div key={i} className="absolute rounded-full border-2 opacity-70"
                        style={{ width: 80+(i*20), height: 80+(i*20), borderColor: c, transform: `rotate(${i*30}deg)` }} />
                    ))}
                  </div>
                </div>
              }
            />
            <LearnCard bg="#3b82f6"
              title="Can crypto really replace your bank account?"
              desc={`If you're a big enough fan of crypto, you've probably heard the phrase "be your own bank" or the term "bankless" — the idea being that...`}
              illustration={
                <div className="flex items-center justify-center h-full">
                  <div className="relative">
                    <div className="w-28 h-20 bg-white rounded-t-lg flex flex-col items-center justify-end pb-1 relative">
                      <div className="absolute -top-4 w-0 h-0" style={{ borderLeft:'60px solid transparent', borderRight:'60px solid transparent', borderBottom:'20px solid white' }} />
                      <div className="flex gap-1">
                        {[0,1,2,3].map(i => <div key={i} className="w-3 h-10 bg-gray-200 rounded-sm" />)}
                      </div>
                    </div>
                    {['-top-2 left-2', '-top-2 right-2'].map((pos, i) => (
                      <div key={i} className={`absolute ${pos} w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center`}>
                        <span className="text-yellow-700 text-[10px] font-bold">✦</span>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />
            <LearnCard bg="#9ca3af"
              title="When is the best time to invest in crypto?"
              desc="Cryptocurrencies like Bitcoin can experience daily (or even hourly) price volatility. As with any kind of investment, volatility may cause..."
              illustration={
                <div className="flex items-center justify-center h-full">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg z-10 relative">
                      <span className="text-white font-bold text-2xl">₿</span>
                    </div>
                    {[
                      { icon: '🔒', pos: '-top-8 -left-8',   color: '#22c55e' },
                      { icon: '📊', pos: 'top-0 -right-10',  color: '#ef4444' },
                      { icon: '🔷', pos: '-bottom-6 -left-10',color: '#3b82f6' },
                      { icon: '⬛', pos: '-bottom-8 right-0', color: '#111'    },
                      { icon: '🌐', pos: '-top-4 right-4',    color: '#0052ff' },
                    ].map(({ icon, pos, color }) => (
                      <div key={icon} className={`absolute ${pos} w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm`} style={{ backgroundColor: color }}>
                        {icon}
                      </div>
                    ))}
                    <div className="absolute -bottom-8 left-4 text-[28px]">🤚</div>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* ══ 7. TAKE CONTROL ══ */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <Text font="display1" as="h2" className="text-gray-900 mb-4">
              Take control of your money
            </Text>
            <Text font="body" as="p" className="text-gray-500 mb-8">
              Start your portfolio today and discover crypto
            </Text>
            <div className="flex gap-3 max-w-md">
              <input
                type="email"
                value={email2}
                onChange={e => setEmail2(e.target.value)}
                placeholder="satoshi@nakamoto.com"
                className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#0052ff] cds-label1"
              />
              <button onClick={() => navigate('/signup')}
                className="bg-[#0052ff] text-white px-6 py-3 rounded-full hover:bg-[#0039b3] transition-colors whitespace-nowrap cds-label1 font-semibold">
                Sign up
              </button>
            </div>
          </div>
          <div className="lg:w-[400px] flex-shrink-0 flex items-center justify-center">
            <CryptoCircles />
          </div>
        </div>
      </section>

      {/* ══ 8. LEGAL DISCLAIMER ══ */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <Text font="caption" as="p" className="text-gray-400 mb-3">
            DEX trading is available on our platform.
          </Text>
          <Text font="legal" as="p" className="text-gray-400">
            Products and features may not be available in all regions. Information is for or informational purposes only, and is not (i) an offer, or solicitation of an offer, to invest in, or to buy or sell, any interests or shares, or to participate in any investment or trading strategy or (ii) intended to provide accounting, legal, or tax advice, or investment recommendations. Trading cryptocurrency comes with risk.
          </Text>
        </div>
      </section>

    </div>
  );
};

export default Home;