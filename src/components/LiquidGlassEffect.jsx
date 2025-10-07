import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const LiquidGlassEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `rgba(255, 110, 150, ${0.1 + Math.sin(time * 0.001) * 0.05})`);
      gradient.addColorStop(0.5, `rgba(139, 92, 246, ${0.1 + Math.cos(time * 0.001) * 0.05})`);
      gradient.addColorStop(1, `rgba(59, 130, 246, ${0.1 + Math.sin(time * 0.001 + 1) * 0.05})`);

      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(
          canvas.width / 2 + Math.sin(time * 0.001 + i) * 200,
          canvas.height / 2 + Math.cos(time * 0.001 + i) * 200,
          100 + Math.sin(time * 0.002 + i) * 50,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      time++;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="liquid-glass-canvas"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  );
};

export default LiquidGlassEffect;