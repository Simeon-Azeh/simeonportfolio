import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FiCode, FiLayers, FiZap, FiHeart, FiStar, 
  FiMousePointer, FiCoffee, FiSmile 
} from 'react-icons/fi';
import '../styles/welcome.css';

const Welcome = ({ onComplete }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [userName, setUserName] = useState('');
  const [selectedVibe, setSelectedVibe] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const vibes = [
    { id: 'modern', label: 'Modern & Clean', icon: FiLayers, color: '#3B82F6' },
    { id: 'creative', label: 'Creative & Bold', icon: FiZap, color: '#8B5CF6' },
    { id: 'minimal', label: 'Minimal & Elegant', icon: FiStar, color: '#FF6E96' },
    { id: 'fun', label: 'Fun & Playful', icon: FiSmile, color: '#10B981' }
  ];

  const handleComplete = () => {
    setShowConfetti(true);
    setTimeout(() => {
      onComplete();
      navigate('/home');
    }, 2000);
  };

  const handleButtonClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount >= 2) {
      handleComplete();
    }
  };

  return (
    <div className="welcome-interactive">
      {/* Animated Background Blobs */}
      <div className="blob-container">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="blob"
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                ['#FF6E96', '#8B5CF6', '#3B82F6', '#10B981'][i % 4]
              }40, transparent)`
            }}
          />
        ))}
      </div>

      {/* Interactive Cursor Follower */}
      <motion.div
        className="cursor-glow"
        animate={{
          x: isHovering ? -50 : 0,
          y: isHovering ? -50 : 0,
        }}
      />

      {/* Main Content Steps */}
      <div className="welcome-steps">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="step-content"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="floating-icon"
              >
                <FiCode size={80} />
              </motion.div>
              
              <motion.h1
                className="welcome-title"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Times change, UI should too
              </motion.h1>
              
              <motion.p className="welcome-subtitle">
                Let's create something <span className="highlight">extraordinary</span> together
              </motion.p>

              <motion.button
                className="interactive-btn primary-btn"
                onClick={() => setStep(1)}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(255, 110, 150, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                Let's Begin <FiMousePointer className="ml-2" />
              </motion.button>

              <motion.div 
                className="floating-elements"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[FiHeart, FiStar, FiCoffee].map((Icon, i) => (
                  <motion.div
                    key={i}
                    className="float-icon"
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                  >
                    <Icon size={24} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="step-content"
            >
              <motion.h2 
                className="step-title"
                animate={{ 
                  color: ['#FF6E96', '#8B5CF6', '#3B82F6', '#FF6E96'],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Nice to meet you! 👋
              </motion.h2>
              
              <motion.p className="step-description">
                What should I call you?
              </motion.p>

              <div className="input-group">
                <motion.input
                  type="text"
                  placeholder="Enter your name..."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="interactive-input"
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(255, 110, 150, 0.3)" }}
                  autoFocus
                />
                
                {userName && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="input-feedback"
                  >
                    <FiSmile className="text-green-400" />
                  </motion.div>
                )}
              </div>

              <motion.button
                className="interactive-btn secondary-btn"
                onClick={() => setStep(2)}
                disabled={!userName.trim()}
                whileHover={{ scale: userName.trim() ? 1.05 : 1 }}
                whileTap={{ scale: userName.trim() ? 0.95 : 1 }}
                animate={userName.trim() ? { 
                  boxShadow: [
                    "0 0 20px rgba(255, 110, 150, 0.3)",
                    "0 0 40px rgba(139, 92, 246, 0.4)",
                    "0 0 20px rgba(255, 110, 150, 0.3)",
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Continue
              </motion.button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              className="step-content"
            >
              <motion.h2 className="step-title">
                Great to meet you, <span className="highlight">{userName}</span>! 🎉
              </motion.h2>
              
              <motion.p className="step-description">
                What kind of vibe are you feeling today?
              </motion.p>

              <div className="vibe-grid">
                {vibes.map((vibe, index) => (
                  <motion.button
                    key={vibe.id}
                    className={`vibe-card ${selectedVibe === vibe.id ? 'selected' : ''}`}
                    onClick={() => setSelectedVibe(vibe.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: `0 20px 40px ${vibe.color}40`
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      borderColor: selectedVibe === vibe.id ? vibe.color : 'transparent'
                    }}
                  >
                    <motion.div
                      animate={selectedVibe === vibe.id ? { 
                        rotate: [0, -10, 10, -10, 0],
                        scale: [1, 1.2, 1]
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <vibe.icon size={32} color={vibe.color} />
                    </motion.div>
                    <span>{vibe.label}</span>
                  </motion.button>
                ))}
              </div>

              <motion.button
                className="interactive-btn primary-btn"
                onClick={() => setStep(3)}
                disabled={!selectedVibe}
                whileHover={{ scale: selectedVibe ? 1.05 : 1 }}
                whileTap={{ scale: selectedVibe ? 0.95 : 1 }}
                animate={selectedVibe ? {
                  background: [
                    'linear-gradient(135deg, #FF6E96, #8B5CF6)',
                    'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                    'linear-gradient(135deg, #3B82F6, #FF6E96)',
                  ]
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Let's Go! 🚀
              </motion.button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="step-content final-step"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="success-icon"
              >
                <FiZap size={100} color="#10B981" />
              </motion.div>

              <motion.h2 
                className="step-title"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Perfect choice, {userName}! ✨
              </motion.h2>
              
              <motion.p className="step-description">
                Click the button <strong>{3 - clickCount}</strong> more time{3 - clickCount !== 1 ? 's' : ''} to enter
              </motion.p>

              <motion.button
                className="interactive-btn giant-btn"
                onClick={handleButtonClick}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 30px 60px rgba(16, 185, 129, 0.5)"
                }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  y: { duration: 1, repeat: Infinity },
                }}
              >
                <span className="btn-text">Enter Portfolio</span>
                <motion.span
                  className="btn-count"
                  key={clickCount}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                >
                  {clickCount}/3
                </motion.span>
              </motion.button>

              {clickCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="encouragement"
                >
                  {clickCount === 1 && "Keep going! 💪"}
                  {clickCount === 2 && "Almost there! 🎯"}
                  {clickCount >= 3 && "Welcome aboard! 🎊"}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Indicator */}
        <div className="progress-bar">
          {[0, 1, 2, 3].map((s) => (
            <motion.div
              key={s}
              className="progress-dot"
              animate={{
                scale: step === s ? 1.5 : 1,
                backgroundColor: step >= s ? '#FF6E96' : '#333',
              }}
            />
          ))}
        </div>

        {/* Skip Button */}
        {step < 3 && (
          <motion.button
            className="skip-btn"
            onClick={handleComplete}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
          >
            Skip Intro →
          </motion.button>
        )}
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="confetti"
              initial={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                opacity: 1
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100,
                opacity: 0,
                rotate: Math.random() * 360
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                ease: "easeOut"
              }}
              style={{
                background: ['#FF6E96', '#8B5CF6', '#3B82F6', '#10B981'][i % 4]
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Welcome;