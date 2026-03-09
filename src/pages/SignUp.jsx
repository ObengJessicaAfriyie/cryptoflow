// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CoinbaseIcon = () => (
  <svg height="36" viewBox="0 0 32 32" width="36" xmlns="http://www.w3.org/2000/svg">
    <rect fill="white" height="32" rx="50%" width="32" />
    <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 4a8 8 0 110 16A8 8 0 0116 8zm-2.5 5a2.5 2.5 0 000 5h5a2.5 2.5 0 000-5h-5z" fill="#0d0d0d" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

// ── Account type picker icons ──
const PersonalIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
    {/* Person silhouette */}
    <circle cx="24" cy="14" r="8" fill="#4a7cff" opacity="0.9"/>
    <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#4a7cff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5"/>
    {/* Checkmark badge */}
    <circle cx="34" cy="34" r="10" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1"/>
    <path d="M29 34l3.5 3.5 6-6" stroke="#4a7cff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BusinessIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
    {/* Two people */}
    <circle cx="16" cy="14" r="7" fill="#888" opacity="0.7"/>
    <path d="M4 36c0-6.627 5.373-12 12-12" stroke="#888" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5"/>
    <circle cx="30" cy="14" r="7" fill="#4a7cff" opacity="0.9"/>
    <path d="M18 36c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#4a7cff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7"/>
    {/* Coin badge */}
    <circle cx="36" cy="36" r="10" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1"/>
    <circle cx="36" cy="36" r="6" stroke="#f59e0b" strokeWidth="2" fill="none"/>
    <path d="M36 32v8M33 35h4.5" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const DeveloperIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
    {/* Diamond / layers shape */}
    <path d="M24 4L40 16L24 28L8 16L24 4Z" fill="#4a7cff" opacity="0.8"/>
    <path d="M8 16L24 28L40 16L24 44L8 16Z" fill="#4a7cff" opacity="0.4"/>
    <path d="M24 28L40 16L24 44" fill="#6a9cff" opacity="0.3"/>
  </svg>
);

const ACCOUNT_TYPES = [
  {
    id: 'personal',
    icon: <PersonalIcon />,
    title: 'Personal',
    desc: 'Trade crypto as an individual.',
  },
  {
    id: 'business',
    icon: <BusinessIcon />,
    title: 'Business',
    desc: 'Manage teams and portfolios, accept crypto payments, access APIs, and more',
  },
  {
    id: 'developer',
    icon: <DeveloperIcon />,
    title: 'Developer',
    desc: 'Build onchain using developer tooling.',
  },
];

export default function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=email, 2=account type
  const [email, setEmail] = useState('');
  const [selectedType, setSelectedType] = useState(null);

  const handleContinue = (e) => {
    e.preventDefault();
    if (email) setStep(2);
  };

  const handleAccountType = (id) => {
    setSelectedType(id);
    // Brief delay then navigate home (simulating account creation)
    setTimeout(() => navigate('/'), 300);
  };

  // ── Step 1: Email form ──
  if (step === 1) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
        {/* Logo */}
        <div className="p-6">
          <Link to="/">
            <CoinbaseIcon />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-[390px]">

            <h1 className="text-[28px] font-bold text-white mb-2 leading-tight">
              Create your account
            </h1>
            <p className="text-[15px] text-gray-400 mb-7 leading-relaxed">
              Access all that Coinbase has to offer with a single account.
            </p>

            <form onSubmit={handleContinue}>
              <label className="block text-[14px] font-semibold text-white mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-4 rounded-xl bg-[#1a1a1a] border border-[#333] text-white placeholder-gray-500 text-[15px] focus:outline-none focus:border-[#4a6cf7] transition-colors mb-4"
              />

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#2a4dd0] hover:bg-[#1e3db8] text-white font-semibold text-[15px] transition-colors mb-5"
              >
                Continue
              </button>
            </form>

            {/* OR divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-[#2a2a2a]" />
              <span className="text-[13px] text-gray-500 font-medium">OR</span>
              <div className="flex-1 h-px bg-[#2a2a2a]" />
            </div>

            {/* Social buttons */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-[#1a1a1a] hover:bg-[#222] border border-[#2a2a2a] text-white font-semibold text-[15px] transition-colors">
                <GoogleIcon />
                Sign up with Google
              </button>
              <button className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-[#1a1a1a] hover:bg-[#222] border border-[#2a2a2a] text-white font-semibold text-[15px] transition-colors">
                <AppleIcon />
                Sign up with Apple
              </button>
            </div>

            {/* Sign in link */}
            <p className="text-center text-[14px] text-white font-semibold mt-7">
              Already have an account?{' '}
              <Link to="/signin" className="text-[#4a7cff] hover:underline">
                Sign in
              </Link>
            </p>

            {/* Legal */}
            <p className="text-center text-[13px] text-gray-500 mt-5 leading-relaxed">
              By creating an account you certify that you are over the age of 18 and agree to our{' '}
              <a href="#" className="underline hover:text-gray-300">Privacy Policy</a>
              {' '}and{' '}
              <a href="#" className="underline hover:text-gray-300">Cookie Policy</a>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Step 2: Account type picker ──
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link to="/">
          <CoinbaseIcon />
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-[390px]">

          <h1 className="text-[28px] font-bold text-white mb-8 leading-tight">
            What kind of account are you creating?
          </h1>

          <div className="space-y-3">
            {ACCOUNT_TYPES.map(({ id, icon, title, desc }) => (
              <button
                key={id}
                onClick={() => handleAccountType(id)}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl border text-left transition-all ${
                  selectedType === id
                    ? 'border-[#4a7cff] bg-[#1a1a2e]'
                    : 'border-[#2a2a2a] bg-[#141414] hover:bg-[#1a1a1a] hover:border-[#3a3a3a]'
                }`}
              >
                <div className="flex-shrink-0">{icon}</div>
                <div>
                  <p className="text-[15px] font-bold text-white mb-0.5">{title}</p>
                  <p className="text-[13px] text-gray-400 leading-snug">{desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}