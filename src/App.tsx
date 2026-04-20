import { useState, useEffect } from 'react'
import IntroAnimation from './components/IntroAnimation'
import Book from './components/Book'
import MatrixBackground from './components/MatrixBackground'
import OrientationLock from './components/OrientationLock'
import './App.css'

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return (
    <div className="app-container">
      <OrientationLock />
      <MatrixBackground />
      {!isPortrait && (
        showIntro ? (
          <IntroAnimation onComplete={() => setShowIntro(false)} />
        ) : (
          <div className="book-enter">
            <Book />
          </div>
        )
      )}
    </div>
  )
}

export default App
