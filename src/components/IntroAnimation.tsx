import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [show, setShow] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [phase, setPhase] = useState<'countdown' | 'celebration'>('countdown');

  useEffect(() => {
    if (phase === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setPhase('celebration');
        triggerBigExplosion();
      }
    }
    // Otomatik geçiş kaldırıldı, artık tıklama bekleniyor.
  }, [countdown, phase]);

  const handleFinalClick = () => {
    if (phase === 'celebration' && show) {
      setShow(false);
      setTimeout(onComplete, 1000);
    }
  };

  const triggerBigExplosion = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 2000 };

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 80 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } });
    }, 200);
  };

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleFinalClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            flexDirection: 'column',
            cursor: phase === 'celebration' ? 'pointer' : 'default'
          }}
        >
          {phase === 'countdown' ? (
            <motion.div
              key={countdown}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: '6rem',
                color: '#ffffff',
                fontFamily: '"Press Start 2P", cursive',
                textShadow: `
                  0 0 10px #FF107A,
                  0 0 20px #FF107A,
                  0 0 40px #FF107A,
                  0 0 80px #FF107A
                `,
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {countdown}
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ textAlign: 'center' }}
            >
              <motion.h1
                initial={{ scale: 0.8, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 50, damping: 15, duration: 1.5 }}
                style={{
                  fontSize: '3.5rem',
                  textAlign: 'center',
                  color: '#ffffff',
                  fontFamily: '"Caveat", cursive',
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
                  lineHeight: '1.2',
                  fontWeight: 'normal',
                  margin: 0
                }}
              >
                Doğum Günün Kutlu Olsun <br /> 
                <span style={{ color: '#FF107A', fontSize: '4.5rem' }}>Güzellik</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1.5 }}
                style={{ 
                  marginTop: '30px', 
                  fontSize: '1.4rem', 
                  color: 'rgba(255, 255, 255, 0.8)',
                  letterSpacing: '2px',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
              >
                Senin için özel bir şey hazırladım...
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ 
                  delay: 2.5, 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ 
                  marginTop: '60px', 
                  fontSize: '1.8rem', 
                  color: '#ffffff',
                  fontFamily: '"Caveat", cursive',
                  fontWeight: 'bold',
                  textShadow: '0 0 10px rgba(255,255,255,0.5)'
                }}
              >
                ekrana tıkla &lt;3
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
