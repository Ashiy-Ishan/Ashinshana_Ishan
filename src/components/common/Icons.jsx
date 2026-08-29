// src/components/common/Icons.jsx
import React from 'react';

// Brand & Social SVG Icons
export const Youtube = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const Github = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Linkedin = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Instagram = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const Facebook = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Whatsapp = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export const PremierePro = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    className={className}
    {...props}
  >
    <rect width="32" height="32" rx="7" fill="#00005B" />
    <path
      d="M8.5 9h5.2c2.6 0 4.3 1.5 4.3 3.8 0 2.4-1.7 3.8-4.3 3.8h-2.4V23H8.5V9zm2.8 5.4h2.2c1.2 0 1.9-.6 1.9-1.6s-.7-1.6-1.9-1.6h-2.2v3.2zM19.2 13.5h2.6v1.4c.5-.9 1.5-1.6 2.6-1.6.4 0 .8.1 1.1.2v2.6c-.4-.2-.9-.3-1.4-.3-1.3 0-2.3.9-2.3 2.3V23h-2.6v-9.5z"
      fill="#9999FF"
    />
  </svg>
);

export const Ballerina = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
    {...props}
  >
    <path
      d="M32 22C18.7 22 8 32.7 8 46c0 15.3 13.3 26 27.5 26 8.8 0 16.5-4.4 20.9-11l6.6-9.9c4.4-6.6 11-11 19-11 9.9 0 18.7 7.7 18.7 17.6 0 11-8.8 19.8-19.8 19.8-4.4 0-8.8-2.2-12.1-4.4l-4.4 6.6c4.4 3.3 11 5.5 16.5 5.5 15.4 0 27.5-12.1 27.5-27.5 0-14.3-12.1-26.4-26.4-26.4-9.9 0-18.7 5.5-23.1 13.2l-6.6 9.9c-4.4 5.5-9.9 8.8-16.5 8.8-11 0-19.8-8.8-19.8-19.8 0-8.8 7.7-16.5 16.5-16.5 4.4 0 8.8 2.2 12.1 4.4l4.4-6.6C45.2 25.3 38.6 22 32 22z"
      fill="#20b6b0"
    />
  </svg>
);

export const Photoshop = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    className={className}
    {...props}
  >
    <rect width="32" height="32" rx="7" fill="#001E36" />
    <path
      d="M7.5 9h5.2c2.6 0 4.3 1.5 4.3 3.8 0 2.4-1.7 3.8-4.3 3.8h-2.4V23H7.5V9zm2.8 5.4h2.2c1.2 0 1.9-.6 1.9-1.6s-.7-1.6-1.9-1.6h-2.2v3.2zM18.8 19.8c.8.6 2 1.1 3.2 1.1 1.2 0 1.8-.5 1.8-1.2 0-.7-.6-1.1-2.1-1.6-2.1-.7-3.4-1.7-3.4-3.4 0-2 1.6-3.4 4.1-3.4 1.4 0 2.6.4 3.3.9l-.7 2.1c-.6-.4-1.6-.8-2.6-.8-1.1 0-1.6.5-1.6 1.1 0 .7.6 1 2.2 1.6 2.2.8 3.3 1.8 3.3 3.5 0 2.1-1.6 3.6-4.4 3.6-1.6 0-3-.5-3.8-1.1l.7-2.4z"
      fill="#31A8FF"
    />
  </svg>
);
