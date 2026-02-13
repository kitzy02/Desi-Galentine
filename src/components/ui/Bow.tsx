interface BowProps {
    className?: string
    size?: number
  }
  
  export default function Bow({ className = '', size = 40 }: BowProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Left bow loop */}
        <ellipse
          cx="25"
          cy="35"
          rx="20"
          ry="25"
          fill="#FFC0CB"
          stroke="#E30B5D"
          strokeWidth="2"
        />
        {/* Right bow loop */}
        <ellipse
          cx="75"
          cy="35"
          rx="20"
          ry="25"
          fill="#FFC0CB"
          stroke="#E30B5D"
          strokeWidth="2"
        />
        {/* Center knot */}
        <circle
          cx="50"
          cy="35"
          r="12"
          fill="#E30B5D"
        />
        {/* Left ribbon tail */}
        <path
          d="M30 60 L20 75 L25 77 L35 62 Z"
          fill="#FFC0CB"
          stroke="#E30B5D"
          strokeWidth="1.5"
        />
        {/* Right ribbon tail */}
        <path
          d="M70 60 L80 75 L75 77 L65 62 Z"
          fill="#FFC0CB"
          stroke="#E30B5D"
          strokeWidth="1.5"
        />
        {/* Shine effect */}
        <ellipse
          cx="22"
          cy="28"
          rx="8"
          ry="10"
          fill="white"
          opacity="0.4"
        />
        <ellipse
          cx="72"
          cy="28"
          rx="8"
          ry="10"
          fill="white"
          opacity="0.4"
        />
      </svg>
    )
  }