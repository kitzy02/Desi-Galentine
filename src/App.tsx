import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/phases/Hero'
import Memories from './components/phases/Memories'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/memories" element={<Memories />} />
      </Routes>
    </BrowserRouter>
  )
}