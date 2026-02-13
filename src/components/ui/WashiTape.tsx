interface WashiTapeProps {
  className?: string
  variant?: 'pink' | 'gold' | 'floral'
  rotation?: number
}

export default function WashiTape({ 
  className = '', 
  variant = 'pink',
  rotation = 0 
}: WashiTapeProps) {
  const patterns = {
    pink: {
      fill: '#FFC0CB',
      pattern: (
        <>
          <circle cx="5" cy="5" r="1.5" fill="#E30B5D" opacity="0.3" />
          <circle cx="15" cy="5" r="1.5" fill="#E30B5D" opacity="0.3" />
          <circle cx="10" cy="8" r="1" fill="#FFB347" opacity="0.4" />
        </>
      )
    },
    gold: {
      fill: '#FFB347',
      pattern: (
        <>
          <path d="M2 5 L8 5" stroke="#f5c518" strokeWidth="0.5" opacity="0.6" />
          <path d="M12 5 L18 5" stroke="#f5c518" strokeWidth="0.5" opacity="0.6" />
          <circle cx="5" cy="8" r="0.8" fill="#8b6914" opacity="0.3" />
        </>
      )
    },
    floral: {
      fill: '#FFB3D9',
      pattern: (
        <>
          <circle cx="5" cy="5" r="2" fill="#E30B5D" opacity="0.2" />
          <circle cx="5" cy="5" r="1" fill="#FFC0CB" opacity="0.4" />
          <circle cx="15" cy="5" r="2" fill="#E30B5D" opacity="0.2" />
          <circle cx="15" cy="5" r="1" fill="#FFC0CB" opacity="0.4" />
        </>
      )
    }
  }

  const selected = patterns[variant]

  return (
    <svg
      width="200"
      height="30"
      viewBox="0 0 200 30"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Define pattern */}
      <defs>
        <pattern
          id={`washi-pattern-${variant}`}
          x="0"
          y="0"
          width="20"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          {selected.pattern}
        </pattern>
        
        {/* Torn edge effect */}
        <filter id="torn-edge">
          <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>
      </defs>

      {/* Main tape rectangle with torn edges */}
      <rect
        x="0"
        y="5"
        width="200"
        height="20"
        fill={selected.fill}
        opacity="0.7"
      />
      
      {/* Pattern overlay */}
      <rect
        x="0"
        y="5"
        width="200"
        height="20"
        fill={`url(#washi-pattern-${variant})`}
        opacity="0.6"
      />

      {/* Top edge (slightly irregular) */}
      <path
        d="M0 5 Q5 4 10 5 T20 5 T30 5 T40 5 T50 5 T60 5 T70 5 T80 5 T90 5 T100 5 
           T110 5 T120 5 T130 5 T140 5 T150 5 T160 5 T170 5 T180 5 T190 5 T200 5"
        stroke={selected.fill}
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

      {/* Bottom edge (slightly irregular) */}
      <path
        d="M0 25 Q5 26 10 25 T20 25 T30 25 T40 25 T50 25 T60 25 T70 25 T80 25 T90 25 T100 25 
           T110 25 T120 25 T130 25 T140 25 T150 25 T160 25 T170 25 T180 25 T190 25 T200 25"
        stroke={selected.fill}
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

      {/* Shine effect */}
      <rect
        x="0"
        y="5"
        width="50"
        height="20"
        fill="white"
        opacity="0.2"
      />
    </svg>
  )
}