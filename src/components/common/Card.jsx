// components/common/Card.jsx
import React from 'react';

const Card = ({
  children,
  className = '',
  hover = false,
  padding = true,
  border = true,
  shadow = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-2xl
        ${border ? 'border border-gray-200' : ''}
        ${shadow ? 'shadow-sm' : ''}
        ${hover ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer transition-all duration-200' : ''}
        ${padding ? 'p-6' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
