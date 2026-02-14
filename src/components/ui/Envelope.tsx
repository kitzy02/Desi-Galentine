import { motion } from 'framer-motion'

interface EnvelopeProps {
  isOpen: boolean
  onOpen: () => void
}

export default function Envelope({ isOpen, onOpen }: EnvelopeProps) {
  return (
    <div className="relative w-80 h-64 md:w-96 md:h-80">
      {/* Envelope Body - Soft dusty rose */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-48 md:h-56 rounded-b-lg shadow-2xl"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          background: 'linear-gradient(135deg, #D4A3A7 0%, #C28B8F 100%)'
        }}
      >
        {/* Envelope decorative pattern */}
        <div className="absolute inset-0 opacity-10"
             style={{
               backgroundImage: `repeating-linear-gradient(
                 45deg,
                 transparent,
                 transparent 10px,
                 rgba(168, 115, 119, 0.3) 10px,
                 rgba(168, 115, 119, 0.3) 20px
               )`
             }}
        />

        {/* Heart decoration on envelope */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-3xl opacity-60">
          💕
        </div>
      </motion.div>

      {/* Envelope Flap (Top Triangle) */}
      <motion.div
        animate={{
          rotateX: isOpen ? -180 : 0,
          y: isOpen ? -20 : 0
        }}
        transition={{
          duration: 0.8,
          ease: [0.43, 0.13, 0.23, 0.96]
        }}
        style={{
          transformOrigin: 'top center',
          transformStyle: 'preserve-3d'
        }}
        className="absolute top-0 left-0 right-0 h-32 md:h-40"
      >
        <svg
          viewBox="0 0 320 128"
          className="w-full h-full drop-shadow-xl"
        >
          {/* Main flap triangle */}
          <path
            d="M 0 0 L 160 128 L 320 0 Z"
            fill="url(#flap-gradient)"
            stroke="#A87377"
            strokeWidth="2"
          />
          
          {/* Gradient definition - soft vintage pink */}
          <defs>
            <linearGradient id="flap-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E5C3CB" />
              <stop offset="100%" stopColor="#D4A3A7" />
            </linearGradient>
          </defs>

          {/* Decorative lines - subtle */}
          <path
            d="M 40 20 L 160 108"
            stroke="#A87377"
            strokeWidth="1"
            opacity="0.2"
          />
          <path
            d="M 280 20 L 160 108"
            stroke="#A87377"
            strokeWidth="1"
            opacity="0.2"
          />
        </svg>
      </motion.div>

      {/* Rose Wax Seal */}
      {!isOpen && (
        <motion.button
          onClick={onOpen}
          className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-20 cursor-pointer group"
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Seal circle - dusty rose wax */}
          <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full shadow-lg border-4 
                        flex items-center justify-center"
               style={{
                 background: 'linear-gradient(135deg, #A87377 0%, #8E5B5F 100%)',
                 borderColor: 'rgba(168, 115, 119, 0.5)'
               }}>
            {/* Heart stamp */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
              className="text-3xl md:text-4xl"
            >
              💝
            </motion.div>

            {/* Soft glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: '#A87377' }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
          </div>

          {/* Click hint */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                     text-sm font-semibold"
            style={{ 
              fontFamily: 'var(--font-display)',
              color: '#A87377'
            }}
          >
            Click to open
          </motion.p>
        </motion.button>
      )}

      {/* Letter peeking out (when opened) */}
      {isOpen && (
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -60, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute top-20 left-1/2 -translate-x-1/2 w-64 md:w-72 z-10"
        >
          <div className="rounded-lg shadow-xl p-4 border-2"
               style={{
                 backgroundColor: '#FDFBF7',
                 borderColor: '#D4A3A7'
               }}>
            <div className="text-center space-y-2">
              <div className="text-4xl">💌</div>
              <p className="text-sm italic"
                 style={{ 
                   fontFamily: 'var(--font-body)',
                   color: '#2C2C2C'
                 }}>
                A special question inside...
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
