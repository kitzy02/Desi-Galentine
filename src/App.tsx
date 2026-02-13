import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/phases/Hero'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
      </Routes>
    </BrowserRouter>
  )
}