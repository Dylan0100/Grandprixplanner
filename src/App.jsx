import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Plan from './pages/Plan'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  )
}
