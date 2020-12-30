import React from 'react';

export default function RedDot() {
  return (
    <span
      style={{
        display: 'inline-block',
        position: 'relative',
        background: 'red',
        height: '0.4em',
        width: '0.4em',
        marginRight: '2px',
        borderRadius: '50%',
        top: '1px',
      }}></span>
  );
}
