// src/components/layout/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

// ── Icons ──
const AppIcon = () => (
  <svg height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
    <rect fill="#0052ff" height="32" rx="50%" width="32" />
    <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 4a8 8 0 110 16A8 8 0 0116 8zm-2.5 5a2.5 2.5 0 000 5h5a2.5 2.5 0 000-5h-5z" fill="#fff" />
  </svg>
);
const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
);
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
);
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
);
const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);

// ── IBox ──
const IBox = ({ bg = '#f3f4f6', children }) => (
  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
    {children}
  </div>
);

// ── All nav dropdown icons ──
const Icons = {
  buysell:     <IBox bg="#0052ff"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><line x1="2" y1="12" x2="22" y2="12" /></svg></IBox>,
  baseapp:     <IBox bg="#000"><svg width="16" height="16" viewBox="0 0 20 20"><rect width="20" height="20" rx="4" fill="black" /><path d="M4 14V6h5.5c2 0 3 .9 3 2.3 0 .9-.5 1.6-1.3 1.9 1 .3 1.6 1.1 1.6 2.1C12.8 13.8 11.6 14 9.5 14H4zm2-4.8h3c.9 0 1.3-.4 1.3-1s-.4-1-1.3-1H6v2zm0 3.2h3.3c1 0 1.5-.4 1.5-1.1 0-.7-.5-1.1-1.5-1.1H6v2.2z" fill="white" /></svg></IBox>,
  coinbaseone: <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg></IBox>,
  advanced:    <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg></IBox>,
  earn:        <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></svg></IBox>,
  wealth:      <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg></IBox>,
  briefcase:   <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg></IBox>,
  payments:    <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg></IBox>,
  asset:       <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2" /><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="11" /></svg></IBox>,
  tokenmanager:<IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.51" /></svg></IBox>,
  clock:       <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg></IBox>,
  custody:     <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg></IBox>,
  staking:     <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></svg></IBox>,
  exchange:    <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg></IBox>,
  intlexchange:<IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg></IBox>,
  derivatives: <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="6" height="6" /><rect x="16" y="3" width="6" height="6" /><rect x="9" y="14" width="6" height="6" /><line x1="5" y1="9" x2="5" y2="14" /><line x1="19" y1="9" x2="19" y2="14" /><line x1="5" y1="14" x2="12" y2="14" /><line x1="19" y1="14" x2="12" y2="14" /></svg></IBox>,
  devpayments: <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><line x1="2" y1="12" x2="22" y2="12" /></svg></IBox>,
  trading:     <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg></IBox>,
  wallets:     <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4z" /></svg></IBox>,
  onramp:      <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg></IBox>,
  banks:       <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="21" y2="22" /><line x1="6" y1="18" x2="6" y2="11" /><line x1="10" y1="18" x2="10" y2="11" /><line x1="14" y1="18" x2="14" y2="11" /><line x1="18" y1="18" x2="18" y2="11" /><polygon points="12 2 20 7 4 7" /></svg></IBox>,
  paymentfirms:<IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg></IBox>,
  startups:    <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg></IBox>,
  enterprise:  <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg></IBox>,
  about:       <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg></IBox>,
  affiliates:  <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" /></svg></IBox>,
  blog:        <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg></IBox>,
  careers:     <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg></IBox>,
  support:     <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg></IBox>,
  security:    <IBox><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></IBox>,
};

// ── Promo cards ──
const PROMOS = {
  Individuals: {
    visual: (<div className="w-full h-[110px] rounded-2xl bg-gradient-to-br from-[#0052ff] to-[#003de0] flex items-center justify-center mb-3"><svg width="52" height="52" viewBox="0 0 32 32"><path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 4a8 8 0 110 16A8 8 0 0116 8zm-2.5 5a2.5 2.5 0 000 5h5a2.5 2.5 0 000-5h-5z" fill="white" /></svg></div>),
    title: 'CryptoFlow Platform', desc: 'Explore the demo crypto interface.', cta: 'Learn more',
  },
  Businesses: {
    visual: (<div className="w-full h-[110px] rounded-2xl bg-gradient-to-br from-[#0052ff] to-[#6c47ff] flex items-center justify-center mb-3 relative overflow-hidden"><div className="absolute inset-0 flex items-center justify-center gap-2"><div className="w-16 h-20 bg-white/20 rounded-xl rotate-6" /><div className="w-16 h-20 bg-white rounded-xl flex items-center justify-center shadow-xl z-10"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0052ff" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg></div><div className="w-16 h-20 bg-white/20 rounded-xl -rotate-6" /></div></div>),
    title: 'Demo Features', desc: 'Educational portfolio project showcase.', cta: 'Explore',
  },
  Institutions: {
    visual: (<div className="w-full h-[110px] rounded-2xl bg-gradient-to-br from-[#0052ff] to-[#0038cc] flex items-center justify-center mb-3 overflow-hidden"><svg width="100" height="100" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" /><ellipse cx="50" cy="50" rx="25" ry="45" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" /><ellipse cx="50" cy="50" rx="45" ry="20" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />{[...Array(48)].map((_, i) => { const angle = (i/48)*2*Math.PI; const r = 30+(i%4)*5; return <circle key={i} cx={50+r*Math.cos(angle)} cy={50+r*Math.sin(angle)} r="1.5" fill="white" opacity={0.5+(i%3)*0.2} />; })}</svg></div>),
    title: 'Student Project', desc: 'Academic multimedia web development.', cta: 'Learn more',
    titleClass: 'text-[16px] font-bold underline text-gray-900',
    descClass: 'text-[14px] text-gray-400 underline mt-1 leading-snug',
  },
  Developers: {
    visual: (<div className="w-full h-[110px] rounded-2xl bg-gray-100 flex items-center justify-center mb-3 overflow-hidden relative"><div className="absolute inset-0 p-3"><div className="w-full h-full bg-white rounded-xl shadow-sm p-2 flex flex-col gap-1.5"><div className="flex gap-1"><div className="h-2 bg-[#0052ff] rounded w-8" /><div className="h-2 bg-gray-200 rounded flex-1" /></div><div className="flex gap-1 items-end h-10">{[40,65,45,80,55,90,60,75].map((h,i) => (<div key={i} className="flex-1 rounded-sm" style={{ height:`${h}%`, backgroundColor: i===5?'#0052ff':'#e5e7eb' }} />))}</div><div className="flex gap-1"><div className="h-1.5 bg-gray-200 rounded w-12" /><div className="h-1.5 bg-[#a78bfa] rounded w-8" /></div></div></div></div>),
    title: 'Educational Platform',
    desc: "Learn web development with CryptoFlow demo.",
    cta: 'Learn more',
    titleClass: 'text-[16px] font-bold text-gray-900 leading-snug',
    descClass: 'text-[14px] text-gray-400 mt-1 leading-snug',
  },
  Company: {
    visual: (<div className="w-full h-[140px] rounded-2xl bg-[#0052ff] flex items-center justify-center mb-3 relative overflow-hidden"><div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '10px 10px' }} /><p className="relative text-white text-[11px] font-bold tracking-widest uppercase text-center px-4 leading-relaxed">LEARN CRYPTO<br />BUILD YOUR SKILLS</p></div>),
    title: 'About CryptoFlow:',
    desc: "Educational demo for portfolio projects.",
    cta: 'Start exploring',
    titleClass: 'text-[16px] font-bold text-gray-900 leading-snug',
    descClass: 'text-[14px] text-gray-400 mt-1 leading-snug',
    ctaClass: 'text-[13px] font-bold text-gray-900 underline mt-2 block hover:text-[#0052ff] transition-colors',
  },
};

// ── Dropdown data ──
const DROPDOWNS = {
  Individuals: {
    type: 'simple', cols: 2,
    items: [
      { icon: Icons.buysell,     label: 'Trade',          desc: 'Buy, sell, and trade crypto' },
      { icon: Icons.advanced,    label: 'Advanced Tools', desc: 'Professional-grade trading interface' },
      { icon: Icons.baseapp,     label: 'Community',      desc: 'Connect and trade with other users' },
      { icon: Icons.earn,        label: 'Rewards',        desc: 'Stake crypto and earn returns' },
      { icon: Icons.coinbaseone, label: 'Premium',        desc: 'Explore premium features' },
      { icon: Icons.wealth,      label: 'Portfolio',      desc: 'Manage your crypto portfolio' },
    ],
  },
  Businesses: {
    type: 'simple', cols: 2,
    items: [
      { icon: Icons.briefcase,    label: 'For Business',   desc: 'Crypto solutions for businesses' },
      { icon: Icons.payments,     label: 'Payments',       desc: 'Payment integration features' },
      { icon: Icons.asset,        label: 'Listings',       desc: 'Asset listing information' },
      { icon: Icons.tokenmanager, label: 'Management',     desc: 'Crypto management tools' },
    ],
  },
  Institutions: {
    type: 'sectioned',
    sections: [
      { heading: 'Features', headingLink: true, items: [{ icon: Icons.clock, label: 'Trading', desc: 'Professional trading services' }, { icon: Icons.custody, label: 'Management', desc: 'Manage your digital assets' }, { icon: Icons.staking, label: 'Staking', desc: 'Explore staking opportunities' }] },
      { heading: 'Markets', headingLink: false, items: [{ icon: Icons.exchange, label: 'Exchange', desc: 'Spot markets' }, { icon: Icons.intlexchange, label: 'Global Market', desc: 'Access to global markets' }, { icon: Icons.derivatives, label: 'Derivatives', desc: 'Futures and derivatives trading' }] },
    ],
  },
  Developers: {
    type: 'sectioned',
    sections: [
      { heading: 'Developer Tools', headingLink: true, items: [{ icon: Icons.devpayments, label: 'Payments', desc: 'Stablecoin payment APIs' }, { icon: Icons.trading, label: 'Trading', desc: 'Trading APIs and tools' }, { icon: Icons.wallets, label: 'Wallets', desc: 'Wallet integration APIs' }, { icon: Icons.onramp, label: 'Onramp', desc: 'Fiat on-ramp functionality' }] },
      { heading: 'Use Cases', headingLink: false, items: [{ icon: Icons.banks, label: 'Finance', desc: 'For financial institutions' }, { icon: Icons.paymentfirms, label: 'Payments', desc: 'Payment processing solutions' }, { icon: Icons.startups, label: 'Startups', desc: 'For startup projects' }, { icon: Icons.enterprise, label: 'Enterprise', desc: 'Enterprise integrations' }] },
    ],
  },
  Company: {
    type: 'simple', cols: 2,
    items: [
      { icon: Icons.about,      label: 'About',      desc: 'About CryptoFlow' },
      { icon: Icons.careers,    label: 'Resources',  desc: 'Learning resources' },
      { icon: Icons.affiliates, label: 'Partners',   desc: 'Partnership opportunities' },
      { icon: Icons.support,    label: 'Support',    desc: 'Get support and help' },
      { icon: Icons.blog,       label: 'Learn',      desc: 'Learn about crypto' },
      { icon: Icons.security,   label: 'Security',   desc: 'Security information' },
    ],
  },
};

const NAV_LABELS = ['Individuals', 'Businesses', 'Institutions', 'Developers', 'Company'];

// ── Search dropdown data ──
const SEARCH_TABS = ['Top', 'Crypto', 'Stocks', 'Predictions', 'Perpetuals', 'Futures'];

const SEARCH_DATA = {
  Top: {
    sections: [
      {
        label: 'CRYPTO',
        items: [
          { icon: '₿', iconBg: '#F7931A', name: 'Bitcoin',   ticker: 'BTC',  rank: '#1', vol: 'GHS 42B vol',    mcap: 'GHS 1.4T mcap',   price: null,         change: null },
          { icon: 'Ξ', iconBg: '#627EEA', name: 'Ethereum',  ticker: 'ETH',  rank: '#2', vol: 'GHS 21B vol',    mcap: 'GHS 240.6B mcap', price: 'GHS 1,992.07', change: '+1.86%', positive: true },
          { icon: '₮', iconBg: '#26A17B', name: 'Tether',    ticker: 'USDT', rank: '#3', vol: 'GHS 79.1B vol',  mcap: 'GHS 183.9B mcap', price: 'GHS 1.00',     change: '-0.01%', positive: false },
        ],
      },
      {
        label: 'STOCKS',
        items: [
          { icon: 'N', iconBg: '#76b900', name: 'NVIDIA',              ticker: 'NVDA', rank: null, vol: 'GHS 3.6M vol', mcap: 'GHS 4.3T mcap', price: 'GHS 176.19', change: '+0.68%', positive: true },
          { icon: 'A', iconBg: '#555',    name: 'Apple',               ticker: 'AAPL', rank: null, vol: 'GHS 285.8K vol', mcap: 'GHS 3.7T mcap', price: 'GHS 255.25', change: '-0.58%', positive: false },
          { icon: 'G', iconBg: '#4285F4', name: 'Alphabet Inc. Class C', ticker: 'GOOG', rank: null, vol: 'GHS 345.8K vol', mcap: 'GHS 3.6T mcap', price: 'GHS 293.86', change: '-0.91%', positive: false },
        ],
      },
      {
        label: 'PREDICTIONS',
        items: [
          { icon: '🏌', iconBg: '#e5e7eb', name: 'THE PLAYERS Championship Winner?', ticker: 'Scottie Scheffler', rank: null, vol: null, mcap: null, price: '19%', change: '↘ 2', positive: false },
          { icon: '🏀', iconBg: '#e5e7eb', name: "Men's College Basketball Champion", ticker: 'Duke', rank: null, vol: null, mcap: null, price: '24%', change: '--', positive: true },
          { icon: '⛳', iconBg: '#e5e7eb', name: 'Masters Tournament Champion', ticker: 'Scottie Scheffler', rank: null, vol: null, mcap: null, price: '21%', change: '↗ 1', positive: true },
        ],
      },
      {
        label: 'PERPETUALS',
        items: [
          { icon: '₿', iconBg: '#F7931A', name: 'BTC PERP', ticker: 'CDE', rank: null, vol: 'GHS 506.9M vol', mcap: '-0.0011% fund', price: 'GHS 67,725.00', change: '+0.35%', positive: true },
          { icon: 'Ξ', iconBg: '#627EEA', name: 'ETH PERP', ticker: 'CDE', rank: null, vol: 'GHS 111.5M vol', mcap: '-0.0006% fund', price: 'GHS 1,992.00',  change: '+1.94%', positive: true },
          { icon: 'S', iconBg: '#9945FF', name: 'SOL PERP', ticker: 'CDE', rank: null, vol: 'GHS 27.5M vol',  mcap: '0.0001% fund',  price: 'GHS 83.61',    change: '+0.93%', positive: true },
        ],
      },
      {
        label: 'FUTURES',
        items: [
          { icon: 'S', iconBg: '#9ca3af', name: 'SLVR Futures', ticker: 'Apr 2026 · CDE', rank: null, vol: 'GHS 298.6M vol', mcap: 'GHS 13.3K oi',  price: 'GHS 83.59',     change: '-1.36%', positive: false },
          { icon: 'G', iconBg: '#f59e0b', name: 'GLD Futures',  ticker: 'Mar 2026 · CDE', rank: null, vol: 'GHS 212.7M vol', mcap: 'GHS 9.2K oi',   price: 'GHS 5,099.90',  change: '-0.32%', positive: false },
          { icon: '₿', iconBg: '#F7931A', name: 'BTC Futures',  ticker: 'Mar 2026 · CDE', rank: null, vol: 'GHS 164M vol',   mcap: 'GHS 43.8K oi',  price: 'GHS 67,960.00', change: '+0.61%', positive: true },
        ],
      },
    ],
  },
};

// Build per-tab data from Top
const buildTabData = (label) => ({
  sections: SEARCH_DATA.Top.sections.filter(s => s.label === label.toUpperCase() ||
    (label === 'Perpetuals' && s.label === 'PERPETUALS') ||
    (label === 'Futures' && s.label === 'FUTURES') ||
    (label === 'Predictions' && s.label === 'PREDICTIONS')
  ),
});

// ── Language data ──
const LANGUAGES = [
  { lang: 'English',    region: 'United States' },
  { lang: 'English',    region: 'United Kingdom' },
  { lang: 'English',    region: 'Canada' },
  { lang: 'English',    region: 'Australia' },
  { lang: 'English',    region: 'Singapore' },
  { lang: 'English',    region: 'Ireland' },
  { lang: 'English',    region: 'New Zealand' },
  { lang: 'Français',   region: 'France' },
  { lang: 'Français',   region: 'Canada' },
  { lang: 'Français',   region: 'Belgium' },
  { lang: 'Español',    region: 'Spain' },
  { lang: 'Español',    region: 'Mexico' },
  { lang: 'Español',    region: 'Argentina' },
  { lang: 'Español',    region: 'Colombia' },
  { lang: 'Português',  region: 'Brazil' },
  { lang: 'Português',  region: 'Portugal' },
  { lang: 'Deutsch',    region: 'Germany' },
  { lang: 'Deutsch',    region: 'Austria' },
  { lang: 'Deutsch',    region: 'Switzerland' },
  { lang: 'Italiano',   region: 'Italy' },
  { lang: '中文',        region: 'Singapore' },
  { lang: '中文',        region: 'Hong Kong' },
  { lang: '日本語',      region: 'Japan' },
  { lang: '한국어',      region: 'South Korea' },
  { lang: 'Nederlands', region: 'Netherlands' },
  { lang: 'Polski',     region: 'Poland' },
  { lang: 'Türkçe',     region: 'Turkey' },
  { lang: 'Русский',    region: 'Russia' },
  { lang: 'Українська', region: 'Ukraine' },
  { lang: 'العربية',    region: 'UAE' },
  { lang: 'हिन्दी',    region: 'India' },
  { lang: 'Bahasa',     region: 'Indonesia' },
  { lang: 'ภาษาไทย',   region: 'Thailand' },
  { lang: 'Tiếng Việt', region: 'Vietnam' },
  { lang: 'Filipino',   region: 'Philippines' },
  { lang: 'Svenska',    region: 'Sweden' },
  { lang: 'Norsk',      region: 'Norway' },
  { lang: 'Dansk',      region: 'Denmark' },
  { lang: 'Suomi',      region: 'Finland' },
  { lang: 'Čeština',    region: 'Czech Republic' },
  { lang: 'Română',     region: 'Romania' },
  { lang: 'Magyar',     region: 'Hungary' },
  { lang: 'Ελληνικά',  region: 'Greece' },
];

// ── Search result row ──
const SearchRow = ({ item }) => (
  <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors">
    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0"
      style={{ backgroundColor: item.iconBg }}>
      {item.icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5">
        <span className="text-[14px] font-semibold text-gray-900">{item.name}</span>
        {item.rank && <span className="text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-medium">{item.rank}</span>}
      </div>
      <div className="text-[12px] text-gray-400">{item.ticker}</div>
    </div>
    {item.vol && (
      <div className="text-right text-[12px] text-gray-400 hidden sm:block">
        <div>{item.vol}</div>
        <div>{item.mcap}</div>
      </div>
    )}
    {item.price && (
      <div className="text-right ml-4">
        <div className="text-[13px] font-semibold text-gray-900">{item.price}</div>
        <div className={`text-[12px] font-medium ${item.positive ? 'text-green-500' : 'text-red-500'}`}>{item.change}</div>
      </div>
    )}
    {!item.vol && !item.price && (
      <div className="text-right ml-4">
        <div className="text-[13px] font-semibold text-gray-900">{item.price || ''}</div>
        <div className={`text-[12px] ${item.positive ? 'text-green-500' : 'text-red-500'}`}>{item.change}</div>
      </div>
    )}
    {/* Predictions special layout */}
    {item.vol === null && item.price && (
      <div className="text-right ml-4 min-w-[50px]">
        <div className="text-[13px] font-semibold text-gray-900">{item.price}</div>
        <div className={`text-[12px] ${item.positive ? 'text-green-500' : 'text-red-500'}`}>{item.change}</div>
      </div>
    )}
  </div>
);

// ── Search dropdown panel ──
const SearchDropdown = ({ query, activeTab, setActiveTab }) => {
  const tabData = activeTab === 'Top' ? SEARCH_DATA.Top : buildTabData(activeTab);
  const sections = tabData.sections || [];

  // Filter by query if typed
  const filteredSections = query
    ? sections.map(s => ({
        ...s,
        items: s.items.filter(i =>
          i.name.toLowerCase().includes(query.toLowerCase()) ||
          i.ticker.toLowerCase().includes(query.toLowerCase())
        ),
      })).filter(s => s.items.length > 0)
    : sections;

  return (
    <div className="absolute top-full right-0 mt-1 w-[580px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
      {/* Tabs */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-gray-100 overflow-x-auto">
        {SEARCH_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="max-h-[420px] overflow-y-auto">
        {filteredSections.map(section => (
          <div key={section.label}>
            <div className="px-4 pt-3 pb-1">
              <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">{section.label}</span>
            </div>
            {section.items.map((item, i) => (
              <SearchRow key={i} item={item} />
            ))}
          </div>
        ))}
        {filteredSections.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-400 text-[14px]">
            No results for "{query}"
          </div>
        )}
      </div>
    </div>
  );
};

// ── Language dropdown ──
const LanguageDropdown = ({ onClose }) => {
  const [langSearch, setLangSearch] = useState('');
  const filtered = LANGUAGES.filter(l =>
    l.lang.toLowerCase().includes(langSearch.toLowerCase()) ||
    l.region.toLowerCase().includes(langSearch.toLowerCase())
  );

  return (
    <div className="absolute top-full right-0 mt-1 w-[320px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
      <div className="px-4 pt-4 pb-2">
        <p className="text-[15px] font-semibold text-gray-600 mb-3">Language and region</p>
        {/* Search */}
        <div className="relative mb-2">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text"
            value={langSearch}
            onChange={e => setLangSearch(e.target.value)}
            placeholder="Search"
            className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0052ff] focus:bg-white transition-all"
          />
        </div>
      </div>
      {/* Language list */}
      <div className="max-h-[300px] overflow-y-auto pb-2">
        {filtered.map((l, i) => (
          <button
            key={i}
            onClick={onClose}
            className="w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors flex items-center justify-between group"
          >
            <div>
              <p className="text-[14px] font-semibold text-gray-900">{l.lang}</p>
              <p className="text-[12px] text-gray-400">{l.region}</p>
            </div>
            <svg className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="px-4 py-4 text-[13px] text-gray-400 text-center">No languages found</p>
        )}
      </div>
    </div>
  );
};

// ── Dropdown item ──
const DropItem = ({ icon, label, desc }) => (
  <Link to="/" className="flex items-start gap-3 px-3 py-3 rounded-2xl hover:bg-gray-50 transition-colors">
    {icon}
    <div>
      <p className="text-[14px] font-bold text-gray-900 leading-tight">{label}</p>
      <p className="text-[12px] text-gray-500 leading-snug mt-0.5 max-w-[200px]">{desc}</p>
    </div>
  </Link>
);

// ── Big nav dropdown ──
const BigDropdown = ({ name, data }) => {
  const promo = PROMOS[name];
  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-xl">
      <div className="max-w-[1200px] mx-auto px-6 py-6 flex gap-8">
        {data.type === 'simple' && (
          <div className={`flex-1 grid gap-x-10 gap-y-0 content-start ${data.cols === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {data.items.map(({ icon, label, desc }) => (
              <DropItem key={label} icon={icon} label={label} desc={desc} />
            ))}
          </div>
        )}
        {data.type === 'sectioned' && (
          <div className="flex-1 grid grid-cols-2 gap-x-10">
            {data.sections.map((section) => (
              <div key={section.heading}>
                <div className="flex items-center gap-1 px-3 mb-1">
                  <span className="text-[14px] font-bold text-gray-900">{section.heading}</span>
                  {section.headingLink && <span className="text-gray-500"><ChevronRight /></span>}
                </div>
                {section.items.map(({ icon, label, desc }) => (
                  <DropItem key={label} icon={icon} label={label} desc={desc} />
                ))}
              </div>
            ))}
          </div>
        )}
        {promo && (
          <div className="w-[220px] flex-shrink-0">
            {promo.visual}
            <p className={promo.titleClass || 'text-[15px] font-bold text-gray-900 leading-snug'}>{promo.title}</p>
            <p className={promo.descClass  || 'text-[13px] text-gray-500 mt-1 leading-snug'}>{promo.desc}</p>
            <a href="#" className={promo.ctaClass || 'text-[13px] font-bold text-gray-900 underline mt-2 block hover:text-[#0052ff] transition-colors'}>{promo.cta}</a>
          </div>
        )}
      </div>
    </div>
  );
};

// ══════════════════════════════════════
// MAIN NAVBAR
// ══════════════════════════════════════
const Navbar = () => {
  const [scrolled, setScrolled]             = useState(false);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen]         = useState(false);
  const [searchQuery, setSearchQuery]       = useState('');
  const [searchTab, setSearchTab]           = useState('Top');
  const [langOpen, setLangOpen]             = useState(false);

  const timerRef    = useRef(null);
  const searchRef   = useRef(null);
  const langRef     = useRef(null);
  const location    = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setSearchOpen(false);
    setLangOpen(false);
  }, [location]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const open  = (name) => { clearTimeout(timerRef.current); setActiveDropdown(name); setSearchOpen(false); setLangOpen(false); };
  const close = ()     => { timerRef.current = setTimeout(() => setActiveDropdown(null), 150); };

  const handleSearchOpen = () => {
    setSearchOpen(true);
    setActiveDropdown(null);
    setLangOpen(false);
  };

  const handleLangToggle = () => {
    setLangOpen(v => !v);
    setSearchOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <nav className={`sticky top-0 z-30 bg-white transition-all duration-200 ${
        scrolled ? 'shadow-sm border-b border-gray-200' : 'border-b border-gray-100'
      }`}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-center h-[72px] gap-2">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 mr-3" onClick={() => setActiveDropdown(null)}>
              <AppIcon />
            </Link>

            {/* Desktop nav links — hide when search is open */}
            {!searchOpen && (
              <div className="hidden lg:flex items-center gap-0 flex-1">
                {/* Cryptocurrencies — direct link */}
                <Link
                  to="/explore"
                  className={`px-3 py-2 text-[14px] font-medium rounded-xl transition-colors whitespace-nowrap ${
                    location.pathname === '/explore' ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Cryptocurrencies
                </Link>
                {NAV_LABELS.map((label) => (
                  <div key={label} className="relative" onMouseEnter={() => open(label)} onMouseLeave={close}>
                    <button className={`flex items-center gap-1 px-3 py-2 text-[14px] font-medium rounded-xl transition-colors whitespace-nowrap ${
                      activeDropdown === label ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}>
                      {label}
                      <span className={`transition-transform duration-200 ${activeDropdown === label ? 'rotate-180' : ''}`}>
                        <ChevronDown />
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-2 ml-auto">

              {/* ── Search bar ── */}
              <div ref={searchRef} className="relative">
                {searchOpen ? (
                  /* Expanded search input */
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 border-2 border-[#0052ff] rounded-full px-4 py-2 bg-white w-[340px] transition-all">
                      <SearchIcon />
                      <input
                        autoFocus
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search"
                        className="flex-1 text-[14px] focus:outline-none bg-transparent text-gray-900 placeholder-gray-400"
                      />
                      {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                          <CloseIcon />
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                      className="text-[14px] text-gray-500 hover:text-gray-700 font-medium px-1"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  /* Collapsed search button */
                  <button
                    onClick={handleSearchOpen}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <SearchIcon />
                  </button>
                )}

                {/* Search dropdown */}
                {searchOpen && (
                  <SearchDropdown
                    query={searchQuery}
                    activeTab={searchTab}
                    setActiveTab={setSearchTab}
                  />
                )}
              </div>

              {/* ── Globe / Language ── */}
              <div ref={langRef} className="relative">
                <button
                  onClick={handleLangToggle}
                  className={`w-9 h-9 flex items-center justify-center rounded-full border transition-colors ${
                    langOpen ? 'border-[#0052ff] text-[#0052ff] bg-blue-50' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <GlobeIcon />
                </button>
                {langOpen && <LanguageDropdown onClose={() => setLangOpen(false)} />}
              </div>

              {/* Sign in / Sign up */}
              {!searchOpen && (
                <>
                  <Link to="/signin" className="px-5 py-2 text-[14px] font-semibold text-gray-900 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors ml-1">
                    Sign in
                  </Link>
                  <Link to="/signup" className="px-5 py-2 text-[14px] font-semibold text-white bg-[#0052ff] rounded-full hover:bg-[#0039b3] transition-colors">
                    Sign up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button className="lg:hidden ml-auto p-2 rounded-xl text-gray-700 hover:bg-gray-100" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen
                ? <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                : <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              }
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-lg">
            <Link to="/explore" className="block px-4 py-3 text-[14px] font-medium text-gray-700 hover:bg-gray-50 rounded-xl">Cryptocurrencies</Link>
            {NAV_LABELS.map((label) => (
              <button key={label} className="w-full text-left px-4 py-3 text-[14px] font-medium text-gray-700 hover:bg-gray-50 rounded-xl">{label}</button>
            ))}
            <div className="pt-3 flex flex-col gap-2 border-t border-gray-100 mt-2">
              <Link to="/signin" className="block w-full text-center px-5 py-3 text-[14px] font-semibold text-gray-900 border border-gray-300 rounded-full hover:bg-gray-50">Sign in</Link>
              <Link to="/signup" className="block w-full text-center px-5 py-3 text-[14px] font-semibold text-white bg-[#0052ff] rounded-full hover:bg-[#0039b3]">Sign up</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Nav dropdown panels */}
      {activeDropdown && DROPDOWNS[activeDropdown] && (
        <div className="fixed left-0 right-0 top-[64px] z-40" onMouseEnter={() => open(activeDropdown)} onMouseLeave={close}>
          <BigDropdown name={activeDropdown} data={DROPDOWNS[activeDropdown]} />
        </div>
      )}
      {activeDropdown && (
        <div className="fixed inset-0 top-[64px] z-30 bg-black/10" onMouseEnter={close} />
      )}
    </>
  );
};

export default Navbar;