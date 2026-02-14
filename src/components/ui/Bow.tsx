interface BowProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

export default function Bow({ className = '', size = 40, ...props }: BowProps) {
  return (
    <svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        {/* Silk gradient for soft, luxurious appearance */}
        <linearGradient id="bow-silk" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5C3CB" />
          <stop offset="50%" stopColor="#D4A3A7" />
          <stop offset="100%" stopColor="#C28B8F" />
        </linearGradient>
        {/* Inner glow for silk sheen */}
        <radialGradient id="bow-sheen" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F9F0F3" opacity="0.6" />
          <stop offset="100%" stopColor="#D4A3A7" opacity="0.3" />
        </radialGradient>
      </defs>
      
      {/* Left loop - like soft organza */}
      <ellipse cx="30" cy="35" rx="26" ry="18" fill="url(#bow-silk)" stroke="#A87377" strokeWidth="1" opacity="0.9" />
      <ellipse cx="30" cy="35" rx="18" ry="12" fill="url(#bow-sheen)" />
      
      {/* Right loop - matching silk */}
      <ellipse cx="70" cy="35" rx="26" ry="18" fill="url(#bow-silk)" stroke="#A87377" strokeWidth="1" opacity="0.9" />
      <ellipse cx="70" cy="35" rx="18" ry="12" fill="url(#bow-sheen)" />
      
      {/* Center knot - deeper rose */}
      <ellipse cx="50" cy="35" rx="8" ry="10" fill="#A87377" />
      <ellipse cx="50" cy="35" rx="5" ry="7" fill="#C28B8F" opacity="0.6" />
      
      {/* Gota Patti trim accent (gold thread) */}
      <ellipse cx="50" cy="35" rx="9" ry="11" fill="none" stroke="#C5A059" strokeWidth="0.5" opacity="0.4" />
      
      {/* Left ribbon tail - flowing silk */}
      <path d="M46 42 Q38 60 28 75" stroke="#A87377" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M46 42 Q36 58 30 72 L28 75 Q40 62 46 42Z" fill="url(#bow-silk)" opacity="0.85" />
      
      {/* Right ribbon tail - flowing silk */}
      <path d="M54 42 Q62 60 72 75" stroke="#A87377" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M54 42 Q64 58 70 72 L72 75 Q60 62 54 42Z" fill="url(#bow-silk)" opacity="0.85" />
    </svg>
  )
}
