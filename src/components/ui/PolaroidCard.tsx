import { motion } from 'framer-motion'

interface PolaroidCardProps {
  emoji: string
  label: string
  subtitle?: string
  isSelected: boolean
  onClick: () => void
  side: 'left' | 'right'
  delay?: number
}

export default function PolaroidCard({
  emoji,
  label,
  subtitle,
  isSelected,
  onClick,
  side,
  delay = 0
}: PolaroidCardProps) {
  return (
    <motion.button
      initial={{ 
        opacity: 0, 
        y: 50,
        rotate: side === 'left' ? -15 : 15
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
        rotate: isSelected 
          ? 0 
          : (side === 'left' ? -8 : 8)
      }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        y: -10,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 200
      }}
      onClick={onClick}
      className={`
        relative group cursor-pointer
        ${isSelected ? 'z-20' : 'z-10'}
      `}
    >
      {/* Polaroid Frame */}
      <div className={`
        relative w-64 h-80 bg-white rounded-lg shadow-2xl p-4
        transition-all duration-300
        ${isSelected 
          ? 'ring-4 ring-rani-glow shadow-[0_0_30px_rgba(227,11,93,0.5)]' 
          : 'shadow-xl hover:shadow-2xl'
        }
      `}>
        {/* Photo Area */}
        <div className="relative w-full h-56 bg-gradient-to-br from-pearl-petal to-gulabi-100 
                      rounded-sm overflow-hidden flex items-center justify-center
                      border-2 border-gray-100">
          
          {/* Emoji/Content */}
          <motion.div
            animate={{
              scale: isSelected ? [1, 1.2, 1] : 1,
              rotate: isSelected ? [0, -5, 5, 0] : 0
            }}
            transition={{
              duration: 0.5,
              repeat: isSelected ? Infinity : 0,
              repeatDelay: 2
            }}
            className="text-8xl"
          >
            {emoji}
          </motion.div>

          {/* Selection indicator overlay */}
          {isSelected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-rani-glow/10 backdrop-blur-[1px]
                       flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-5xl"
              >
                ✓
              </motion.div>
            </motion.div>
          )}

          {/* Vintage photo effect */}
          <div className="absolute inset-0 pointer-events-none
                        bg-gradient-to-b from-white/10 via-transparent to-black/5" />
        </div>

        {/* Label Area (bottom white space of polaroid) */}
        <div className="mt-3 space-y-1">
          <h3 className={`
            text-xl font-bold text-playfair text-center
            ${isSelected ? 'text-rani-glow' : 'text-charcoal-rose'}
            transition-colors duration-300
          `}>
            {label}
          </h3>
          
          {subtitle && (
            <p className="text-sm text-charcoal-rose/60 italic text-center">
              {subtitle}
            </p>
          )}
        </div>

        {/* Tape effect on top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 
                      bg-coquette-pink/40 backdrop-blur-sm rounded-sm
                      shadow-md border border-coquette-pink/30" />

        {/* Corner fold effect */}
        <div className="absolute bottom-4 right-4 w-0 h-0 
                      border-l-[15px] border-l-transparent
                      border-b-[15px] border-b-gray-200" />
      </div>

      {/* Selection glow ring */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-lg border-4 border-rani-glow -z-10"
          style={{ filter: 'blur(10px)' }}
        />
      )}

      {/* Floating sparkles when selected */}
      {isSelected && (
        <>
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0
            }}
            className="absolute -top-8 left-1/4 text-2xl"
          >
            ✨
          </motion.div>
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5
            }}
            className="absolute -top-8 right-1/4 text-2xl"
          >
            💕
          </motion.div>
        </>
      )}
    </motion.button>
  )
}