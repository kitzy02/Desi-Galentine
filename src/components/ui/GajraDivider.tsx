interface GajraDividerProps {
  className?: string
}

export default function GajraDivider({ className = '' }: GajraDividerProps) {
  return (
    <svg
      width="300"
      height="40"
      viewBox="0 0 300 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* String/Thread */}
      <path
        d="M0 20 Q75 15 150 20 T300 20"
        stroke="#2d6a4f"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />

      {/* Jasmine Flowers */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${30 + i * 60}, 20)`}>
          {/* Flower petals (5 petals in circle) */}
          {[0, 1, 2, 3, 4].map((petal) => (
            <ellipse
              key={petal}
              cx="0"
              cy="0"
              rx="6"
              ry="4"
              fill="#FFFDD0"
              stroke="#f5c518"
              strokeWidth="0.5"
              transform={`rotate(${petal * 72})`}
              opacity="0.9"
            />
          ))}
          
          {/* Center */}
          <circle
            cx="0"
            cy="0"
            r="2"
            fill="#f5c518"
            opacity="0.8"
          />
        </g>
      ))}

      {/* Pink bows at ends */}
      <g transform="translate(10, 20)">
        <ellipse cx="-5" cy="0" rx="6" ry="4" fill="#FFC0CB" opacity="0.8" />
        <ellipse cx="5" cy="0" rx="6" ry="4" fill="#FFC0CB" opacity="0.8" />
        <circle cx="0" cy="0" r="3" fill="#E30B5D" opacity="0.9" />
      </g>

      <g transform="translate(290, 20)">
        <ellipse cx="-5" cy="0" rx="6" ry="4" fill="#FFC0CB" opacity="0.8" />
        <ellipse cx="5" cy="0" rx="6" ry="4" fill="#FFC0CB" opacity="0.8" />
        <circle cx="0" cy="0" r="3" fill="#E30B5D" opacity="0.9" />
      </g>
    </svg>
  )
}