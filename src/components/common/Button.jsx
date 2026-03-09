// components/common/Button.jsx
import React from 'react';

/**
 * Reusable Button component matching Coinbase's design system
 * Variants: primary (blue), secondary (outlined), white, text
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  ...props
}) => {
  const base = `inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`;

  const variants = {
    primary:   'bg-cb-blue text-white hover:bg-cb-blue-dark focus:ring-cb-blue',
    secondary: 'border border-gray-300 text-gray-900 bg-white hover:bg-gray-50 focus:ring-gray-300',
    white:     'bg-white text-gray-900 hover:bg-gray-100 focus:ring-white',
    outline:   'border-2 border-cb-blue text-cb-blue hover:bg-cb-blue hover:text-white focus:ring-cb-blue',
    ghost:     'text-cb-blue hover:bg-cb-blue-light focus:ring-cb-blue',
    dark:      'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900',
  };

  const sizes = {
    sm:  'text-xs px-4 py-2',
    md:  'text-sm px-5 py-2.5',
    lg:  'text-base px-6 py-3',
    xl:  'text-lg px-8 py-4',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
