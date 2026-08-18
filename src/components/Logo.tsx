import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  variant?: 'dark' | 'light' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  showTagline = false,
  variant = 'dark',
  size = 'md'
}) => {
  const iconSize = size === 'sm' ? 22 : size === 'lg' ? 34 : 28;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  const textColor = variant === 'light' || variant === 'white' ? 'text-white' : 'text-slate-900';
  const subTextColor = variant === 'light' || variant === 'white' ? 'text-slate-300' : 'text-slate-500';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Geometric Tech-Tree Growth Shield Emblem */}
      <div className="relative flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          {/* Subtle Outer Tech Hex-Shield */}
          <path
            d="M18 2L32 8V18C32 26.5 26 31.8 18 34C10 31.8 4 26.5 4 18V8L18 2Z"
            fill={variant === 'white' ? 'rgba(255,255,255,0.15)' : '#0F172A'}
            stroke={variant === 'white' ? '#60A5FA' : '#2563EB'}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />

          {/* Geometric Tech-Tree Branching Node Matrix representing developmental growth */}
          {/* Central Stem Trunk */}
          <path
            d="M18 27V11"
            stroke={variant === 'white' ? '#FFFFFF' : '#38BDF8'}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Lower Growth Nodes (Age 10-12 foundation) */}
          <path
            d="M18 21L12.5 17"
            stroke={variant === 'white' ? '#93C5FD' : '#2563EB'}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle
            cx="12.5"
            cy="17"
            r="1.75"
            fill={variant === 'white' ? '#60A5FA' : '#3B82F6'}
          />

          <path
            d="M18 21L23.5 17"
            stroke={variant === 'white' ? '#93C5FD' : '#2563EB'}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle
            cx="23.5"
            cy="17"
            r="1.75"
            fill={variant === 'white' ? '#60A5FA' : '#3B82F6'}
          />

          {/* Upper Expanding Canopy Nodes (Age 13-17 independence bloom) */}
          <path
            d="M18 14L11 9.5"
            stroke={variant === 'white' ? '#BFDBFE' : '#60A5FA'}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle
            cx="11"
            cy="9.5"
            r="1.75"
            fill={variant === 'white' ? '#93C5FD' : '#38BDF8'}
          />

          <path
            d="M18 14L25 9.5"
            stroke={variant === 'white' ? '#BFDBFE' : '#60A5FA'}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle
            cx="25"
            cy="9.5"
            r="1.75"
            fill={variant === 'white' ? '#93C5FD' : '#38BDF8'}
          />

          {/* Apex Milestone Node */}
          <circle
            cx="18"
            cy="8"
            r="2.2"
            fill={variant === 'white' ? '#FFFFFF' : '#2563EB'}
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-display font-bold tracking-tight ${textSize} ${textColor}`}>
            Grow<span className="text-blue-600">Guard</span>
          </span>
          <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800">
            OS
          </span>
        </div>
        {showTagline && (
          <span className={`text-[11px] font-medium tracking-normal mt-0.5 ${subTextColor}`}>
            A Smartphone That Grows With You
          </span>
        )}
      </div>
    </div>
  );
};
