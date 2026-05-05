// src/components/common/EducationalDisclaimer.jsx
/**
 * Educational Disclaimer Component
 * 
 * This component displays a prominent disclaimer that this is an educational demo,
 * not a real cryptocurrency exchange. It should be used on all key pages.
 * 
 * Uses React context to notify the app when it's closed for smooth navbar positioning.
 */

import React, { useState, createContext, useContext } from 'react';

// Create context for disclaimer visibility
export const DisclaimerContext = createContext();

export const DisclaimerProvider = ({ children }) => {
  const [disclaimerVisible, setDisclaimerVisible] = useState(true);

  return (
    <DisclaimerContext.Provider value={{ disclaimerVisible, setDisclaimerVisible }}>
      {children}
    </DisclaimerContext.Provider>
  );
};

export const useDisclaimer = () => {
  const context = useContext(DisclaimerContext);
  if (!context) {
    throw new Error('useDisclaimer must be used within DisclaimerProvider');
  }
  return context;
};

export default function EducationalDisclaimer() {
  const { disclaimerVisible, setDisclaimerVisible } = useDisclaimer();

  if (!disclaimerVisible) return null;

  return (
    <div className="sticky top-0 z-40 w-full bg-gradient-to-r from-yellow-950 to-orange-950 border-b-2 border-yellow-800 px-4 py-1">
      <div className="max-w-[1200px] mx-auto flex items-start gap-3">
        {/* Warning Icon */}
        <svg
          className="w-5 h-5 text-yellow-100 flex-shrink-0 mt-0.5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>

        {/* Disclaimer Text */}
        <div className="flex-1">
          <h3 className="text-yellow-100 font-bold text-sm mb-1">
            ⚠️ EDUCATIONAL DEMO ONLY
          </h3>
          <p className="text-yellow-100/90 text-xs leading-relaxed">
            This is an educational cryptocurrency demo project created by students. 
            <strong> It is NOT a real cryptocurrency exchange</strong> and is 
            <strong> NOT affiliated with Coinbase or any financial institution</strong>. 
            No real transactions occur. This is portfolio/academic work only.
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setDisclaimerVisible(false)}
          className="text-yellow-100 hover:text-yellow-50 flex-shrink-0 mt-1 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close disclaimer"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

/**
 * Usage:
 * 
 * Import and place at the top of pages:
 * 
 * import EducationalDisclaimer from '../components/common/EducationalDisclaimer';
 * 
 * function MyPage() {
 *   return (
 *     <>
 *       <EducationalDisclaimer />
 *       ... rest of page ...
 *     </>
 *   );
 * }
 */
