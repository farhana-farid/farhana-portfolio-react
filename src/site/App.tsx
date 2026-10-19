import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import RouteEffects from './components/RouteEffects'
import { detectBasePath } from './basePath'
import Home from './pages/Home'
import AIVideo from './pages/AIVideo'
import AIPhoto from './pages/AIPhoto'
import About from './pages/About'
import NotFound from './pages/NotFound'

const basePath = detectBasePath()

export default function App() {
  return (
    <BrowserRouter basename={basePath}>
      <RouteEffects />

      <a
        href="#main-content"
        className="sr-only left-4 top-4 z-[100] rounded-full bg-ink px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-ivory focus:not-sr-only focus:fixed"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-video" element={<AIVideo />} />
          <Route path="/ai-photo" element={<AIPhoto />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}
