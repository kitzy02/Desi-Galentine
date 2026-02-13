import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="text-6xl mb-4">🌸</p>
      <h1 className="text-5xl font-bold text-gulabi-600 mb-4">
        Pyaari Sakhi
      </h1>
      <p className="text-lg text-gulabi-500 mb-8 max-w-md">
        A little something for the most special person in my life...
      </p>
      <button
        onClick={() => navigate('/memories')}
        className="bg-gulabi-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gulabi-600 transition-colors"
      >
        Shuru Karein? 💕
      </button>
    </div>
  )
}