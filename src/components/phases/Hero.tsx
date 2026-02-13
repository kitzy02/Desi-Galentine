import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Bow from '../ui/Bow'
import Petal from '../ui/Petal'
import { content } from '../../constants/content'

// REDUCED from 8 to 5 petals for less visual noise
const petalConfigs = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: 20 + Math.random() * 20,
  duration: 25 + Math.random() * 15, // SLOWER: was 15-25, now 25-40
  delay: Math.random() * 5,
  rotateEnd: Math.random() * 360 + 720,
}))

const curtainEasing = [0.65, 0, 0.35, 1] as const

export default function Hero() {
  const navigate = useNavigate()
  const [showCurtain, setShowCurtain] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [contentReady, setContentReady] = useState(false)

  const handleOpenCurtain = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setShowCurtain(false)
    // INCREASED delay for smoother transition: was 1000ms, now 1400ms
    setTimeout(() => {
      setContentReady(true)
    }, 1400)
  }

  const handleNavigate = () => {
    navigate('/memories')
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.18, delayChildren: 0.1 },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: 'spring' as const, stiffness: 200, damping: 18 },
    },
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-pearl-petal">
      {/* Floating Petals Background - Only animate AFTER curtain opens */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {petalConfigs.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ left: p.left }}
            initial={{ y: -50, rotate: 0, opacity: 0 }}
            animate={
              contentReady
                ? {
                    y: '100vh',
                    rotate: p.rotateEnd,
                    opacity: [0, 0.3, 0.25, 0.3, 0], // MORE SUBTLE: was 0.7
                  }
                : {}
            }
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

      {/* Main Content */}
      <AnimatePresence>
        {contentReady && (
          <motion.div
            className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Decorative Bows - desktop only, REDUCED amplitude */}
            <motion.div
              variants={fadeUp}
              className="absolute top-8 left-8 hidden md:block"
            >
              <Bow size={60} className="animate-float" />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="absolute top-8 right-8 hidden md:block"
            >
              <Bow
                size={60}
                className="animate-float"
                style={{ animationDelay: '1s' }}
              />
            </motion.div>

            {/* Flower Emoji */}
            <motion.p variants={scaleIn} className="text-6xl md:text-8xl mb-6">
              {content.hero.emoji}
            </motion.p>

            {/* Main Title - UPDATED: Playfair Display instead of Pinyon Script */}
            <motion.h1
              variants={fadeUp}
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 gradient-text"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              {content.hero.greeting}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-charcoal-rose/80 mb-14 max-w-md italic leading-relaxed"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {content.hero.subtitle}
            </motion.p>

            {/* CTA Button - SIMPLIFIED: No sparkles, hover-only animation */}
            <motion.div variants={fadeUp} className="relative">
              <motion.button
                onClick={handleNavigate}
                className="relative px-10 py-4 bg-gradient-to-r from-rani-glow to-gulabi-500 
                         text-white rounded-full text-lg md:text-xl font-medium shadow-lg 
                         hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent 
                               transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                               transition-transform duration-1000" />
                <span className="relative z-10">{content.hero.cta}</span>
              </motion.button>
            </motion.div>

            {/* Bottom decorative text - Better responsive positioning */}
            <motion.p
              variants={fadeUp}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-charcoal-rose/50 italic px-4 text-center"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              A little garden of love, just for you...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Curtain Overlay */}
      <AnimatePresence>
        {showCurtain && (
          <>
            {/* Left Curtain */}
            <motion.div
              key="left-curtain"
              initial={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{ duration: 1.4, ease: curtainEasing }}
              className="fixed inset-y-0 left-0 w-1/2"
              style={{ zIndex: 9999 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4607a] via-coquette-pink to-[#f5a0b5]" />
              <div className="absolute inset-0 opacity-[0.07]" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.15) 40px, rgba(0,0,0,0.15) 41px)',
              }} />
              <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-black/10 to-transparent" />
            </motion.div>

            {/* Right Curtain */}
            <motion.div
              key="right-curtain"
              initial={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 1.4, ease: curtainEasing }}
              className="fixed inset-y-0 right-0 w-1/2"
              style={{ zIndex: 9999 }}
            >
              <div className="absolute inset-0 bg-gradient-to-l from-[#d4607a] via-coquette-pink to-[#f5a0b5]" />
              <div className="absolute inset-0 opacity-[0.07]" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.15) 40px, rgba(0,0,0,0.15) 41px)',
              }} />
              <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-black/10 to-transparent" />
            </motion.div>

            {/* Center seam glow */}
            <motion.div
              key="curtain-seam"
              initial={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-[2px]"
              style={{
                zIndex: 10000,
                background: 'linear-gradient(to bottom, transparent, rgba(227,11,93,0.3), transparent)',
              }}
            />

            {/* Center bow - click to open curtain */}
            <motion.div
              key="curtain-bow"
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.3, rotate: 180 }}
              transition={{ duration: 0.5, ease: 'easeIn' }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col items-center"
              style={{ zIndex: 10001 }}
              onClick={handleOpenCurtain}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Bow size={90} className="drop-shadow-2xl" />
              </motion.div>
              <motion.p
                className="text-white text-sm mt-3 text-center font-medium tracking-wide drop-shadow-lg"
                style={{ fontFamily: 'var(--font-display)' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                Tap to open
              </motion.p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
