import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mirror Card Button */}
      <motion.button
        initial={{ opacity: 0, y: 50, rotate: -5 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          rotate: 0
        }}
        transition={{ 
          duration: 0.6, 
          delay,
          type: "spring",
          stiffness: 100
        }}
        whileHover={{ 
          scale: 1.05,
          rotate: [0, -2, 2, -2, 0],
          transition: { 
            rotate: { 
              duration: 0.5, 
              repeat: Infinity,
              repeatType: "reverse"
            },
            scale: { duration: 0.2 }
          }
        }}
        onClick={() => setIsOpen(true)}
        className="relative group"
      >
        {/* Mirror Frame */}
        <div className="relative w-64 h-80 bg-gradient-to-br from-marigold-sun via-haldi to-marigold-sun rounded-[50%] p-2 shadow-2xl 
                      hover:shadow-[0_0_40px_rgba(245,197,24,0.4)] transition-shadow duration-300">
          
          {/* Inner Mirror Glass */}
          <div className="relative w-full h-full bg-gradient-to-br from-pearl-petal to-gulabi-50 rounded-[50%] overflow-hidden
                        border-4 border-marigold-sun/30">
            
            {/* Glass Shine Animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
              }}
              style={{
                width: '50%',
                transform: 'skewX(-20deg)'
              }}
            />

            {/* Mirror Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
              {/* Emoji */}
              <motion.div
                className="text-5xl mb-3"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                {emoji}
              </motion.div>

              {/* Label */}
              <h3 className="text-xl font-bold text-rani-glow mb-2 text-playfair">
                {label}
              </h3>

              {/* Subtitle */}
              <p className="text-sm text-charcoal-rose/70 italic px-4 leading-relaxed">
                {subtitle}
              </p>

              {/* Click hint */}
              <motion.p
                className="absolute bottom-4 text-xs text-marigold-sun font-medium"
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                Click to read ✨
              </motion.p>
            </div>

            {/* Decorative corner details */}
            <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-marigold-sun/50" />
            <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-marigold-sun/50" />
            <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-marigold-sun/50" />
            <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-marigold-sun/50" />
          </div>

          {/* Mirror Handle (Bottom decorative element) */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-12 
                        bg-gradient-to-b from-marigold-sun to-chai rounded-b-full
                        shadow-lg border-2 border-marigold-sun/50" />
        </div>

        {/* Floating sparkles around mirror */}
        <motion.div
          className="absolute -top-2 -right-2 text-marigold-sun"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity
          }}
        >
          ✨
        </motion.div>
      </motion.button>

      {/* Message Modal/Popup */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              {/* Message Card */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 10 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-pearl-petal rounded-3xl p-8 max-w-md w-full shadow-2xl
                         border-4 border-coquette-pink"
              >
                {/* Decorative bow at top */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl">
                  🎀
                </div>

                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gulabi-200 
                           hover:bg-gulabi-300 transition-colors flex items-center justify-center
                           text-rani-glow font-bold"
                >
                  ×
                </button>

                {/* Emoji */}
                <div className="text-6xl text-center mb-4">
                  {emoji}
                </div>

                {/* Label */}
                <h3 className="text-2xl font-bold text-center text-rani-glow mb-2 text-playfair">
                  {label}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-center text-charcoal-rose/60 italic mb-6">
                  {subtitle}
                </p>

                {/* Message */}
                <p className="text-base text-charcoal-rose leading-relaxed text-center px-2">
                  {message}
                </p>

                {/* Decorative elements */}
                <div className="absolute -bottom-3 -left-3 text-3xl rotate-12">💕</div>
                <div className="absolute -bottom-3 -right-3 text-3xl -rotate-12">✨</div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}