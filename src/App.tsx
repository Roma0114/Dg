import { useState } from 'react'
import IntroAnimation from './components/IntroAnimation'
import Book from './components/Book'
import MatrixBackground from './components/MatrixBackground'
import OrientationLock from './components/OrientationLock'
import './App.css'

function App() {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <div className="app-container">
      <OrientationLock />
      <MatrixBackground />
      {showIntro ? (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      ) : (
        <div className="book-enter">
          <Book />
        </div>
      )}
    </div>
  )
}

export default App
