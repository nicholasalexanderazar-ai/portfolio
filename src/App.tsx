import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Each case study route passes the project id via URL param */}
      <Route path="/:id" element={<CaseStudy />} />
    </Routes>
  )
}
