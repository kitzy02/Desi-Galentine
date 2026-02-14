import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Bow from '../ui/Bow'
import Petal from '../ui/Petal'
import { content } from '../../constants/content'

// Reduced petals for subtlety
const petalConfigs = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: 20 + Math.random() * 20,
  duration: 30 + Math.random() * 15,
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
    <div className="relative min-h-screen overflow-hidden chikankari-bg"
         style={{ backgroundColor: '#FDFBF7' }}>
      {/* Floating Petals Background - Gentle & Subtle */}
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
                    opacity: [0, 0.2, 0.15, 0.2, 0],
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
            <Petal size={p.size} />
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
            {/* Decorative Bows - desktop only, gentle float */}
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

            {/* Main Title - Romantic italic Playfair */}
            <motion.h1
              variants={fadeUp}
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #8E5B5F 0%, #C28B8F 50%, #D4A3A7 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'shimmer 4s linear infinite'
              }}
            >
              {content.hero.greeting}
            </motion.h1>

            {/* Subtitle - Poetic */}
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl mb-14 max-w-md italic leading-relaxed"
              style={{ 
                fontFamily: 'var(--font-display)',
                color: 'rgba(44, 44, 44, 0.8)'
              }}
            >
              {content.hero.subtitle}
            </motion.p>

            {/* CTA Button - Soft gradient with brass shimmer */}
            <motion.div variants={fadeUp} className="relative">
              <motion.button
                onClick={handleNavigate}
                className="relative px-10 py-4 text-white rounded-full text-lg md:text-xl 
                         font-medium shadow-lg hover:shadow-2xl transition-all duration-300 
                         overflow-hidden group cursor-pointer"
                style={{
                  background: 'linear-gradient(to right, #A87377, #8E5B5F)',
                  fontFamily: 'var(--font-body)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 transform -skew-x-12 -translate-x-full 
                               group-hover:translate-x-full transition-transform duration-1000"
                      style={{
                        background: 'linear-gradient(to right, transparent, rgba(212, 175, 106, 0.15), transparent)'
                      }} />
                <span className="relative z-10">{content.hero.cta}</span>
              </motion.button>
            </motion.div>

            {/* Bottom decorative text */}
            <motion.p
              variants={fadeUp}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm italic px-4 text-center"
              style={{ 
                fontFamily: 'var(--font-display)',
                color: 'rgba(44, 44, 44, 0.5)'
              }}
            >
              Ek chhoti si baghiya, mehekti huyi yaadon se bhari...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Curtain Overlay - Soft dusty rose */}
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
              <div className="absolute inset-0"
                   style={{
                     background: 'linear-gradient(to right, #C28B8F, #D4A3A7, #E5C3CB)'
                   }} />
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
              <div className="absolute inset-0"
                   style={{
                     background: 'linear-gradient(to left, #C28B8F, #D4A3A7, #E5C3CB)'
                   }} />
              <div className="absolute inset-0 opacity-[0.07]" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.15) 40px, rgba(0,0,0,0.15) 41px)',
              }} />
              <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-black/10 to-transparent" />
            </motion.div>

            {/* Center seam glow - softer */}
            <motion.div
              key="curtain-seam"
              initial={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-[2px]"
              style={{
                zIndex: 10000,
                background: 'linear-gradient(to bottom, transparent, rgba(168, 115, 119, 0.3), transparent)',
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
