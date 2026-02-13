import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import MirrorCard from '../ui/MirrorCard'
import GajraDivider from '../ui/GajraDivider'
import WashiTape from '../ui/WashiTape'
import Petal from '../ui/Petal'
import { content } from '../../constants/content'

export default function Memories() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-pearl-petal relative overflow-hidden">
      {/* Floating Background Petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: `${Math.random() * 100}%`,
              y: -50,
              rotate: Math.random() * 360,
              opacity: 0.4
            }}
            animate={{
              y: ['0vh', '110vh'],
              rotate: [0, Math.random() * 360 + 360],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            <Petal size={15 + Math.random() * 15} className="text-coquette-pink" />
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

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-pinyon mb-4"
            style={{ fontFamily: 'var(--font-pinyon)' }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <span className="gradient-text">
              {content.memories.title}
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-charcoal-rose/70 italic text-playfair"
          >
            {content.memories.subtitle}
          </motion.p>

          {/* Decorative divider */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="flex justify-center mt-8"
          >
            <GajraDivider />
          </motion.div>
        </motion.div>

        {/* Mirror Cards - Staggered "Messy-Cute" Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Layout Guide - Three cards in creative positioning */}
          <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-12 md:gap-8 mb-20">
            
            {/* Card 1: Tea Spiller - Left, slightly higher */}
            <motion.div
              className="md:self-start md:-translate-y-8"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <MirrorCard
                emoji={content.memories.cards[0].emoji}
                label={content.memories.cards[0].label}
                subtitle={content.memories.cards[0].subtitle}
                message={content.memories.cards[0].message}
                delay={0.2}
              />
            </motion.div>

            {/* Card 2: Main Character - Center, lower */}
            <motion.div
              className="md:translate-y-12"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <MirrorCard
                emoji={content.memories.cards[1].emoji}
                label={content.memories.cards[1].label}
                subtitle={content.memories.cards[1].subtitle}
                message={content.memories.cards[1].message}
                delay={0.4}
              />
            </motion.div>

            {/* Card 3: Mirror - Right, medium height */}
            <motion.div
              className="md:self-start"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
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

          {/* Decorative scattered elements */}
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ 
              opacity: 1,
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              opacity: { delay: 1 },
              rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-10 left-10 text-4xl hidden lg:block"
          >
            ☕
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ 
              opacity: 1,
              rotate: [0, -5, 5, 0]
            }}
            transition={{
              opacity: { delay: 1.2 },
              rotate: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-20 right-20 text-4xl hidden lg:block"
          >
            💄
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1,
              scale: [1, 1.1, 1]
            }}
            transition={{
              opacity: { delay: 1.4 },
              scale: { duration: 2, repeat: Infinity }
            }}
            className="absolute bottom-32 left-1/4 text-3xl hidden lg:block"
          >
            🎬
          </motion.div>

        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={() => navigate('/quiz')}
            className="px-10 py-4 bg-gradient-to-r from-rani-glow to-gulabi-500 text-white 
                     rounded-full text-lg md:text-xl font-medium shadow-lg 
                     hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 
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

        {/* Bottom decorative note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center text-sm text-charcoal-rose/50 italic mt-8"
        >
          Click each mirror to read the full message 💕
        </motion.p>
      </div>

      {/* Bottom Washi Tape Decoration */}
      <div className="absolute bottom-0 left-1/4 pointer-events-none">
        <WashiTape variant="floral" rotation={-5} className="opacity-50" />
      </div>
    </div>
  )
}