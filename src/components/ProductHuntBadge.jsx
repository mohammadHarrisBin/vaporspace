import React from 'react';

export default function ProductHuntBadge({ className = '', size = 'normal' }) {
  const dims = size === 'small' ? { width: 200, height: 43 } : { width: 250, height: 54 };
  return (
    <a
      href="https://www.producthunt.com/products/vaporspace?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-vaporspace"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block ${className}`}
    >
      <img
        alt="VaporSpace - Infinite AI canvas for system design & architecture | Product Hunt"
        width={dims.width}
        height={dims.height}
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1261831&theme=neutral&t=1790434584318"
        style={{ height: 'auto', maxWidth: '100%' }}
      />
    </a>
  );
}