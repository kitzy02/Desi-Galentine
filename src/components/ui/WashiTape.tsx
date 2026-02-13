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
      </defs>

      <rect
        x="0"
        y="5"
        width="200"
        height="20"
        fill={selected.fill}
        opacity="0.7"
      />
      
      <rect
        x="0"
        y="5"
        width="200"
        height="20"
        fill={`url(#washi-pattern-${variant})`}
        opacity="0.6"
      />

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
