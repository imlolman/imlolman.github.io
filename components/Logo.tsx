import React from 'react';

interface LogoProps {
  size?: 'small' | 'large';
  className?: string;
  onClick?: () => void;
  text?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'large', className = '', onClick, text = 'Satyam' }) => {
  const isSmall = size === 'small';

  // Google Colors - repeating pattern
  const colorPattern = [
    'text-[#4285F4]', // Blue
    'text-[#EA4335]', // Red
    'text-[#FBBC05]', // Yellow
    'text-[#4285F4]', // Blue
    'text-[#34A853]', // Green
    'text-[#EA4335]', // Red
  ];

  const textSize = isSmall ? 'text-2xl' : 'text-5xl lg:text-[5.5rem]';
  const letterSpacing = isSmall ? 'tracking-tight' : 'tracking-tighter';

  return (
    <div
      className={`select-none google-logo-text font-medium flex items-center justify-center ${textSize} ${letterSpacing} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {text.split('').map((letter, index) => (
        <span key={index} className={colorPattern[index % colorPattern.length]}>
          {letter}
        </span>
      ))}
    </div>
  );
};