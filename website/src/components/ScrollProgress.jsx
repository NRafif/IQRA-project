'use client'

import { motion, useSpring, useTransform } from 'framer-motion'

export default function ScrollProgress({ progress }) {
  // Reverse progress: 0 di bawah (akar), 1 di atas (daun)
  const reversedProgress = useTransform(progress, [0, 1], [1, 0])
  
  const scaleY = useSpring(reversedProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2">
      {/* Labels - urutan: daun atas, akar bawah */}
      <span className="text-xs text-white/50">🍃</span>
      
      {/* Progress bar container */}
      <div className="w-1.5 h-32 bg-white/10 rounded-full overflow-hidden relative">
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-earth-500 via-earth-400 to-forest-500 rounded-full origin-bottom"
          style={{ scaleY, height: '100%' }}
        />
      </div>
      
      <span className="text-xs text-white/50">🌱</span>
    </div>
  )
}
