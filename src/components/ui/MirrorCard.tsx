import { motion } from "framer-motion"
import { useState } from "react"

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
  delay = 0,
}: MirrorCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      onClick={() => setFlipped(!flipped)}
      whileHover={{ rotate: [0, -3, 3, 0] }}
      className="relative w-[300px] h-[420px] cursor-pointer perspective"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-full preserve-3d"
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 backface-hidden 
                     bg-gradient-to-b from-pink-50 to-white
                     rounded-[160px] 
                     flex flex-col items-center justify-between
                     p-6
                     shadow-[0_20px_40px_rgba(227,11,93,0.15)]"
        >
          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 rounded-[160px] 
                       bg-gradient-to-r 
                       from-transparent via-white/20 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <div className="flex flex-col items-center text-center min-h-[140px] justify-center">
            <div className="text-4xl mb-3">{emoji}</div>

            <h3
              className="text-xl font-semibold text-rani-glow"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {label}
            </h3>

            <p className="text-sm text-charcoal-rose/70 mt-2">
              {subtitle}
            </p>
          </div>

          <div className="text-xs text-charcoal-rose/50 italic">
            Tap to reveal 💌
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div
            className="relative w-full h-full 
                       bg-gradient-to-br from-pearl-petal to-gulabi-50 
                       rounded-[160px] 
                       p-6 
                       shadow-[0_20px_40px_rgba(227,11,93,0.15)] 
                       border-4 border-coquette-pink
                       flex flex-col items-center justify-center text-center"
          >
            {/* Decorative Bow */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl">
              🎀
            </div>

            <div className="text-5xl mb-4">{emoji}</div>

            <h3
              className="text-2xl font-bold text-rani-glow mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {label}
            </h3>

            <p className="text-sm text-charcoal-rose/60 italic mb-4">
              {subtitle}
            </p>

            <p className="text-sm text-charcoal-rose leading-relaxed px-2">
              {message}
            </p>

            <motion.p
              className="absolute bottom-4 text-xs text-rani-glow font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Click to flip back 💌
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
