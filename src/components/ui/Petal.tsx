interface PetalProps extends React.SVGProps<SVGSVGElement> {
    size?: number
  }
  
  export default function Petal({ className = '', size = 30, ...props }: PetalProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        {/* Main petal shape - like dried rose petal */}
        <path
          d="M25 5 Q35 15 25 45 Q15 15 25 5 Z"
          fill="#E5C3CB"
          opacity="0.7"
        />
        {/* Center vein - delicate */}
        <path
          d="M25 10 L25 40"
          stroke="#C28B8F"
          strokeWidth="0.5"
          opacity="0.6"
        />
        {/* Left vein branch */}
        <path
          d="M25 20 Q20 22 18 25"
          stroke="#C28B8F"
          strokeWidth="0.3"
          opacity="0.5"
        />
        {/* Right vein branch */}
        <path
          d="M25 20 Q30 22 32 25"
          stroke="#C28B8F"
          strokeWidth="0.3"
          opacity="0.5"
        />
      </svg>
    )
  }
  