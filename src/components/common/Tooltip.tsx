import { useState } from 'react';

function Tooltip({
  label,
  direction = 'bottom',
  children,
}: {
  label: string;
  direction?: 'bottom' | 'right';
  children: React.ReactNode;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative group inline-block">
      <div
        className="cursor-pointer"
        onClick={() => {
          setShowTooltip((prev) => !prev);
        }}
      >
        {children}
      </div>

      <div
        className={`absolute ${direction === 'bottom' && 'left-1/2 mt-1 top-full px-2 py-1 -translate-x-1/2'} ${
          direction === 'right' && 'left-full top-1/2 ml-1 px-2 py-1 -translate-y-1/2'
        } 
        whitespace-nowrap rounded bg-black/70 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 z-50 ${
          showTooltip ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {label}
      </div>
    </div>
  );
}

export default Tooltip;
