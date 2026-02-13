interface PetalProps {
    className?: string
    size?: number
  }
  
  export default function Petal({ className = '', size = 30 }: PetalProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Petal shape */}
        <path
          d="M25 5 Q35 15 25 45 Q15 15 25 5 Z"
          fill="#FFB3D9"
          opacity="0.8"
        />
        {/* Center vein */}
        <path
          d="M25 10 L25 40"
          stroke="#E30B5D"
          strokeWidth="0.5"
          opacity="0.6"
        />
        {/* Left vein */}
        <path
          d="M25 20 Q20 22 18 25"
          stroke="#E30B5D"
          strokeWidth="0.3"
          opacity="0.5"
        />
        {/* Right vein */}
        <path
          d="M25 20 Q30 22 32 25"
          stroke="#E30B5D"
          strokeWidth="0.3"
          opacity="0.5"
        />
      </svg>
    )
  }