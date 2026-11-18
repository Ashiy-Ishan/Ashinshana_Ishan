import React, { useState } from 'react';
import { getImageKitUrl } from '../../config/imagekit';

function PortraitImage({ src, alt, className, imageClassName, priority }) {
  const [status, setStatus] = useState('loading');

  if (status === 'unavailable') return null;

  return (
    <div className={`role-portrait-frame ${className}`} data-image-state={status}>
      <img
        className={imageClassName}
        src={src}
        alt={alt}
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        onLoad={() => setStatus('ready')}
        onError={() => setStatus('unavailable')}
      />
    </div>
  );
}

export function RolePortrait({ source, ...props }) {
  const path = typeof source === 'string' ? source.trim() : '';
  if (!path) return null;

  const src = /^(https?:\/\/|\/\/|\/static\/|data:image\/|blob:)/i.test(path)
    ? path
    : getImageKitUrl(path);

  return <PortraitImage key={src} src={src} {...props} />;
}
