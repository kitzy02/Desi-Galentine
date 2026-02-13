import { useNavigate } from 'react-router-dom'

export default function Memories() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold text-gulabi-600 mb-4">
        Memory Mirror 🪞
      </h1>
      <p className="text-gulabi-500 mb-8">Coming soon...</p>
      <button
        onClick={() => navigate('/quiz')}
        className="bg-gulabi-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gulabi-600 transition-colors"
      >
        Aage Badho →
      </button>
    </div>
  )
}