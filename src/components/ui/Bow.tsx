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
      {/* Left loop */}
      <ellipse cx="30" cy="35" rx="26" ry="18" fill="#FFC0CB" stroke="#E30B5D" strokeWidth="1.5" />
      <ellipse cx="30" cy="35" rx="18" ry="12" fill="#FFD6E7" opacity="0.6" />
      {/* Right loop */}
      <ellipse cx="70" cy="35" rx="26" ry="18" fill="#FFC0CB" stroke="#E30B5D" strokeWidth="1.5" />
      <ellipse cx="70" cy="35" rx="18" ry="12" fill="#FFD6E7" opacity="0.6" />
      {/* Center knot */}
      <ellipse cx="50" cy="35" rx="8" ry="10" fill="#E30B5D" />
      <ellipse cx="50" cy="35" rx="5" ry="7" fill="#FF85C0" opacity="0.5" />
      {/* Left ribbon tail */}
      <path d="M46 42 Q38 60 28 75" stroke="#E30B5D" strokeWidth="2" fill="none" />
      <path d="M46 42 Q36 58 30 72 L28 75 Q40 62 46 42Z" fill="#FFC0CB" />
      {/* Right ribbon tail */}
      <path d="M54 42 Q62 60 72 75" stroke="#E30B5D" strokeWidth="2" fill="none" />
      <path d="M54 42 Q64 58 70 72 L72 75 Q60 62 54 42Z" fill="#FFC0CB" />
    </svg>
  )
}
