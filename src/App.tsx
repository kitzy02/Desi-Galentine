import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/phases/Hero'
import Memories from './components/phases/Memories'
import Quiz from './components/phases/Quiz'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  )
}