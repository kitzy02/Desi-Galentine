import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Sparkle from '../ui/Sparkle'
import Bow from '../ui/Bow'
import Petal from '../ui/Petal'
import { content } from '../../constants/content'

const petalConfigs = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: 20 + Math.random() * 20,
  duration: 15 + Math.random() * 10,
  delay: Math.random() * 5,
  rotateEnd: Math.random() * 360 + 720,
}))

const curtainEasing = [0.65, 0, 0.35, 1] as const // smooth ease-in-out

export default function Hero() {
  const navigate = useNavigate()
  const [showCurtain, setShowCurtain] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [contentReady, setContentReady] = useState(false)

  const handleOpenCurtain = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setShowCurtain(false)
    // Wait for curtain animation to finish, then reveal content
    setTimeout(() => {
      setContentReady(true)
    }, 1000)
  }

  const handleNavigate = () => {
    navigate('/memories')
  }

  // Staggered content animation variants
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
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }, },
    },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, damping: 18 },
    },
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-pearl-petal">
      {/* Floating Petals Background */}
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
                    opacity: [0, 0.7, 0.5, 0.7, 0],
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

      {/* Main Content - only animates in after curtain opens */}
      <AnimatePresence>
        {contentReady && (
          <motion.div
            className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Decorative Bows - desktop only */}
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

            {/* Main Title */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 gradient-text"
              style={{ fontFamily: 'var(--font-pinyon)' }}
            >
              {content.hero.greeting}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-charcoal-rose/80 mb-14 max-w-md italic leading-relaxed"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {content.hero.subtitle}
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={fadeUp} className="relative">
              {/* Sparkles around button */}
              {[
                { pos: '-top-4 -left-4', color: 'text-marigold-sun', delay: '0s' },
                { pos: '-top-4 -right-4', color: 'text-rani-glow', delay: '0.3s' },
                { pos: '-bottom-4 -left-4', color: 'text-coquette-pink', delay: '0.6s' },
                { pos: '-bottom-4 -right-4', color: 'text-marigold-sun', delay: '0.9s' },
              ].map((s, i) => (
                <div key={i} className={`absolute ${s.pos}`}>
                  <Sparkle
                    size={16}
                    className={`${s.color} animate-sparkle`}
                    style={{ animationDelay: s.delay }}
                  />
                </div>
              ))}

              <button
                onClick={handleNavigate}
                className="relative px-10 py-4 bg-gradient-to-r from-rani-glow to-gulabi-500 text-white rounded-full text-lg md:text-xl font-medium shadow-lg hover:shadow-2xl transition-all duration-300 animate-pulsate overflow-hidden group cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10">{content.hero.cta}</span>
              </button>
            </motion.div>

            {/* Bottom decorative text */}
            <motion.p
              variants={fadeUp}
              className="absolute bottom-8 text-sm text-charcoal-rose/50 italic"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              A little garden of love, just for you...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Curtain Overlay */}
      <AnimatePresence
        onExitComplete={() => {
          // Curtain fully gone
        }}
      >
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
              {/* Fabric gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4607a] via-coquette-pink to-[#f5a0b5]" />
              {/* Subtle vertical fold lines */}
              <div className="absolute inset-0 opacity-[0.07]" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.15) 40px, rgba(0,0,0,0.15) 41px)',
              }} />
              {/* Edge shadow */}
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
              {/* Fabric gradient */}
              <div className="absolute inset-0 bg-gradient-to-l from-[#d4607a] via-coquette-pink to-[#f5a0b5]" />
              {/* Subtle vertical fold lines */}
              <div className="absolute inset-0 opacity-[0.07]" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.15) 40px, rgba(0,0,0,0.15) 41px)',
              }} />
              {/* Edge shadow */}
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
                style={{ fontFamily: 'var(--font-playfair)' }}
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
