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
        rotate: side === 'left' ? -6 : 6
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
        rotate: isSelected 
          ? 0 
          : (side === 'left' ? -4 : 4)
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
      {/* Polaroid Frame - Vintage white with soft shadows */}
      <div className={`
        relative w-56 sm:w-64 h-72 sm:h-80 bg-white rounded-lg shadow-2xl p-4
        transition-all duration-300
        ${isSelected 
          ? 'ring-4 ring-[#A87377] shadow-[0_0_30px_rgba(168,115,119,0.5)]' 
          : 'shadow-xl hover:shadow-2xl ring-4 ring-transparent'
        }
      `}>
        {/* Photo Area - Soft vintage background */}
        <div className="relative w-full h-48 sm:h-56 rounded-sm overflow-hidden 
                      flex items-center justify-center border-2 border-gray-100"
             style={{
               background: 'linear-gradient(135deg, #FDFBF7 0%, #EFD9DF 100%)'
             }}>
          
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
            className="text-7xl sm:text-8xl"
          >
            {emoji}
          </motion.div>

          {/* Selection indicator overlay */}
          {isSelected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(168, 115, 119, 0.1)',
                backdropFilter: 'blur(1px)'
              }}
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

          {/* Vintage photo effect - faded edges */}
          <div className="absolute inset-0 pointer-events-none"
               style={{
                 background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent 20%, transparent 80%, rgba(0,0,0,0.05))'
               }} />
        </div>

        {/* Label Area (bottom white space of polaroid) */}
        <div className="mt-3 space-y-1">
          <h3 className={`
            text-xl font-bold text-center transition-colors duration-300
          `}
          style={{ 
            fontFamily: 'var(--font-display)',
            color: isSelected ? '#A87377' : '#2C2C2C'
          }}>
            {label}
          </h3>
          
          {subtitle && (
            <p className="text-sm italic text-center"
               style={{ color: 'rgba(44, 44, 44, 0.6)' }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Tape effect on top - Rooh Afza pink */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 
                      rounded-sm shadow-md border"
             style={{
               backgroundColor: 'rgba(212, 163, 167, 0.6)',
               backdropFilter: 'blur(4px)',
               borderColor: 'rgba(212, 163, 167, 0.5)'
             }} />

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
          className="absolute inset-0 rounded-lg border-4 -z-10"
          style={{ 
            borderColor: '#A87377',
            filter: 'blur(10px)' 
          }}
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