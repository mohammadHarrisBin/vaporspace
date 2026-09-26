import React from 'react';
import { Image } from '@/components/ui/image';

const LOGO_URL = 'https://media.base44.com/images/public/6ab798703b59b4a0b372ea66/2c0f691d5_generated_e237616f.png';

export default function Logo({ className = 'w-9 h-9' }) {
  return (
    <Image
      src={LOGO_URL}
      alt="VaporSpace"
      className={`rounded-lg shrink-0 ring-1 ring-border ${className}`}
      fittingType="fill"
    />
  );
}