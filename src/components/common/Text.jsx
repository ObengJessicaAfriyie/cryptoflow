// src/components/common/Text.jsx
import React from 'react';

/**
 * Coinbase CDS-compatible Text component
 * Usage: <Text font="display1" as="h1">Hello</Text>
 *
 * font tokens: display1 | display2 | display3
 *              title1 | title2 | title3 | title4
 *              headline | body
 *              label1 | label2 | caption | legal
 */
const Text = ({ font = 'body', as: Tag = 'p', className = '', children, ...props }) => {
  return (
    <Tag className={`cds-${font} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export default Text;
