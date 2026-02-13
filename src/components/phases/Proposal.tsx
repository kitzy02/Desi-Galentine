import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import Envelope from '../ui/Envelope'
import Petal from '../ui/Petal'
import { content } from '../../constants/content'

export default function Proposal() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  const [showQuestion, setShowQuestion] = useState(false)
  const [answer, setAnswer] = useState<'yes' | 'playful' | null>(null)

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true)
    // Show question after envelope animation
    setTimeout(() => {
      setShowQuestion(true)
    }, 1000)
  }

  const handleAnswer = (choice: 'yes' | 'playful') => {
    setAnswer(choice)
    
    // Trigger confetti celebration
    if (choice === 'yes') {
      // Epic confetti for "Yes"
      const duration = 5000
      const end = Date.now() + duration

      const colors = ['#FFC0CB', '#E30B5D', '#FFB347', '#f5c518']

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
          shapes: ['circle', 'square'],
          scalar: 1.2
        })
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
          shapes: ['circle', 'square'],
          scalar: 1.2
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }
      frame()

      // Heart burst in center
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 160,
          origin: { y: 0.6 },
          colors: colors,
          shapes: ['circle'],
          scalar: 2
        })
      }, 300)
    } else {
      // Sweet confetti for "treats" answer
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFC0CB', '#FFB347', '#f5c518'],
        shapes: ['circle'],
        scalar: 1.5
      })
    }
  }

  return (
    <div className="min-h-screen bg-pearl-petal relative overflow-hidden">
      {/* Floating Background Petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
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
              rotate: [0, Math.random() * 360 + 720],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            <Petal size={15 + Math.random() * 20} className="text-coquette-pink" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-16">
        
        {/* Initial State - Envelope */}
        {!showQuestion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center"
          >
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold text-pinyon mb-8"
              style={{ fontFamily: 'var(--font-pinyon)' }}
            >
              <span className="gradient-text">
                {content.proposal.headline}
              </span>
            </motion.h1>

            {/* Envelope */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex justify-center mb-8"
            >
              <Envelope isOpen={isEnvelopeOpen} onOpen={handleOpenEnvelope} />
            </motion.div>

            {/* Hint text */}
            {!isEnvelopeOpen && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-charcoal-rose/60 italic text-lg"
              >
                There's something special waiting for you... 💕
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Question State */}
        <AnimatePresence>
          {showQuestion && !answer && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="text-center max-w-3xl"
            >
              {/* Decorative hearts */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
                className="text-7xl mb-8"
              >
                💝
              </motion.div>

              {/* The Question */}
              <motion.div
                className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-coquette-pink mb-8"
                animate={{
                  boxShadow: [
                    '0 20px 60px rgba(227, 11, 93, 0.2)',
                    '0 20px 80px rgba(227, 11, 93, 0.4)',
                    '0 20px 60px rgba(227, 11, 93, 0.2)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <h2 className="text-3xl md:text-5xl text-charcoal-rose font-bold mb-8 text-playfair leading-relaxed">
                  {content.proposal.question}
                </h2>

                {/* Answer Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  {/* Yes Button */}
                  <motion.button
                    onClick={() => handleAnswer('yes')}
                    className="px-8 py-4 bg-gradient-to-r from-rani-glow to-gulabi-500 text-white 
                             rounded-full text-xl md:text-2xl font-medium shadow-lg 
                             hover:shadow-2xl transition-all duration-300 relative overflow-hidden group
                             min-w-[200px]"
                    whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Shimmer effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 
                                   transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    <span className="relative z-10">
                      {content.proposal.yesButton}
                    </span>

                    {/* Pulsating glow */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-rani-glow opacity-40"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.4, 0.6, 0.4]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity
                      }}
                    />
                  </motion.button>

                  {/* Playful Button */}
                  <motion.button
                    onClick={() => handleAnswer('playful')}
                    className="px-8 py-4 bg-gradient-to-r from-marigold-sun to-haldi text-charcoal-rose 
                             rounded-full text-xl md:text-2xl font-medium shadow-lg 
                             hover:shadow-2xl transition-all duration-300 relative overflow-hidden group
                             min-w-[200px]"
                    whileHover={{ scale: 1.1, rotate: [0, 2, -2, 0] }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Shimmer effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 
                                   transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    <span className="relative z-10">
                      {content.proposal.playfulButton}
                    </span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="flex justify-center gap-8 text-4xl">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  ✨
                </motion.span>
                <motion.span
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  💕
                </motion.span>
                <motion.span
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  ✨
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success State */}
        <AnimatePresence>
          {answer && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
              className="text-center max-w-2xl"
            >
              {/* Giant celebration emoji */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 360]
                }}
                transition={{
                  scale: { duration: 2, repeat: Infinity },
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" }
                }}
                className="text-9xl mb-8"
              >
                {answer === 'yes' ? '💖' : '🧁'}
              </motion.div>

              {/* Success Message */}
              <motion.div
                className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl border-4 border-rani-glow"
                animate={{
                  boxShadow: [
                    '0 30px 80px rgba(227, 11, 93, 0.3)',
                    '0 30px 100px rgba(227, 11, 93, 0.5)',
                    '0 30px 80px rgba(227, 11, 93, 0.3)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <h2 className="text-4xl md:text-6xl text-rani-glow font-bold mb-6 text-pinyon"
                    style={{ fontFamily: 'var(--font-pinyon)' }}>
                  {answer === 'yes' ? content.proposal.yesMessage : content.proposal.playfulMessage}
                </h2>

                {/* Decorative sparkles */}
                <div className="flex justify-center gap-6 mt-8 text-5xl">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.3, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    >
                      {i % 2 === 0 ? '✨' : '💕'}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Footer message */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-12"
              >
                <p className="text-charcoal-rose/60 italic mb-2">
                  {content.footer.message}
                </p>
                <p className="text-2xl">
                  {content.footer.nazarNaLage}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}