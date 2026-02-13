import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/phases/Hero'
import Memories from './components/phases/Memories'
import Quiz from './components/phases/Quiz'
import Proposal from './components/phases/Proposal'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/proposal" element={<Proposal />} />
      </Routes>
    </BrowserRouter>
  )
}