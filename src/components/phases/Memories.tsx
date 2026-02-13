import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import MirrorCard from '../ui/MirrorCard'
import GajraDivider from '../ui/GajraDivider'
import WashiTape from '../ui/WashiTape'
import Petal from '../ui/Petal'
import { content } from '../../constants/content'

// REDUCED petals from 6 to 5
const petalSeeds = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  left: `${10 + Math.random() * 80}%`,
  size: 15 + Math.random() * 15,
  duration: 25 + Math.random() * 15, // SLOWER: was 20-30
  delay: Math.random() * 5,
  rotateEnd: Math.random() * 360 + 360,
}))

export default function Memories() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-pearl-petal relative overflow-hidden">
      {/* Floating Background Petals - MORE SUBTLE */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {petalSeeds.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ left: p.left }}
            initial={{ y: -50, rotate: 0, opacity: 0 }}
            animate={{
              y: ['0vh', '110vh'],
              rotate: [0, p.rotateEnd],
              opacity: [0, 0.3, 0.35, 0.3, 0], // MORE SUBTLE: was 0.5-0.6
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear',
            }}
          >
            <Petal size={p.size} className="text-coquette-pink" />
          </motion.div>
        ))}
      </div>

      {/* Decorative Washi Tape - Top Corners */}
      <div className="absolute top-0 left-0 pointer-events-none">
        <WashiTape variant="pink" rotation={-15} className="opacity-60" />
      </div>
      <div className="absolute top-0 right-0 pointer-events-none">
        <WashiTape variant="gold" rotation={15} className="opacity-60" />
      </div>

      {/* Main Content - UPDATED container */}
      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 py-16 max-w-7xl">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="gradient-text">
              {content.memories.title}
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-charcoal-rose/70 italic"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {content.memories.subtitle}
          </motion.p>

          {/* Gajra Divider */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' as const, stiffness: 120, damping: 14 }}
            className="flex justify-center mt-8"
          >
            <GajraDivider />
          </motion.div>
        </motion.div>

        {/* Mirror Cards - CRITICAL FIX: Removed all translate-y, added proper gaps */}
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center 
                        gap-16 md:gap-x-12 md:gap-y-24 mb-36 lg:mb-44">
            
            {/* Card 1: NO MORE translate-y offset */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <MirrorCard
                emoji={content.memories.cards[0].emoji}
                label={content.memories.cards[0].label}
                subtitle={content.memories.cards[0].subtitle}
                message={content.memories.cards[0].message}
                delay={0.2}
              />
            </motion.div>

            {/* Card 2: NO MORE translate-y offset */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <MirrorCard
                emoji={content.memories.cards[1].emoji}
                label={content.memories.cards[1].label}
                subtitle={content.memories.cards[1].subtitle}
                message={content.memories.cards[1].message}
                delay={0.4}
              />
            </motion.div>

            {/* Card 3: NO MORE translate-y offset */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <MirrorCard
                emoji={content.memories.cards[2].emoji}
                label={content.memories.cards[2].label}
                subtitle={content.memories.cards[2].subtitle}
                message={content.memories.cards[2].message}
                delay={0.6}
              />
            </motion.div>
          </div>

          {/* REMOVED: Decorative scattered emojis (☕💄🎬) - they were visual noise */}
        </div>

        {/* Continue Button - Now with guaranteed spacing above */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <motion.button
            onClick={() => navigate('/quiz')}
            className="px-10 py-4 bg-gradient-to-r from-rani-glow to-gulabi-500 text-white 
                     rounded-full text-lg md:text-xl font-medium shadow-lg 
                     hover:shadow-2xl transition-all duration-300 relative overflow-hidden group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                           transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <span className="relative z-10 flex items-center gap-2">
              Aage Badho
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Bottom note - Updated text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center text-sm text-charcoal-rose/50 italic mt-8"
        >
          Click each mirror to flip and read the message
        </motion.p>
      </div>

      {/* Bottom Washi Tape */}
      <div className="absolute bottom-0 left-1/4 pointer-events-none">
        <WashiTape variant="floral" rotation={-5} className="opacity-50" />
      </div>
    </div>
  )
}
