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
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotateY: isFlipped ? 180 : 0,
        rotate: 0 
      }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: 'spring' as const,
        stiffness: 100
      }}
      className="flip-card w-56 sm:w-64 h-72 sm:h-80 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ transformStyle: 'preserve-3d' }}
    >      {/* FRONT SIDE - Antique Brass Mirror */}
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
          {/* Aged brass frame - tarnished, not shiny */}
          <div className="relative w-full h-full rounded-[50%] p-2 shadow-2xl 
                        hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] transition-shadow duration-300"
               style={{
                 background: 'linear-gradient(135deg, #C5A059 0%, #D4AF6A 50%, #C5A059 100%)'
               }}>
            
            {/* Mirror surface - soft mogra white to dusty pink */}
            <div className="relative w-full h-full rounded-[50%] overflow-hidden border-2"
                 style={{
                   background: 'linear-gradient(135deg, #FDFBF7 0%, #F9F0F3 50%, #EFD9DF 100%)',
                   borderColor: 'rgba(197, 160, 89, 0.2)'
                 }}>
              
              {/* Soft shimmer effect - like brass lamp light */}
              <motion.div
                className="absolute inset-0"
                animate={{ x: ['-100%', '200%'] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: 'easeInOut',
                }}
                style={{ 
                  width: '50%', 
                  transform: 'skewX(-20deg)',
                  background: 'linear-gradient(90deg, transparent, rgba(212,175,106,0.15), transparent)'
                }}
              />

              <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
                <motion.div
                  className="text-5xl mb-3"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  {emoji}
                </motion.div>

                <h3 className="text-xl font-bold mb-2" 
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      color: '#A87377'
                    }}>
                  {label}
                </h3>

                <p className="text-sm italic px-4 leading-relaxed text-center"
                   style={{ color: 'rgba(44, 44, 44, 0.7)' }}>
                  {subtitle}
                </p>

                <motion.p
                  className="absolute bottom-4 text-xs font-medium"
                  style={{ color: '#C5A059' }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click to flip
                </motion.p>
              </div>

              {/* Decorative dots - aged brass accents */}
              <div className="absolute top-2 left-2 w-3 h-3 rounded-full"
                   style={{ backgroundColor: 'rgba(197, 160, 89, 0.4)' }} />
              <div className="absolute top-2 right-2 w-3 h-3 rounded-full"
                   style={{ backgroundColor: 'rgba(197, 160, 89, 0.4)' }} />
              <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full"
                   style={{ backgroundColor: 'rgba(197, 160, 89, 0.4)' }} />
              <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full"
                   style={{ backgroundColor: 'rgba(197, 160, 89, 0.4)' }} />
            </div>

            {/* Mirror stand - aged brass */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-12 
                          rounded-b-full shadow-lg border-2"
                 style={{
                   background: 'linear-gradient(to bottom, #C5A059, #8b6914)',
                   borderColor: 'rgba(197, 160, 89, 0.5)'
                 }} />
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
        <div className="relative w-full h-full rounded-3xl p-6 shadow-2xl border-4 
                      flex flex-col items-center justify-center"
             style={{
               background: 'linear-gradient(135deg, #FDFBF7 0%, #F9F0F3 50%, #EFD9DF 100%)',
               borderColor: '#D4A3A7'
             }}>
          
          {/* Decorative bow on top */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl">
            🎀
          </div>

          <div className="text-5xl mb-4">{emoji}</div>

          <h3 className="text-2xl font-bold text-center mb-2" 
              style={{ 
                fontFamily: 'var(--font-display)',
                color: '#A87377'
              }}>
            {label}
          </h3>

          <p className="text-sm text-center italic mb-4"
             style={{ color: 'rgba(44, 44, 44, 0.6)' }}>
            {subtitle}
          </p>

          <p className="text-sm leading-relaxed text-center px-2"
             style={{ color: '#2C2C2C' }}>
            {message}
          </p>

          {/* Click to flip back hint */}
          <motion.p
            className="absolute bottom-4 text-xs font-medium"
            style={{ color: '#A87377' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click to flip back
          </motion.p>

          {/* Mirror stand (back side) */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-12 
                        rounded-b-full shadow-lg border-2"
               style={{
                 background: 'linear-gradient(to bottom, #C5A059, #8b6914)',
                 borderColor: 'rgba(197, 160, 89, 0.5)'
               }} />
        </div>
      </div>
    </motion.div>
  )
}
