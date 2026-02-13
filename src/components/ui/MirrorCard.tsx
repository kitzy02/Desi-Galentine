import { useState } from 'react'
import { motion } from 'framer-motion'

interface MirrorCardProps {
  emoji: string
  label: string
  subtitle: string
  message: string
  delay?: number
}

export default function MirrorCard({ 
  emoji, 
  label, 
  subtitle, 
  message, 
  delay = 0 
}: MirrorCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: -5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: 'spring' as const,
        stiffness: 100
      }}
      className="flip-card w-56 sm:w-64 h-72 sm:h-80 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ 
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transition: 'transform 0.8s',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* FRONT SIDE - Mirror */}
      <div 
        className="absolute inset-0"
        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
      >
        <motion.div
          whileHover={{ 
            scale: 1.03,
            rotate: [0, -1, 1, -1, 0],
            transition: { 
              rotate: { 
                duration: 0.8, 
                repeat: Infinity,
                repeatType: 'reverse' as const
              },
              scale: { duration: 0.2 }
            }
          }}
          className="relative group"
        >
          <div className="relative w-full h-full bg-gradient-to-br from-marigold-sun via-haldi to-marigold-sun rounded-[50%] p-2 shadow-2xl 
                        hover:shadow-[0_0_40px_rgba(245,197,24,0.4)] transition-shadow duration-300">
            
            <div className="relative w-full h-full bg-gradient-to-br from-pearl-petal to-gulabi-50 rounded-[50%] overflow-hidden
                          border-4 border-marigold-sun/30">
              
              {/* Enhanced shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut',
                }}
                style={{ width: '50%', transform: 'skewX(-20deg)' }}
              />

              <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
                <motion.div
                  className="text-5xl mb-3"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  {emoji}
                </motion.div>

                <h3 className="text-xl font-bold text-rani-glow mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {label}
                </h3>

                <p className="text-sm text-charcoal-rose/70 italic px-4 leading-relaxed text-center">
                  {subtitle}
                </p>

                <motion.p
                  className="absolute bottom-4 text-xs text-marigold-sun font-medium"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click to flip
                </motion.p>
              </div>

              {/* Decorative dots */}
              <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-marigold-sun/50" />
              <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-marigold-sun/50" />
              <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-marigold-sun/50" />
              <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-marigold-sun/50" />
            </div>

            {/* Mirror stand */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-12 
                          bg-gradient-to-b from-marigold-sun to-chai rounded-b-full
                          shadow-lg border-2 border-marigold-sun/50" />
          </div>
        </motion.div>
      </div>

      {/* BACK SIDE - Message Card */}
      <div 
        className="absolute inset-0"
        style={{ 
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)'
        }}
      >
        <div className="relative w-full h-full bg-gradient-to-br from-pearl-petal to-gulabi-50 
                      rounded-3xl p-6 shadow-2xl border-4 border-coquette-pink
                      flex flex-col items-center justify-center">
          
          {/* Decorative bow on top */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl">
            🎀
          </div>

          <div className="text-5xl mb-4">{emoji}</div>

          <h3 className="text-2xl font-bold text-center text-rani-glow mb-2" 
              style={{ fontFamily: 'var(--font-display)' }}>
            {label}
          </h3>

          <p className="text-sm text-center text-charcoal-rose/60 italic mb-4">
            {subtitle}
          </p>

          <p className="text-sm text-charcoal-rose leading-relaxed text-center px-2">
            {message}
          </p>

          {/* Click to flip back hint */}
          <motion.p
            className="absolute bottom-4 text-xs text-rani-glow font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click to flip back
          </motion.p>

          {/* Mirror stand (back side) */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-12 
                        bg-gradient-to-b from-marigold-sun to-chai rounded-b-full
                        shadow-lg border-2 border-marigold-sun/50" />
        </div>
      </div>
    </motion.div>
  )
}
