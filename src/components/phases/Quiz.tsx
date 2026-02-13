import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PolaroidCard from '../ui/PolaroidCard'
import Petal from '../ui/Petal'
import { content } from '../../constants/content'

type Answer = 'A' | 'B' | null

export default function Quiz() {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState<Record<string, Answer>>({
    accessory: null,
    beverage: null,
    music: null
  })
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const questions = content.quiz.questions

  const allAnswered = Object.values(answers).every(answer => answer !== null)

  const handleAnswer = (questionId: string, answer: Answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))

    // INCREASED auto-advance delay: was 600ms, now 900ms
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1)
      }, 900)
    } else {
      setTimeout(() => {
        setShowResult(true)
      }, 900)
    }
  }

  return (
    <div className="min-h-screen bg-pearl-petal relative overflow-hidden">
      {/* Floating Background Petals - REDUCED from 8 to 5 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: `${Math.random() * 100}%`,
              y: -50,
              rotate: Math.random() * 360,
              opacity: 0.3
            }}
            animate={{
              y: ['0vh', '110vh'],
              rotate: [0, Math.random() * 360 + 360],
              opacity: [0.2, 0.3, 0.2] // MORE SUBTLE: was 0.3-0.5
            }}
            transition={{
              duration: 30 + Math.random() * 10, // SLOWER: was 25
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            <Petal size={12 + Math.random() * 12} className="text-coquette-pink" />
          </motion.div>
        ))}
      </div>

      {/* Leheriya Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
           style={{
             backgroundImage: `repeating-linear-gradient(
               45deg,
               transparent,
               transparent 35px,
               #FFC0CB 35px,
               #FFC0CB 70px
             )`
           }}
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 py-16 max-w-7xl">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="gradient-text">
              {content.quiz.title}
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-charcoal-rose/70 italic"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {content.quiz.subtitle}
          </motion.p>
        </motion.div>

        {/* Progress Indicator - IMPROVED: Only current unanswered question pulses */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-3 mb-16"
        >
          {questions.map((_, index) => (
            <motion.div
              key={index}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${answers[questions[index].id] !== null
                  ? 'bg-rani-glow w-8' // STATIC when answered (no animation)
                  : currentQuestion === index
                    ? 'bg-gulabi-400'
                    : 'bg-gulabi-200'
                }
              `}
              animate={{
                scale: currentQuestion === index && answers[questions[index].id] === null
                  ? [1, 1.2, 1]
                  : 1
              }}
              transition={{
                duration: 1,
                repeat: currentQuestion === index && answers[questions[index].id] === null
                  ? Infinity
                  : 0
              }}
            />
          ))}
        </motion.div>

        {/* Questions */}
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              {/* Question Number & Text */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <p className="text-sm text-rani-glow font-semibold mb-2">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal-rose" 
                    style={{ fontFamily: 'var(--font-display)' }}>
                  Which do you prefer?
                </h2>
              </motion.div>

              {/* Polaroid Cards - Side by Side */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
                {/* Option A */}
                <PolaroidCard
                  emoji={questions[currentQuestion].optionA.emoji}
                  label={questions[currentQuestion].optionA.label}
                  subtitle={questions[currentQuestion].optionA.subtitle}
                  isSelected={answers[questions[currentQuestion].id] === 'A'}
                  onClick={() => handleAnswer(questions[currentQuestion].id, 'A')}
                  side="left"
                  delay={0.2}
                />

                {/* VS Divider - UPDATED: Playfair instead of Pinyon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="text-3xl font-semibold text-rani-glow"
                  style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                >
                  or
                </motion.div>

                {/* Option B */}
                <PolaroidCard
                  emoji={questions[currentQuestion].optionB.emoji}
                  label={questions[currentQuestion].optionB.label}
                  subtitle={questions[currentQuestion].optionB.subtitle}
                  isSelected={answers[questions[currentQuestion].id] === 'B'}
                  onClick={() => handleAnswer(questions[currentQuestion].id, 'B')}
                  side="right"
                  delay={0.4}
                />
              </div>

              {/* Navigation Hint */}
              {answers[questions[currentQuestion].id] === null && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center text-sm text-charcoal-rose/50 italic"
                >
                  Click your choice to continue ✨
                </motion.p>
              )}
            </motion.div>
          ) : (
            /* Result Message */
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="max-w-2xl mx-auto text-center"
            >
              {/* Result card */}
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl 
                           border-4 border-coquette-pink mb-8">
                <p className="text-2xl md:text-3xl text-charcoal-rose leading-relaxed mb-6">
                  {content.quiz.resultMessage}
                </p>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl text-rani-glow font-semibold italic"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {content.quiz.cta}
                </motion.p>
              </div>

              {/* Continue Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                onClick={() => navigate('/proposal')}
                className="px-12 py-5 bg-gradient-to-r from-rani-glow to-gulabi-500 text-white 
                         rounded-full text-xl md:text-2xl font-medium shadow-lg 
                         hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 
                               transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <span className="relative z-10 flex items-center gap-3">
                  The Final Question
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    💌
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip option (subtle, bottom) */}
        {!allAnswered && !showResult && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={() => setShowResult(true)}
            className="mt-16 mx-auto block text-sm text-charcoal-rose/40 
                     hover:text-charcoal-rose/60 transition-colors underline"
          >
            Skip to the final question →
          </motion.button>
        )}
      </div>
    </div>
  )
}
