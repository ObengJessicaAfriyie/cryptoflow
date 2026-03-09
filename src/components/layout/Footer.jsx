// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CoinbaseIcon = () => (
  <svg height="36" viewBox="0 0 32 32" width="36" xmlns="http://www.w3.org/2000/svg">
    <rect fill="#0052ff" height="32" rx="50%" width="32" />
    <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 4a8 8 0 110 16A8 8 0 0116 8zm-2.5 5a2.5 2.5 0 000 5h5a2.5 2.5 0 000-5h-5z" fill="#fff" />
  </svg>
);

const footerData = [
  {
    heading: 'Company',
    links: ['About','Careers','Affiliates','Blog','Press','Security','Investors','Vendors','Legal & privacy','Cookie policy','Cookie preferences','Digital Asset Disclosures'],
  },
  {
    heading: 'Learn',
    links: ['Explore','Market statistics','Coinbase Bytes newsletter','Crypto basics','Tips & tutorials','Crypto glossary','Market updates','What is Bitcoin?','What is crypto?','What is a blockchain?','How to set up a crypto wallet?','How to send crypto?','Taxes'],
  },
  {
    heading: 'Individuals',
    links: ['Buy & sell','Earn free crypto','Base App','Coinbase One','Debit Card'],
    subHeadings: [
      { heading: 'Businesses', links: ['Asset Listings','Coinbase Business','Payments','Commerce','Token Manager'] },
      { heading: 'Institutions', links: ['Prime','Staking','Exchange','International Exchange','Derivatives Exchange','Verified Pools'] },
    ],
  },
  {
    heading: 'Developers',
    links: ['Developer Platform','Base','Server Wallets','Embedded Wallets','Base Accounts (Smart Wallets)','Onramp & Offramp','x402','Trade API','Paymaster','OnchainKit','Data API','Verifications','Node','AgentKit','Staking','Faucet','Exchange API','International Exchange API','Prime API','Derivatives API'],
  },
  {
    heading: 'Support',
    links: ['Help center','Contact us','Create account','ID verification','Account information','Payment methods','Account access','Supported crypto','Status'],
    subHeadings: [
      {
        heading: 'Asset prices',
        links: ['Bitcoin price','Ethereum price','Solana price','XRP price'],
      },
      {
        heading: 'Stock prices',
        links: ['NVIDIA price','Apple price','Microsoft price','Amazon price'],
      },
    ],
  },
];

const FooterSection = ({ heading, links, subHeadings }) => (
  <div className="space-y-1">
    <p className="text-[14px] font-bold text-gray-900 mb-3">{heading}</p>
    {links.map(link => (
      <a key={link} href="#" className="block text-[13px] text-gray-500 hover:text-gray-800 transition-colors py-0.5">
        {link}
      </a>
    ))}
    {subHeadings?.map(sub => (
      <div key={sub.heading} className="mt-5">
        <p className="text-[14px] font-bold text-gray-900 mb-3">{sub.heading}</p>
        {sub.links.map(link => (
          <a key={link} href="#" className="block text-[13px] text-gray-500 hover:text-gray-800 transition-colors py-0.5">
            {link}
          </a>
        ))}
      </div>
    ))}
  </div>
);

const Footer = () => (
  <footer className="bg-[#f5f5f5] border-t border-gray-200">
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
      {/* Logo */}
      <div className="mb-10">
        <CoinbaseIcon />
      </div>

      {/* Link columns */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-12 border-b border-gray-300">
        {footerData.map(({ heading, links, subHeadings }) => (
          <FooterSection key={heading} heading={heading} links={links} subHeadings={subHeadings} />
        ))}
      </div>

      {/* Social + bottom bar */}
      <div className="pt-8">
        {/* Social icons */}
        <div className="flex items-center gap-5 mb-6">
          {/* X / Twitter */}
          <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.74-8.855L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </a>
          {/* LinkedIn */}
          <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          {/* Instagram */}
          <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          {/* TikTok */}
          <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z"/></svg>
          </a>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[13px] text-gray-500">© 2026 Coinbase</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[13px] text-gray-500 hover:text-gray-700">Privacy</a>
            <span className="text-gray-300">•</span>
            <a href="#" className="text-[13px] text-gray-500 hover:text-gray-700">Terms &amp; Conditions</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              Global
            </button>
            <span className="text-gray-300">•</span>
            <button className="text-[13px] text-gray-500 hover:text-gray-700">English</button>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;