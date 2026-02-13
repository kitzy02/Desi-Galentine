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

const curtainEasing = [0.43, 0.13, 0.23, 0.96] as const

export default function Hero() {
  const navigate = useNavigate()
  const [showCurtain, setShowCurtain] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleEnter = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setShowCurtain(false)
    setTimeout(() => {
      navigate('/memories')
    }, 1500)
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
            initial={{ y: -50, rotate: 0, opacity: 0.6 }}
            animate={{
              y: '100vh',
              rotate: p.rotateEnd,
              opacity: [0.6, 0.8, 0.6],
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

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
        {/* Decorative Bows - desktop only */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-8 left-8 hidden md:block"
        >
          <Bow size={60} className="animate-float" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute top-8 right-8 hidden md:block"
        >
          <Bow size={60} className="animate-float" style={{ animationDelay: '1s' }} />
        </motion.div>

        {/* Flower Emoji */}
        <motion.p
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="text-6xl md:text-8xl mb-6"
        >
          {content.hero.emoji}
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text"
          style={{ fontFamily: 'var(--font-pinyon)' }}
        >
          {content.hero.greeting}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-charcoal-rose mb-12 max-w-md italic"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {content.hero.subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="relative"
        >
          {/* Sparkles around button */}
          <div className="absolute -top-4 -left-4">
            <Sparkle size={16} className="text-marigold-sun animate-sparkle" />
          </div>
          <div className="absolute -top-4 -right-4">
            <Sparkle size={16} className="text-rani-glow animate-sparkle" style={{ animationDelay: '0.3s' }} />
          </div>
          <div className="absolute -bottom-4 -left-4">
            <Sparkle size={16} className="text-coquette-pink animate-sparkle" style={{ animationDelay: '0.6s' }} />
          </div>
          <div className="absolute -bottom-4 -right-4">
            <Sparkle size={16} className="text-marigold-sun animate-sparkle" style={{ animationDelay: '0.9s' }} />
          </div>

          <button
              disabled={isAnimating}
              className="relative px-10 py-4 bg-gradient-to-r from-rani-glow to-gulabi-500 text-white rounded-full text-lg md:text-xl font-medium shadow-lg hover:shadow-2xl transition-all duration-300 animate-pulsate disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group pointer-events-none"
            >
            {/* Button shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10">{content.hero.cta}</span>
          </button>
        </motion.div>

        {/* Bottom decorative text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 text-sm text-charcoal-rose/60 italic"
        >
          Click to enter the Gulabi Garden...
        </motion.p>
      </div>

      {/* Curtain Overlay */}
      <AnimatePresence>
        {showCurtain && (
          <>
            {/* Left Curtain */}
            <motion.div
              key="left-curtain"
              initial={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{ duration: 1.2, ease: curtainEasing }}
              className="fixed inset-y-0 left-0 w-1/2 bg-gradient-to-r from-coquette-pink to-gulabi-400"
              style={{ zIndex: 9999, boxShadow: '10px 0 30px rgba(0,0,0,0.1)' }}
            >
              <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-rani-glow/20 to-transparent" />
            </motion.div>

            {/* Right Curtain */}
            <motion.div
              key="right-curtain"
              initial={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 1.2, ease: curtainEasing }}
              className="fixed inset-y-0 right-0 w-1/2 bg-gradient-to-l from-coquette-pink to-gulabi-400"
              style={{ zIndex: 9999, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)' }}
            >
              <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-rani-glow/20 to-transparent" />
            </motion.div>

            {/* Center bow - click to open curtain */}
            <motion.div
              key="curtain-bow"
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.6 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ zIndex: 10000 }}
              onClick={handleEnter}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bow size={80} className="drop-shadow-2xl" />
              <motion.p
                className="text-white text-sm mt-2 text-center font-medium drop-shadow-md"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
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
