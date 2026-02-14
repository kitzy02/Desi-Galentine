interface GajraDividerProps {
  className?: string
}

export default function GajraDivider({ className = '' }: GajraDividerProps) {
  return (
    <svg
      width="340"
      height="60"
      viewBox="0 0 340 60"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Soft glow for flowers */}
        <filter id="gajra-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Radial gradient for flower petals */}
        <radialGradient id="petal-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFEF5" />
          <stop offset="60%" stopColor="#FFF8E7" />
          <stop offset="100%" stopColor="#F5E6C8" />
        </radialGradient>
        <radialGradient id="petal-grad-pink" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF0F5" />
          <stop offset="60%" stopColor="#FFD6E7" />
          <stop offset="100%" stopColor="#FFB3D0" />
        </radialGradient>
        {/* Leaf gradient */}
        <linearGradient id="leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A5B38C" />
          <stop offset="100%" stopColor="#8F9779" />
        </linearGradient>
      </defs>

      {/* Draped thread with natural curve */}
      <path
        d="M15 28 C60 22, 100 18, 170 20 S280 22, 325 28"
        stroke="#8F9779"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />
      <path
        d="M15 28 C60 22, 100 18, 170 20 S280 22, 325 28"
        stroke="#A5B38C"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
        strokeDasharray="3 6"
      />

      {/* Small leaves scattered along the thread */}
      {[
        { x: 45, y: 24, r: -30, s: 0.7 },
        { x: 105, y: 20, r: 20, s: 0.6 },
        { x: 200, y: 19, r: -15, s: 0.65 },
        { x: 260, y: 22, r: 25, s: 0.7 },
      ].map((leaf, i) => (
        <g key={`leaf-${i}`} transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.r}) scale(${leaf.s})`}>
          <path
            d="M0 0 C4 -6, 10 -6, 12 0 C10 2, 4 2, 0 0Z"
            fill="url(#leaf-grad)"
            opacity="0.7"
          />
          <path
            d="M1 0 L11 0"
            stroke="#8F9779"
            strokeWidth="0.4"
            opacity="0.5"
          />
        </g>
      ))}

      {/* Jasmine flowers - 7 flowers along the gajra */}
      {[
        { x: 30, y: 26, scale: 0.9, type: 'jasmine' },
        { x: 72, y: 22, scale: 1.0, type: 'jasmine' },
        { x: 115, y: 19, scale: 0.85, type: 'rose' },
        { x: 160, y: 19, scale: 1.1, type: 'jasmine' },
        { x: 205, y: 19, scale: 0.9, type: 'rose' },
        { x: 248, y: 22, scale: 1.0, type: 'jasmine' },
        { x: 290, y: 25, scale: 0.85, type: 'jasmine' },
      ].map((flower, i) => (
        <g key={`flower-${i}`} transform={`translate(${flower.x}, ${flower.y}) scale(${flower.scale})`} filter="url(#gajra-glow)">
          {flower.type === 'jasmine' ? (
            <>
              {/* Jasmine: 5 rounded petals */}
              {[0, 1, 2, 3, 4].map((p) => (
                <ellipse
                  key={p}
                  cx={Math.cos((p * 72 - 90) * Math.PI / 180) * 7}
                  cy={Math.sin((p * 72 - 90) * Math.PI / 180) * 7}
                  rx="5.5"
                  ry="4.5"
                  fill="url(#petal-grad)"
                  stroke="#E8D5A3"
                  strokeWidth="0.3"
                  opacity="0.95"
                  transform={`rotate(${p * 72}, ${Math.cos((p * 72 - 90) * Math.PI / 180) * 7}, ${Math.sin((p * 72 - 90) * Math.PI / 180) * 7})`}
                />
              ))}
              {/* Inner petals - smaller, slightly offset */}
              {[0, 1, 2, 3, 4].map((p) => (
                <ellipse
                  key={`inner-${p}`}
                  cx={Math.cos(((p * 72) + 36 - 90) * Math.PI / 180) * 4}
                  cy={Math.sin(((p * 72) + 36 - 90) * Math.PI / 180) * 4}
                  rx="3.5"
                  ry="3"
                  fill="#FFFEF8"
                  opacity="0.8"
                />
              ))}
              {/* Center pistil */}
              <circle cx="0" cy="0" r="2.5" fill="#f5c518" opacity="0.9" />
              <circle cx="0" cy="0" r="1.2" fill="#e6b800" opacity="0.7" />
              {/* Tiny stamens */}
              {[0, 1, 2].map((s) => (
                <circle
                  key={`stamen-${s}`}
                  cx={Math.cos(s * 120 * Math.PI / 180) * 1.8}
                  cy={Math.sin(s * 120 * Math.PI / 180) * 1.8}
                  r="0.5"
                  fill="#d4a017"
                  opacity="0.6"
                />
              ))}
            </>
          ) : (
            <>
              {/* Rose bud: concentric petals */}
              {[0, 1, 2, 3, 4, 5].map((p) => (
                <ellipse
                  key={p}
                  cx={Math.cos((p * 60 - 90) * Math.PI / 180) * 6}
                  cy={Math.sin((p * 60 - 90) * Math.PI / 180) * 6}
                  rx="5"
                  ry="4"
                  fill="url(#petal-grad-pink)"
                  stroke="#FFB3D0"
                  strokeWidth="0.3"
                  opacity="0.85"
                  transform={`rotate(${p * 60 + 15}, ${Math.cos((p * 60 - 90) * Math.PI / 180) * 6}, ${Math.sin((p * 60 - 90) * Math.PI / 180) * 6})`}
                />
              ))}
              {/* Inner rose swirl */}
              <circle cx="0" cy="0" r="3.5" fill="#FFD6E7" opacity="0.9" />
              <path
                d="M-1 -1 C0 -3, 3 -1, 1 1 C3 2, 0 4, -1 1 C-3 2, -3 -1, -1 -1Z"
                fill="#FFC0D0"
                opacity="0.8"
              />
              <circle cx="0" cy="0" r="1.5" fill="#FFB3C8" opacity="0.7" />
            </>
          )}
        </g>
      ))}

      {/* Tiny buds between flowers */}
      {[
        { x: 52, y: 24 },
        { x: 138, y: 19 },
        { x: 183, y: 19 },
        { x: 228, y: 21 },
        { x: 270, y: 23 },
      ].map((bud, i) => (
        <g key={`bud-${i}`} transform={`translate(${bud.x}, ${bud.y})`}>
          <ellipse cx="0" cy="0" rx="3" ry="2.5" fill="#FFFEF0" stroke="#E8D5A3" strokeWidth="0.2" opacity="0.8" />
          <circle cx="0" cy="0" r="1" fill="#f5c518" opacity="0.5" />
        </g>
      ))}

      {/* End tassels - left */}
      <g transform="translate(15, 28)">
        <path d="M0 0 C-3 8, -1 16, -4 24" stroke="#8F9779" strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />
        <path d="M2 0 C4 8, 2 16, 5 22" stroke="#8F9779" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round" />
        {/* Tiny flowers on tassels */}
        <g transform="translate(-4, 24) scale(0.5)">
          {[0, 1, 2, 3, 4].map((p) => (
            <ellipse key={p} cx={Math.cos((p * 72 - 90) * Math.PI / 180) * 5} cy={Math.sin((p * 72 - 90) * Math.PI / 180) * 5} rx="4" ry="3" fill="#FFFEF0" opacity="0.8" />
          ))}
          <circle cx="0" cy="0" r="2" fill="#f5c518" opacity="0.7" />
        </g>
        <g transform="translate(5, 22) scale(0.4)">
          {[0, 1, 2, 3, 4].map((p) => (
            <ellipse key={p} cx={Math.cos((p * 72 - 90) * Math.PI / 180) * 5} cy={Math.sin((p * 72 - 90) * Math.PI / 180) * 5} rx="4" ry="3" fill="#FFD6E7" opacity="0.8" />
          ))}
          <circle cx="0" cy="0" r="2" fill="#f5c518" opacity="0.6" />
        </g>
      </g>

      {/* End tassels - right */}
      <g transform="translate(325, 28)">
        <path d="M0 0 C3 8, 1 16, 4 24" stroke="#8F9779" strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />
        <path d="M-2 0 C-4 8, -2 16, -5 22" stroke="#8F9779" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round" />
        <g transform="translate(4, 24) scale(0.5)">
          {[0, 1, 2, 3, 4].map((p) => (
            <ellipse key={p} cx={Math.cos((p * 72 - 90) * Math.PI / 180) * 5} cy={Math.sin((p * 72 - 90) * Math.PI / 180) * 5} rx="4" ry="3" fill="#FFFEF0" opacity="0.8" />
          ))}
          <circle cx="0" cy="0" r="2" fill="#f5c518" opacity="0.7" />
        </g>
        <g transform="translate(-5, 22) scale(0.4)">
          {[0, 1, 2, 3, 4].map((p) => (
            <ellipse key={p} cx={Math.cos((p * 72 - 90) * Math.PI / 180) * 5} cy={Math.sin((p * 72 - 90) * Math.PI / 180) * 5} rx="4" ry="3" fill="#FFD6E7" opacity="0.8" />
          ))}
          <circle cx="0" cy="0" r="2" fill="#f5c518" opacity="0.6" />
        </g>
      </g>
    </svg>
  )
}
